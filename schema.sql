-- =====================================================================
-- TECHFIX ERP - ESQUEMA DE BASE DE DATOS SUPABASE / POSTGRESQL
-- =====================================================================

-- 1. EXTENSIONES REQUERIDAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE PERFILES DE USUARIO
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'Administrador' CHECK (role IN ('Administrador', 'Técnico', 'Empleado')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT 'Package',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE PROVEEDORES
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    address TEXT,
    rtn TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA DE PRODUCTOS (INVENTARIO)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    internal_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand TEXT,
    model TEXT,
    description TEXT,
    serial_number TEXT,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    location TEXT DEFAULT 'Estante Principal',
    purchase_cost DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    selling_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 2,
    status TEXT DEFAULT 'Disponible' CHECK (status IN ('Disponible', 'Poco Stock', 'Agotado')),
    image_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLA DE COMPRAS
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE RESTRICT,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    payment_method TEXT DEFAULT 'Efectivo' CHECK (payment_method IN ('Efectivo', 'Transferencia', 'Tarjeta', 'Crédito')),
    invoice_number TEXT,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABLA DE ÍTEMS DE COMPRA
CREATE TABLE IF NOT EXISTS public.purchase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_cost DECIMAL(12, 2) NOT NULL,
    total_cost DECIMAL(12, 2) NOT NULL
);

-- 8. TABLA DE FACTURAS (FOTOGRAFÍAS ALMACENADAS)
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INT,
    mime_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TABLA DE MOVIMIENTOS DE STOCK (KARDEX)
CREATE TABLE IF NOT EXISTS public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    movement_type TEXT NOT NULL CHECK (movement_type IN ('Entrada', 'Salida', 'Ajuste', 'Transferencia')),
    quantity INT NOT NULL,
    notes TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT DEFAULT 'Sistema',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo a usuarios autenticados en profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en suppliers" ON public.suppliers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en purchases" ON public.purchases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en purchase_items" ON public.purchase_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en invoices" ON public.invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todo a usuarios autenticados en stock_movements" ON public.stock_movements FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================================
-- STORAGE BUCKETS (PARA FACTURAS E IMÁGENES)
-- =====================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invoices', 'invoices', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true) 
ON CONFLICT (id) DO NOTHING;

-- SEED DATA INICIAL DE CATEGORÍAS
INSERT INTO public.categories (name, description, icon) VALUES
('Laptop', 'Computadoras portátiles y repuestos integrados', 'Laptop'),
('PC de Escritorio', 'Equipos ensamblados y Torres', 'Monitor'),
('Almacenamiento SSD / HDD', 'Discos de estado sólido, M.2 NVMe y discos duros', 'HardDrive'),
('Memoria RAM', 'Módulos DDR3, DDR4, DDR5 para Laptop y Desktop', 'Cpu'),
('Procesadores', 'CPUs Intel Core y AMD Ryzen', 'Cpu'),
('Motherboards', 'Tarjetas madre de diferentes sockets y chipsets', 'CircuitBoard'),
('Fuentes de Poder', 'Fuentes certificadas 80 Plus y estándar', 'Zap'),
('Tarjetas de Video', 'GPUs Nvidia GeForce y AMD Radeon', 'Layers'),
('Gabinetes', 'Chasis ATX, Micro-ATX y Mini-ITX', 'Box'),
('Monitores', 'Pantallas LED, IPS y accesorios', 'Monitor'),
('Teclados y Mice', 'Periféricos de entrada cableados e inalámbricos', 'Keyboard'),
('Cables y Adaptadores', 'Cables HDMI, DisplayPort, SATA, USB-C, adaptadores', 'Cable'),
('Consumibles', 'Pasta térmica, alcohol isopropílico, estaño, fundente', 'Droplet'),
('Herramientas de Taller', 'Multímetros, cautines, destornilladores de precisión', 'Wrench')
ON CONFLICT (name) DO NOTHING;
