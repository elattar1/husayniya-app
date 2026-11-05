/**
 * خدمات الحسينية — محرك الربط السحابي بقاعدة بيانات Supabase
 * Al-Husayniya Services — Supabase Cloud & Realtime Synchronization Engine
 */

(function (window) {
  'use strict';

  // Default Live Supabase Configuration (Al-Husayniya Project)
  const DEFAULT_CONFIG = {
    URL: 'https://qhrxymsnmzqtxvddoxdo.supabase.co',
    KEY: 'sb_publishable_pB-JHTIMDfgQRlJqjYDHjg_KEmL3IvC'
  };

  // Local Storage Keys
  const STORAGE_KEYS = {
    URL: 'husayniya_supabase_url',
    KEY: 'husayniya_supabase_key',
    ORDERS: 'husayniya_local_orders'
  };

  // Cross-tab real-time bus fallback (BroadcastChannel)
  const localBus = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('husayniya_orders_channel') : null;

  class HusayniyaCloudEngine {
    constructor() {
      this.supabaseUrl = localStorage.getItem(STORAGE_KEYS.URL) || DEFAULT_CONFIG.URL;
      this.supabaseKey = localStorage.getItem(STORAGE_KEYS.KEY) || DEFAULT_CONFIG.KEY;
      this.client = null;
      this.isConnected = false;
      this.listeners = [];

      this.init();
    }

    init() {
      // If Supabase JS library is present on window and credentials exist
      if (typeof window.supabase !== 'undefined' && this.supabaseUrl && this.supabaseKey) {
        try {
          this.client = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
          this.isConnected = true;
          console.log('⚡ [Husayniya Cloud] متصل بقاعدة بيانات Supabase بنجاح');
          this.listenToSupabaseRealtime();
        } catch (e) {
          console.warn('⚠️ [Husayniya Cloud] فشل الاتصال المباشر بـ Supabase:', e);
          this.isConnected = false;
        }
      } else {
        this.isConnected = false;
        console.log('ℹ️ [Husayniya Cloud] يعمل بنظام المزامنة الفورية المحلية (BroadcastChannel). اربط Supabase للتزامن بين الأجهزة المختلفة.');
      }

      // Listen to cross-tab broadcast bus
      if (localBus) {
        localBus.onmessage = (event) => {
          if (event && event.data) {
            this.notifyListeners(event.data.type, event.data.payload);
          }
        };
      }
    }

    // Save Supabase credentials from settings modal
    saveCredentials(url, key) {
      if (!url || !key) return false;
      this.supabaseUrl = url.trim();
      this.supabaseKey = key.trim();
      localStorage.setItem(STORAGE_KEYS.URL, this.supabaseUrl);
      localStorage.setItem(STORAGE_KEYS.KEY, this.supabaseKey);
      this.init();
      return true;
    }

    clearCredentials() {
      localStorage.removeItem(STORAGE_KEYS.URL);
      localStorage.removeItem(STORAGE_KEYS.KEY);
      this.supabaseUrl = '';
      this.supabaseKey = '';
      this.client = null;
      this.isConnected = false;
    }

    // Test connection with Supabase
    async testConnection() {
      if (!this.client) return { success: false, error: 'العميل غير مهيأ' };
      try {
        const { data, error } = await this.client.from('orders').select('count', { count: 'exact', head: true });
        if (error) throw error;
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message || 'تعذر الاتصال بالجدول orders' };
      }
    }

    // Subscribe to incoming / updated orders in real-time
    onOrderEvent(callback) {
      if (typeof callback === 'function') {
        this.listeners.push(callback);
      }
    }

    notifyListeners(eventType, orderData) {
      this.listeners.forEach((fn) => {
        try {
          fn(eventType, orderData);
        } catch (e) {
          console.error('Error in listener callback:', e);
        }
      });
    }

    // Supabase Postgres Realtime Subscription
    listenToSupabaseRealtime() {
      if (!this.client) return;
      try {
        this.client
          .channel('public:orders')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
            console.log('⚡ Realtime event received from Supabase:', payload);
            if (payload.eventType === 'INSERT') {
              this.notifyListeners('order_created', payload.new);
            } else if (payload.eventType === 'UPDATE') {
              this.notifyListeners('order_updated', payload.new);
            }
          })
          .subscribe();
      } catch (err) {
        console.warn('Realtime channel subscription error:', err);
      }
    }

    // ── Orders API ──

    // 1. Create a new order (from Checkout)
    async createOrder(orderPayload) {
      const orderCode = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        order_code: orderCode,
        store_name: orderPayload.store_name || 'مشويات الباز',
        customer_name: orderPayload.customer_name || 'عميل الحسينية',
        customer_phone: orderPayload.customer_phone || '01012345678',
        items: orderPayload.items || [],
        total_amount: orderPayload.total_amount || 0,
        delivery_fee: orderPayload.delivery_fee || 15,
        payment_method: orderPayload.payment_method || 'كاش عند الاستلام',
        delivery_address: orderPayload.delivery_address || 'الحسينية، الشرقية',
        notes: orderPayload.notes || '',
        status: 'pending', // pending -> preparing -> on_the_way -> delivered -> cancelled
        driver_name: null,
        otp: String(Math.floor(1000 + Math.random() * 9000)),
        created_at: new Date().toISOString()
      };

      // If connected to live Supabase, insert into DB
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.from('orders').insert([newOrder]).select();
          if (error) throw error;
          const inserted = (data && data[0]) ? data[0] : newOrder;
          this.broadcastLocal('order_created', inserted);
          return { success: true, order: inserted, cloud: true };
        } catch (e) {
          console.warn('⚠️ تعذر الحفظ في سحابة Supabase، جاري الحفظ المحلي:', e);
        }
      }

      // Local fallback storage
      this.saveOrderLocally(newOrder);
      this.broadcastLocal('order_created', newOrder);
      return { success: true, order: newOrder, cloud: false };
    }

    // 2. Update order status (Merchant accepts / Driver picks up / OTP verified)
    async updateOrderStatus(orderCode, newStatus, extraFields = {}) {
      const updates = {
        status: newStatus,
        updated_at: new Date().toISOString(),
        ...extraFields
      };

      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client
            .from('orders')
            .update(updates)
            .eq('order_code', orderCode)
            .select();
          if (!error && data && data.length) {
            this.broadcastLocal('order_updated', data[0]);
            return { success: true, order: data[0] };
          }
        } catch (e) {
          console.warn('⚠️ فشل التحديث في Supabase، جاري التحديث محلياً:', e);
        }
      }

      // Local storage fallback
      const orders = this.getLocalOrders();
      const idx = orders.findIndex(o => o.order_code === orderCode);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...updates };
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        this.broadcastLocal('order_updated', orders[idx]);
        return { success: true, order: orders[idx] };
      }

      return { success: false, error: 'الطلب غير موجود' };
    }

    // 3. Fetch active orders
    async getOrders() {
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
          if (!error && data) return data;
        } catch (e) {
          console.warn('⚠️ تعذر جلب الطلبات من السحابة:', e);
        }
      }
      return this.getLocalOrders();
    }

    // Local Storage helpers
    getLocalOrders() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    saveOrderLocally(order) {
      const orders = this.getLocalOrders();
      orders.unshift(order);
      if (orders.length > 50) orders.pop();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    broadcastLocal(type, payload) {
      if (localBus) {
        localBus.postMessage({ type, payload });
      }
      this.notifyListeners(type, payload);
    }
  }

  // Attach global instance
  window.HusayniyaCloud = new HusayniyaCloudEngine();

})(window);
