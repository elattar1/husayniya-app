-- ========================================================
-- قاعدة بيانات سحابة "خدمات الحسينية" — Supabase Schema
-- Al-Husayniya Services — Full Database & Realtime Setup
-- انسخ هذا الكود بالكامل وضعه في: Supabase -> SQL Editor -> Run
-- ========================================================

-- 1. جدول الطلبات والمشاوير المباشرة (Orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code TEXT UNIQUE NOT NULL,
    store_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    delivery_fee NUMERIC(10, 2) DEFAULT 15,
    payment_method TEXT DEFAULT 'كاش عند الاستلام',
    delivery_address TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT DEFAULT 'pending', -- pending, preparing, ready, on_the_way, delivered, cancelled
    driver_name TEXT,
    otp TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول حجوزات الأطباء والعيادات (Medical Appointments)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    appointment_date TEXT,
    clinic_address TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول عقارات وأراضي الحسينية (Properties)
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    prop_type TEXT NOT NULL, -- rent, sale, commercial, land
    area_name TEXT NOT NULL, -- شارع المركز، حي المعاشات، حي المحجوب، بورسعيد، سعود
    price NUMERIC(12, 2) NOT NULL,
    phone TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. جدول الأمانات والمفقودات (Lost & Found)
CREATE TABLE IF NOT EXISTS public.lost_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    item_type TEXT NOT NULL, -- lost (مفقود) أو found (معثور عليه)
    category TEXT,
    location_desc TEXT NOT NULL,
    phone TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'open', -- open, returned
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- تفعيل سياسات الأمان Row Level Security (RLS) والسماح بالوصول
-- ========================================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_items ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة والكتابة للزوار عبر Anon Key
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);

CREATE POLICY "Allow public read on appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on appointments" ON public.appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow public insert on properties" ON public.properties FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on lost_items" ON public.lost_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert on lost_items" ON public.lost_items FOR INSERT WITH CHECK (true);

-- ========================================================
-- تفعيل البث اللحظي (Supabase Realtime Replication)
-- ========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lost_items;

-- بيانات أولية تجريبية للطلبات (اختياري)
INSERT INTO public.orders (order_code, store_name, customer_name, customer_phone, items, total_amount, delivery_fee, payment_method, delivery_address, status, driver_name, otp)
VALUES 
('ORD-9024', 'مشويات الباز', 'أحمد السيد', '01012345678', '[{"name":"كباب وكفتة حاتي","price":180,"qty":1}]'::jsonb, 240, 25, 'كاش عند الاستلام', 'حي المعاشات، شارع المدارس أمام مدرسة التجارة', 'on_the_way', 'الكابتن عمر السعيد', '9024')
ON CONFLICT (order_code) DO NOTHING;
