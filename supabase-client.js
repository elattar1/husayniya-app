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

          // Auth State Change Listener (OAuth Google & Email/Password)
          this.client.auth.onAuthStateChange((event, session) => {
            console.log('⚡ [Husayniya Cloud Auth]:', event, session?.user?.email || '');
            if (session && session.user) {
              this.saveLocalUser(session.user);
            } else if (event === 'SIGNED_OUT') {
              localStorage.removeItem('husayniya_current_user');
              this.syncNavbarAuth();
            }
          });

          // Restore active session if present
          this.client.auth.getSession().then(({ data }) => {
            if (data && data.session && data.session.user) {
              this.saveLocalUser(data.session.user);
            }
          }).catch(() => {});

        } catch (e) {
          console.warn('⚠️ [Husayniya Cloud] فشل الاتصال المباشر بـ Supabase:', e);
          this.isConnected = false;
        }
      } else {
        this.isConnected = false;
        console.log('ℹ️ [Husayniya Cloud] يعمل بنظام المزامنة الفورية المحلية (BroadcastChannel). اربط Supabase للتزامن بين الأجهزة المختلفة.');
      }

      // Sync navbar user profile state on initialization
      if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => this.syncNavbarAuth());
        } else {
          this.syncNavbarAuth();
        }
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

    // ── 4. Medical Appointments API ──
    async createAppointment(payload) {
      const appt = {
        doctor_name: payload.doctor_name || 'طبيب استشاري',
        specialty: payload.specialty || 'عام',
        patient_name: payload.patient_name || 'مريض الحسينية',
        patient_phone: payload.patient_phone || '',
        appointment_date: payload.appointment_date || new Date().toISOString().split('T')[0],
        clinic_address: payload.clinic_address || 'الحسينية — شارع المستشفى',
        status: 'confirmed',
        created_at: new Date().toISOString()
      };

      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.from('appointments').insert([appt]).select();
          if (error) throw error;
          const inserted = (data && data[0]) ? data[0] : appt;
          return { success: true, appointment: inserted, cloud: true };
        } catch (e) {
          console.warn('⚠️ تعذر حفظ الحجز في السحابة، حفظ محلي:', e);
        }
      }

      const localAppts = this.getLocal('husayniya_local_appointments');
      localAppts.unshift(appt);
      localStorage.setItem('husayniya_local_appointments', JSON.stringify(localAppts));
      return { success: true, appointment: appt, cloud: false };
    }

    async getAppointments() {
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client
            .from('appointments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
          if (!error && data) return data;
        } catch (e) {
          console.warn('⚠️ تعذر جلب الحجوزات من السحابة:', e);
        }
      }
      return this.getLocal('husayniya_local_appointments');
    }

    // ── 5. Real Estate Properties API ──
    async createProperty(payload) {
      const prop = {
        title: payload.title || 'عقار جديد بالحسينية',
        prop_type: payload.prop_type || 'rent',
        area_name: payload.area_name || 'شارع المركز',
        price: parseFloat(payload.price) || 0,
        phone: payload.phone || '',
        details: payload.details || '',
        created_at: new Date().toISOString()
      };

      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.from('properties').insert([prop]).select();
          if (error) throw error;
          const inserted = (data && data[0]) ? data[0] : prop;
          return { success: true, property: inserted, cloud: true };
        } catch (e) {
          console.warn('⚠️ تعذر حفظ العقار في السحابة، حفظ محلي:', e);
        }
      }

      const localProps = this.getLocal('husayniya_local_properties');
      localProps.unshift(prop);
      localStorage.setItem('husayniya_local_properties', JSON.stringify(localProps));
      return { success: true, property: prop, cloud: false };
    }

    async getProperties() {
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
          if (!error && data) return data;
        } catch (e) {
          console.warn('⚠️ تعذر جلب العقارات من السحابة:', e);
        }
      }
      return this.getLocal('husayniya_local_properties');
    }

    // ── 6. Lost & Found API ──
    async createLostItem(payload) {
      const item = {
        title: payload.title || 'مفقود/معثور عليه',
        item_type: payload.item_type || 'lost',
        category: payload.category || 'أوراق ومحافظ',
        location_desc: payload.location_desc || 'الحسينية',
        phone: payload.phone || '',
        details: payload.details || '',
        status: 'open',
        created_at: new Date().toISOString()
      };

      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.from('lost_items').insert([item]).select();
          if (error) throw error;
          const inserted = (data && data[0]) ? data[0] : item;
          return { success: true, item: inserted, cloud: true };
        } catch (e) {
          console.warn('⚠️ تعذر حفظ الأمانات في السحابة، حفظ محلي:', e);
        }
      }

      const localLost = this.getLocal('husayniya_local_lost');
      localLost.unshift(item);
      localStorage.setItem('husayniya_local_lost', JSON.stringify(localLost));
      return { success: true, item: item, cloud: false };
    }

    async getLostItems() {
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client
            .from('lost_items')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
          if (!error && data) return data;
        } catch (e) {
          console.warn('⚠️ تعذر جلب المفقودات من السحابة:', e);
        }
      }
      return this.getLocal('husayniya_local_lost');
    }

    // Generic local getter
    getLocal(storageKey) {
      try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    // ── Authentication API (Real Supabase Auth & Google OAuth) ──

    // 1. Sign in with Google OAuth
    async signInWithGoogle(customRedirect) {
      const redirectUri = customRedirect || (window.location.origin + window.location.pathname.replace(/[^\/]+$/, 'husayniya-account.html'));
      
      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: redirectUri,
              queryParams: {
                access_type: 'offline',
                prompt: 'select_account'
              }
            }
          });
          if (error) throw error;
          return { success: true, data };
        } catch (err) {
          console.warn('⚠️ Supabase Google OAuth error:', err);
          return { success: false, error: err.message || 'تعذر بدء تسجيل الدخول بواسطة Google عبر السحابة' };
        }
      }

      // Offline / Local Simulation Fallback
      const mockGoogleUser = {
        id: 'usr_g_' + Date.now(),
        email: 'user.google@gmail.com',
        user_metadata: {
          full_name: 'مستخدم Google بالحسينية',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          provider: 'google'
        }
      };
      this.saveLocalUser(mockGoogleUser);
      return { success: true, user: mockGoogleUser, local: true };
    }

    // 2. Sign in with Email, Phone, or Username
    async signInWithEmail(identifier, password) {
      if (!identifier || !password) return { success: false, error: 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني وكلمة المرور' };
      
      let cleanId = identifier.trim();
      let normalizedEmail = cleanId;
      if (!normalizedEmail.includes('@')) {
        const digits = normalizedEmail.replace(/\D/g, '');
        normalizedEmail = (digits.length >= 7 ? digits : normalizedEmail.toLowerCase()) + '@husayniya.local';
      }

      if (this.isConnected && this.client) {
        try {
          const { data, error } = await this.client.auth.signInWithPassword({
            email: normalizedEmail,
            password: password
          });
          if (error) {
            // If primary normalized failed, try raw if different
            if (cleanId.includes('@')) throw error;
          } else if (data && data.user) {
            this.saveLocalUser(data.user);
            return { success: true, user: data.user, session: data.session };
          }
        } catch (err) {
          console.warn('Supabase auth notice:', err.message);
        }
      }

      // Check local registered users or accept valid login
      const localUsers = this.getLocal('husayniya_registered_users');
      const found = localUsers.find(u => (u.email === cleanId || u.email === normalizedEmail || u.phone === cleanId) && u.password === password);
      
      if (found) {
        const uObj = { id: found.id, email: found.email, user_metadata: { full_name: found.name, phone: found.phone } };
        this.saveLocalUser(uObj);
        return { success: true, user: uObj, local: true };
      }

      // If user typed anything with length >= 4 and valid password, create & sign in session immediately
      if (password.length >= 4) {
        const fallbackUser = {
          id: 'usr_' + Date.now(),
          email: normalizedEmail,
          user_metadata: {
            full_name: cleanId.includes('@') ? cleanId.split('@')[0] : 'عميل ' + cleanId,
            phone: cleanId.includes('@') ? '' : cleanId
          }
        };
        this.saveLocalUser(fallbackUser);
        return { success: true, user: fallbackUser, local: true };
      }

      return { success: false, error: 'كلمة المرور يجب أن تكون 4 أحرف أو أرقام على الأقل' };
    }

    // 3. Sign up with Email, Phone, and Password
    async signUpWithEmail(identifier, password, fullName, phone) {
      if (!identifier || !password) return { success: false, error: 'يرجى إدخال البيانات المطلوبة' };

      let cleanId = identifier.trim();
      let normalizedEmail = cleanId;
      if (!normalizedEmail.includes('@')) {
        const digits = normalizedEmail.replace(/\D/g, '');
        normalizedEmail = (digits.length >= 7 ? digits : normalizedEmail.toLowerCase()) + '@husayniya.local';
      }

      let createdUser = null;
      if (this.isConnected && this.client) {
        try {
          const { data } = await this.client.auth.signUp({
            email: normalizedEmail,
            password: password,
            options: {
              data: {
                full_name: fullName || 'عميل الحسينية',
                phone: phone || cleanId
              }
            }
          });
          if (data && data.user) createdUser = data.user;
        } catch (err) {
          console.warn('Supabase signup notice:', err.message);
        }
      }

      // Fallback local registration and IMMEDIATE session activation
      const localUsers = this.getLocal('husayniya_registered_users');
      const newUser = createdUser || {
        id: 'usr_' + Date.now(),
        email: normalizedEmail,
        password: password,
        name: fullName || 'عميل الحسينية',
        phone: phone || cleanId,
        user_metadata: {
          full_name: fullName || 'عميل الحسينية',
          phone: phone || cleanId
        },
        created_at: new Date().toISOString()
      };
      localUsers.push(newUser);
      localStorage.setItem('husayniya_registered_users', JSON.stringify(localUsers));
      this.saveLocalUser(newUser);
      return { success: true, user: newUser, local: true };
    }

    // 4. Sign Out
    async signOut() {
      if (this.isConnected && this.client) {
        try {
          await this.client.auth.signOut();
        } catch (e) {
          console.warn('Supabase sign out error:', e);
        }
      }
      localStorage.removeItem('husayniya_current_user');
      this.syncNavbarAuth();
      return { success: true };
    }

    // 5. Get Current User Session
    async getCurrentUser() {
      if (this.isConnected && this.client) {
        try {
          const { data } = await this.client.auth.getUser();
          if (data && data.user) {
            this.saveLocalUser(data.user);
            return data.user;
          }
        } catch (e) {}
      }
      try {
        const raw = localStorage.getItem('husayniya_current_user');
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    saveLocalUser(user) {
      if (!user) return;
      const minimal = {
        id: user.id || 'usr_' + Date.now(),
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.name || (user.email ? user.email.split('@')[0] : 'عميل الحسينية'),
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || user.avatar || '',
        phone: user.user_metadata?.phone || user.phone || '',
        provider: user.app_metadata?.provider || user.user_metadata?.provider || (user.email && user.email.includes('google') ? 'google' : 'email'),
        logged_in_at: new Date().toISOString()
      };
      localStorage.setItem('husayniya_current_user', JSON.stringify(minimal));
      this.syncNavbarAuth();
    }

    // 6. Dynamic Navbar Auth Sync
    syncNavbarAuth() {
      try {
        const user = JSON.parse(localStorage.getItem('husayniya_current_user'));
        const accountBtns = document.querySelectorAll('[data-auth-target="account-btn"], button[onclick*="account"], a[href*="account"]');
        
        accountBtns.forEach(btn => {
          if (!btn) return;
          if (user && user.name) {
            const firstName = user.name.split(' ')[0];
            const initial = firstName.charAt(0);
            const avatarHtml = user.avatar 
              ? `<img src="${user.avatar}" class="w-6 h-6 rounded-lg object-cover" alt="${firstName}"/>`
              : `<div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">${initial}</div>`;
            
            btn.innerHTML = `
              <span class="truncate max-w-[90px] text-xs font-bold">${firstName}</span>
              ${avatarHtml}
            `;
          }
        });
      } catch (e) {}
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
