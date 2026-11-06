/**
 * أرياف - ARYAF — محرك الربط السحابي بقاعدة بيانات Supabase
 * ARYAF Smart Services — Supabase Cloud & Realtime Synchronization Engine
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
      // One-time clean wipe of old accounts, mock orders, and assign Super Admin to the first user
      if (!localStorage.getItem('husayniya_wipe_v5_done')) {
        console.log('[Husayniya Cloud] مسح كافة الحسابات والطلبات التجريبية وتصفير النظام ورصيد المحافظ بالكامل...');
        localStorage.removeItem('husayniya_registered_users');
        localStorage.removeItem('husayniya_current_user');
        localStorage.removeItem('husayniya_admin_claimed');
        localStorage.removeItem('husayniya_admin_user_id');
        localStorage.removeItem('husayniya_admin_email');
        localStorage.removeItem('husayniya_admin_name');
        localStorage.removeItem('husayniya_wallet_balance');
        localStorage.removeItem('husayniya_driver_wallet');
        localStorage.removeItem('husayniya_merchant_wallet');
        localStorage.removeItem(STORAGE_KEYS.ORDERS);
        localStorage.removeItem('last_order_code');
        localStorage.removeItem('husayniya_cart');
        localStorage.setItem('husayniya_wipe_v5_done', 'true');
      }

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
          console.log('[Husayniya Cloud] متصل بقاعدة بيانات Supabase بنجاح');
          this.listenToSupabaseRealtime();

          // Auth State Change Listener (OAuth Google & Email/Password)
          this.client.auth.onAuthStateChange((event, session) => {
            console.log('[Husayniya Cloud Auth]:', event, session?.user?.email || '');
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
          console.warn('[Husayniya Cloud] فشل الاتصال المباشر بـ Supabase:', e);
          this.isConnected = false;
        }
      } else {
        this.isConnected = false;
        console.log('[Husayniya Cloud] يعمل بنظام المزامنة الفورية المحلية (BroadcastChannel). اربط Supabase للتزامن بين الأجهزة المختلفة.');
      }

      // Sync navbar state (Auth, Location & Notifications) on initialization
      if (typeof document !== 'undefined') {
        const syncUI = () => {
          this.syncNavbarAuth();
          this.syncNavbarLocation();
          this.syncNotificationToggles();
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', syncUI);
        } else {
          syncUI();
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
      // 1. Dispatch to registered callbacks
      this.listeners.forEach((fn) => {
        try {
          fn(eventType, orderData);
        } catch (e) {
          console.error('Error in listener callback:', e);
        }
      });

      // 2. Automated Smart Notification Dispatcher
      if (orderData && orderData.order_code) {
        const lastCode = localStorage.getItem('last_order_code') || '';
        const isMyOrder = lastCode && (lastCode === orderData.order_code || ('#' + lastCode) === orderData.order_code);

        if (eventType === 'order_created') {
          // If on merchant or driver portals, notify of new order
          const isMerchantOrDriver = window.location.pathname.includes('merchant') || window.location.pathname.includes('driver') || window.location.pathname.includes('dashboard');
          if (isMerchantOrDriver) {
            this.sendNotification(`طلب جديد #${orderData.order_code}`, {
              body: `${orderData.store_name} — الإجمالي: ${orderData.total_amount} ج.م`,
              soundType: 'order',
              url: 'husayniya-merchant.html'
            });
          }
        } else if (eventType === 'order_updated' && isMyOrder) {
          const statusLabels = {
            'preparing': 'مطعمك بدأ في إعداد الوجبة وتجهيزها الآن',
            'ready': 'تم الانتهاء من تجهيز طلبك واستلمه مندوب التوصيل',
            'on_the_way': 'الكابتن في الطريق إليك الآن عبر أرياف',
            'delivered': 'تم تسليم طلبك بنجاح! بالهناء والشفاء'
          };
          const label = statusLabels[orderData.status];
          if (label) {
            this.sendNotification(`طلبك #${orderData.order_code}`, {
              body: label,
              soundType: orderData.status === 'delivered' ? 'success' : 'order',
              url: `husayniya-tracking.html?order=${orderData.order_code}`
            });
          }
        }
      }
    }

    // Supabase Postgres Realtime Subscription
    listenToSupabaseRealtime() {
      if (!this.client) return;
      try {
        this.client
          .channel('public:orders')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
            console.log('[Supabase Realtime] event received:', payload);
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
        customer_name: orderPayload.customer_name || 'عميل أرياف',
        customer_phone: orderPayload.customer_phone || '01012345678',
        items: orderPayload.items || [],
        total_amount: orderPayload.total_amount || 0,
        delivery_fee: orderPayload.delivery_fee || 15,
        payment_method: orderPayload.payment_method || 'كاش عند الاستلام',
        delivery_address: orderPayload.delivery_address || 'أرياف ومراكزها',
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
          console.warn('[Husayniya Cloud] تعذر الحفظ في سحابة Supabase، جاري الحفظ المحلي:', e);
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
          console.warn('[Husayniya Cloud] فشل التحديث في Supabase، جاري التحديث محلياً:', e);
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
            .neq('status', 'deleted')
            .order('created_at', { ascending: false })
            .limit(50);
          if (!error && data) return data;
        } catch (e) {
          console.warn('[Husayniya Cloud] تعذر جلب الطلبات من السحابة:', e);
        }
      }
      return this.getLocalOrders();
    }

    // ── 4. Medical Appointments API ──
    async createAppointment(payload) {
      const appt = {
        doctor_name: payload.doctor_name || 'طبيب استشاري',
        specialty: payload.specialty || 'عام',
        patient_name: payload.patient_name || 'مريض أرياف',
        patient_phone: payload.patient_phone || '',
        appointment_date: payload.appointment_date || new Date().toISOString().split('T')[0],
        clinic_address: payload.clinic_address || 'أرياف — مجمع العيادات الطبي',
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
          console.warn('[Husayniya Cloud] تعذر حفظ الحجز في السحابة، حفظ محلي:', e);
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
          console.warn('[Husayniya Cloud] تعذر جلب الحجوزات من السحابة:', e);
        }
      }
      return this.getLocal('husayniya_local_appointments');
    }

    // ── 5. Real Estate Properties API ──
    async createProperty(payload) {
      const prop = {
        title: payload.title || 'عقار جديد في أرياف',
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
          console.warn('[Husayniya Cloud] تعذر حفظ العقار في السحابة، حفظ محلي:', e);
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
          console.warn('[Husayniya Cloud] تعذر جلب العقارات من السحابة:', e);
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
        location_desc: payload.location_desc || 'أرياف ومراكزها',
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
          console.warn('[Husayniya Cloud] تعذر حفظ الأمانات في السحابة، حفظ محلي:', e);
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
          console.warn('[Husayniya Cloud] تعذر جلب المفقودات من السحابة:', e);
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
          if (data && data.url) {
            window.location.href = data.url;
            return { success: true, redirecting: true, data };
          }
          return { success: true, data };
        } catch (err) {
          console.warn('[Husayniya Cloud] Supabase Google OAuth error:', err);
          return { success: false, error: err.message || 'تعذر بدء تسجيل الدخول بواسطة Google عبر السحابة' };
        }
      }

      // Offline / Local Simulation Fallback
      const mockGoogleUser = {
        id: 'usr_g_' + Date.now(),
        email: 'user.google@gmail.com',
        user_metadata: {
          full_name: 'مستخدم Google في أرياف',
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
                full_name: fullName || 'عميل أرياف',
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
        name: fullName || 'عميل أرياف',
        phone: phone || cleanId,
        user_metadata: {
          full_name: fullName || 'عميل أرياف',
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
      const email = user.email || user.user_metadata?.email || '';
      const id = user.id || 'usr_' + Date.now();
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.name || (email ? email.split('@')[0] : 'أهالي أرياف');
      const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || user.avatar || '';
      const phone = user.user_metadata?.phone || user.phone || '';
      const provider = user.app_metadata?.provider || user.user_metadata?.provider || user.provider || (email && email.includes('google') ? 'google' : 'email');

      // ── Super Admin Privilege System ──
      // The very first account that logs in or registers claims the Super Admin role across all restaurants and services!
      const adminClaimed = localStorage.getItem('husayniya_admin_claimed') === 'true';
      const adminUserId = localStorage.getItem('husayniya_admin_user_id');
      const adminEmail = localStorage.getItem('husayniya_admin_email');

      let isAdmin = false;
      if (!adminClaimed || !adminUserId) {
        isAdmin = true;
        localStorage.setItem('husayniya_admin_claimed', 'true');
        localStorage.setItem('husayniya_admin_user_id', id);
        if (email) localStorage.setItem('husayniya_admin_email', email);
        localStorage.setItem('husayniya_admin_name', name);
      } else if (adminUserId === id || (adminEmail && email && adminEmail.toLowerCase() === email.toLowerCase())) {
        isAdmin = true;
      }

      const minimal = {
        id: id,
        email: email,
        name: name,
        avatar: avatar,
        phone: phone,
        provider: provider,
        role: isAdmin ? 'admin' : (user.role || 'customer'),
        isAdmin: isAdmin,
        admin_title: isAdmin ? 'المدير العام للمنصة (صلاحية كاملة لكافة المطاعم والخدمات)' : '',
        permissions: isAdmin ? ['all_stores', 'all_services', 'orders_admin', 'menus_admin', 'drivers_admin', 'settings_admin'] : [],
        logged_in_at: new Date().toISOString()
      };
      localStorage.setItem('husayniya_current_user', JSON.stringify(minimal));
      this.syncNavbarAuth();
      return minimal;
    }

    // Check if current user is admin
    isCurrentUserAdmin() {
      try {
        const u = JSON.parse(localStorage.getItem('husayniya_current_user'));
        return !!(u && (u.isAdmin || u.role === 'admin'));
      } catch (e) {
        return false;
      }
    }

    // Reset all accounts and initialize clean slate
    resetAllAccounts() {
      localStorage.removeItem('husayniya_registered_users');
      localStorage.removeItem('husayniya_current_user');
      localStorage.removeItem('husayniya_admin_claimed');
      localStorage.removeItem('husayniya_admin_user_id');
      localStorage.removeItem('husayniya_admin_email');
      localStorage.removeItem('husayniya_admin_name');
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
      localStorage.removeItem('last_order_code');
      localStorage.removeItem('husayniya_cart');
      this.clearAllOrders();
      this.syncNavbarAuth();
      return { success: true };
    }

    // Clear all orders from both Supabase and Local
    async clearAllOrders() {
      if (this.isConnected && this.client) {
        try {
          await this.client
            .from('orders')
            .update({ status: 'deleted' })
            .neq('id', '00000000-0000-0000-0000-000000000000');
        } catch (e) {}
      }
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
      localStorage.removeItem('last_order_code');
      this.broadcastLocal('orders_cleared', {});
      return { success: true };
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
            const crown = user.isAdmin ? '<i class="fa-solid fa-crown text-amber-300 text-[10px] ml-1"></i>' : '';
            const avatarHtml = user.avatar 
              ? `<img src="${user.avatar}" class="w-6 h-6 rounded-lg object-cover ${user.isAdmin ? 'border border-amber-400' : ''}" alt="${firstName}"/>`
              : `<div class="w-6 h-6 rounded-lg ${user.isAdmin ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'} flex items-center justify-center font-bold text-[10px]">${initial}</div>`;
            
            btn.innerHTML = `
              <span class="truncate max-w-[100px] text-xs font-bold ${user.isAdmin ? 'text-amber-300' : ''}">${crown}${firstName}</span>
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
        const list = raw ? JSON.parse(raw) : [];
        return list.filter(o => o.status !== 'deleted');
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

    // ════════════════════════════════════════════════════════════════
    // ── GEOLOCATION & GPS ENGINE (نظام تحديد الموقع الجغرافي) ──
    // ════════════════════════════════════════════════════════════════

    async detectUserLocation() {
      if (!('geolocation' in navigator)) {
        return { success: false, error: 'المتصفح لا يدعم تحديد الموقع الجغرافي (GPS)' };
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const accuracy = Math.round(pos.coords.accuracy || 10);

            let address = `إحداثيات GPS: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            let area = 'أرياف — المركز الرئيسي';

            // Attempt free reverse geocode with fast 3.5s timeout
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 3500);
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ar`, {
                signal: controller.signal
              });
              clearTimeout(timeoutId);
              if (res.ok) {
                const data = await res.json();
                if (data && data.display_name) {
                  address = data.display_name;
                  const road = data.address?.road || '';
                  const suburb = data.address?.suburb || data.address?.neighbourhood || data.address?.village || data.address?.town || '';
                  if (road && suburb) {
                    area = `أرياف — ${suburb} (${road})`;
                  } else if (suburb) {
                    area = `أرياف — ${suburb}`;
                  } else if (road) {
                    area = `أرياف — ${road}`;
                  }
                }
              }
            } catch (e) {
              // Proximity estimation around Rural Center
              area = 'أرياف — موقع GPS تم تحديده بدقة';
            }

            const locData = {
              lat,
              lon,
              accuracy,
              address,
              area,
              timestamp: Date.now()
            };

            localStorage.setItem('husayniya_user_location', JSON.stringify(locData));
            this.syncNavbarLocation();
            resolve({ success: true, ...locData });
          },
          (err) => {
            let msg = 'تعذر تحديد الموقع الجغرافي';
            if (err.code === 1) msg = 'تم رفض إذن تحديد الموقع. يرجى تفعيل الـ GPS من إعدادات المتصفح.';
            else if (err.code === 2) msg = 'الموقع غير متاح حالياً. يرجى التأكد من تشغيل الـ GPS.';
            else if (err.code === 3) msg = 'انتهت مهلة تحديد الموقع.';
            resolve({ success: false, error: msg });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    }

    getUserLocation() {
      try {
        const raw = localStorage.getItem('husayniya_user_location');
        return raw ? JSON.parse(raw) : null;
      } catch(e) {
        return null;
      }
    }

    syncNavbarLocation() {
      try {
        const loc = this.getUserLocation();
        const locPills = document.querySelectorAll('[data-location-target="user-location"], #navbar-location-pill');
        locPills.forEach(pill => {
          if (!pill) return;
          if (loc && loc.area) {
            pill.innerHTML = `
              <i class="fa-solid fa-location-dot text-emerald-400"></i>
              <span class="truncate max-w-[130px] sm:max-w-[180px] font-bold text-emerald-300">${loc.area}</span>
            `;
            pill.title = loc.address || loc.area;
          } else {
            pill.innerHTML = `
              <i class="fa-solid fa-location-dot"></i>
              <span class="font-bold">تحديد موقعي (GPS)</span>
            `;
          }
        });
      } catch (e) {}
    }

    // ════════════════════════════════════════════════════════════════
    // ── NOTIFICATIONS & AUDIO CHIME ENGINE (نظام الإشعارات والأصوات) ──
    // ════════════════════════════════════════════════════════════════

    playChime(type = 'notification') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === 'order') {
          // Double pleasant chime ascending (C5 -> G5)
          const now = ctx.currentTime;
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(523.25, now);
          osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
          gain1.gain.setValueAtTime(0.3, now);
          gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.45);

          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1046.50, now + 0.18);
          gain2.gain.setValueAtTime(0.25, now + 0.18);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.18);
          osc2.stop(now + 0.65);

        } else if (type === 'success') {
          // Melodic 3-tone arpeggio
          const now = ctx.currentTime;
          const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + (idx * 0.12);
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.25, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.4);
          });

        } else {
          // Gentle ping
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(880, now);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        }
      } catch (e) {}
    }

    async requestNotificationPermission() {
      if (!('Notification' in window)) {
        this.showInAppToast('تنبيه الإشعارات', 'متصفحك لا يدعم إشعارات النظام المباشرة، سيتم إشعارك داخل التطبيق فقط.');
        return { supported: false, status: 'unsupported' };
      }
      try {
        const perm = await Notification.requestPermission();
        localStorage.setItem('husayniya_notifications_status', perm);
        this.syncNotificationToggles();

        if (perm === 'granted') {
          this.playChime('success');
          this.sendNotification('تم تفعيل الإشعارات بنجاح!', {
            body: 'ستتلقى تنبيهاً فورياً عند إعداد وتوصيل وجبتك بمجرد تحرك المندوب.',
            tag: 'welcome-notification'
          });
          return { supported: true, status: 'granted' };
        } else {
          this.showInAppToast('تم تعطيل الإشعارات', 'يمكنك تفعيلها في أي وقت من إعدادات المتصفح.');
          return { supported: true, status: perm };
        }
      } catch (err) {
        return { supported: true, status: 'denied' };
      }
    }

    sendNotification(title, options = {}) {
      // 1. Play synthesized pleasant sound
      this.playChime(options.soundType || 'order');

      // 2. Display in-app rich toast notification
      this.showInAppToast(title, options.body);

      // 3. Native OS Notification if permitted
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then((reg) => {
              reg.showNotification(title, {
                body: options.body || '',
                icon: options.icon || 'icon-192.png',
                badge: 'icon-192.png',
                vibrate: [200, 100, 200],
                tag: options.tag || ('hs-' + Date.now()),
                data: { url: options.url || 'husayniya-tracking.html' }
              });
            });
          } else {
            new Notification(title, {
              body: options.body || '',
              icon: options.icon || 'icon-192.png'
            });
          }
        } catch (e) {
          console.warn('Native notification error:', e);
        }
      }
    }

    showInAppToast(title, body) {
      if (typeof document === 'undefined') return;
      let toastContainer = document.getElementById('husayniya-toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'husayniya-toast-container';
        toastContainer.style.cssText = 'position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;width:min(90vw, 420px);direction:rtl;';
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement('div');
      toast.style.cssText = 'background:rgba(4,14,30,0.96);backdrop-filter:blur(22px);border:1px solid rgba(0,229,200,0.5);box-shadow:0 12px 35px rgba(0,0,0,0.65),0 0 25px rgba(0,229,200,0.25);border-radius:18px;padding:12px 16px;color:#fff;display:flex;align-items:center;gap:12px;pointer-events:auto;transition:all .35s cubic-bezier(.175,.885,.32,1.275);';

      toast.innerHTML = `
        <div style="width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#00b09b,#06d6a0);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 0 15px rgba(0,229,200,0.4);color:#fff;">
          <i class="fa-solid fa-bell"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:800;font-size:13px;color:#fff;line-height:1.3;">${title}</div>
          ${body ? `<div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;line-height:1.3;">${body}</div>` : ''}
        </div>
        <button onclick="this.parentElement.remove()" style="background:transparent;border:none;color:rgba(255,255,255,0.4);font-size:14px;cursor:pointer;padding:4px;line-height:1;"><i class="fa-solid fa-xmark"></i></button>
      `;

      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 400);
      }, 5000);
    }

    syncNotificationToggles() {
      try {
        const isGranted = typeof Notification !== 'undefined' && Notification.permission === 'granted';
        const notifBadges = document.querySelectorAll('[data-notif-target="bell-badge"], #navbar-notif-btn');
        notifBadges.forEach(btn => {
          if (!btn) return;
          if (isGranted) {
            btn.classList.add('text-emerald-400');
            btn.title = 'الإشعارات مفعلة';
          } else {
            btn.classList.remove('text-emerald-400');
            btn.title = 'تفعيل الإشعارات';
          }
        });
      } catch (e) {}
    }
  }

  // Attach global instance
  window.HusayniyaCloud = new HusayniyaCloudEngine();

})(window);
