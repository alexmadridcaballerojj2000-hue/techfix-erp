/* =====================================================================
   TECHFIX ERP - APLICACIÓN WEB PRINCIPAL (React 18 + JavaScript ES)
   ===================================================================== */

const { useState, useEffect, useMemo, useRef } = React;

// ---------------------------------------------------------------------
// SEED DATA INICIAL REALISTA PARA TALLER DE COMPUTACIÓN
// ---------------------------------------------------------------------
const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Laptop', description: 'Portátiles y repuestos integrados', icon: 'Laptop' },
  { id: 'cat-2', name: 'PC de Escritorio', description: 'Equipos y torres armadas', icon: 'Monitor' },
  { id: 'cat-3', name: 'Almacenamiento SSD / HDD', description: 'Discos SSD M.2 NVMe, SATA y HDDs', icon: 'HardDrive' },
  { id: 'cat-4', name: 'Memoria RAM', description: 'Módulos DDR4/DDR5 Laptop y Desktop', icon: 'Cpu' },
  { id: 'cat-5', name: 'Procesadores', description: 'CPUs Intel Core y AMD Ryzen', icon: 'Cpu' },
  { id: 'cat-6', name: 'Motherboards', description: 'Placas base Sockets AM4/AM5/LGA1700', icon: 'CircuitBoard' },
  { id: 'cat-7', name: 'Fuentes de Poder', description: 'Fuentes certificadas 80 Plus', icon: 'Zap' },
  { id: 'cat-8', name: 'Tarjetas de Video', description: 'GPUs Nvidia GeForce y AMD Radeon', icon: 'Layers' },
  { id: 'cat-9', name: 'Consumibles', description: 'Pasta térmica, alcohol isopropílico, estaño', icon: 'Droplet' },
  { id: 'cat-10', name: 'Herramientas', description: 'Cautines, destornilladores, multímetros', icon: 'Wrench' },
];

const INITIAL_SUPPLIERS = [
  { id: 'sup-1', name: 'Carlos Mendoza', company: 'TechData Importaciones', phone: '+504 9988-7766', whatsapp: '50499887766', email: 'ventas@techdata.hn', address: 'Bo. Los Dolores, Tegucigalpa', rtn: '08011990123456', notes: 'Proveedor principal de memorias RAM y SSD Kingston' },
  { id: 'sup-2', name: 'Distribuidora MacroSys', company: 'MacroSys S.A.', phone: '+504 9876-5432', whatsapp: '50498765432', email: 'contacto@macrosys.hn', address: 'Col. Palmira, Ave. República de Chile', rtn: '08011985987654', notes: 'Distribuidores autorizados de ASUS y Gigabyte' },
  { id: 'sup-3', name: 'Suministros Electrónicos Fix', company: 'FixParts Corp', phone: '+504 3322-1100', whatsapp: '50433221100', email: 'pedidos@fixparts.hn', address: 'San Pedro Sula, Circunvalación', rtn: '05011995443322', notes: 'Pantallas para laptop y cargadores originales' },
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    internal_code: 'SSD-KNG-1TB',
    name: 'Disco Sólido SSD 1TB Kingston NV2 M.2 NVMe',
    category_id: 'cat-3',
    brand: 'Kingston',
    model: 'NV2 M.2 2280',
    description: 'Velocidad de lectura hasta 3500MB/s PCIe 4.0 NVMe',
    serial_number: 'SN-98214-NV2',
    supplier_id: 'sup-1',
    location: 'Estante A-1',
    purchase_cost: 45.00,
    selling_price: 68.00,
    stock_quantity: 14,
    min_stock: 5,
    status: 'Disponible',
    image_url: 'https://images.unsplash.com/photo-1597872250970-45d9472d7335?auto=format&fit=crop&w=400&q=80',
    notes: 'Garantía 1 año con proveedor',
    created_at: '2026-07-10'
  },
  {
    id: 'prod-2',
    internal_code: 'RAM-COR-16GB',
    name: 'Memoria RAM Corsair Vengeance LPX 16GB DDR4 3200MHz',
    category_id: 'cat-4',
    brand: 'Corsair',
    model: 'Vengeance LPX',
    description: 'Módulo UDIMM DDR4 para PC de escritorio con disipador negro',
    serial_number: 'COR-882910',
    supplier_id: 'sup-1',
    location: 'Estante A-2',
    purchase_cost: 38.00,
    selling_price: 58.00,
    stock_quantity: 3,
    min_stock: 6,
    status: 'Poco Stock',
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
    notes: 'Requerido para repuestos de ensamble rápidos',
    created_at: '2026-07-12'
  },
  {
    id: 'prod-3',
    internal_code: 'PAS-ARC-MX4',
    name: 'Pasta Térmica Arctic MX-4 Jeringa 4g',
    category_id: 'cat-9',
    brand: 'Arctic',
    model: 'MX-4 4g',
    description: 'Compuesto térmico de alto rendimiento sin conductividad eléctrica',
    serial_number: 'N/A',
    supplier_id: 'sup-2',
    location: 'Cajón B-1 (Consumibles)',
    purchase_cost: 7.50,
    selling_price: 15.00,
    stock_quantity: 25,
    min_stock: 8,
    status: 'Disponible',
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80',
    notes: 'Uso frecuente en mantenimientos preventivos y cambio de pasta',
    created_at: '2026-07-01'
  },
  {
    id: 'prod-4',
    internal_code: 'GPU-RTX-4060',
    name: 'Tarjeta de Video ASUS Dual GeForce RTX 4060 OC 8GB',
    category_id: 'cat-8',
    brand: 'ASUS',
    model: 'Dual OC RTX 4060',
    description: 'GPU DLSS 3 Ray Tracing PCIe 4.0 ventilación dual',
    serial_number: 'SN-ASUS-991204',
    supplier_id: 'sup-2',
    location: 'Vitrinas / Seguridad',
    purchase_cost: 310.00,
    selling_price: 420.00,
    stock_quantity: 1,
    min_stock: 2,
    status: 'Poco Stock',
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    notes: 'Alta demanda en armado de computadoras de diseño y gaming',
    created_at: '2026-07-15'
  },
  {
    id: 'prod-5',
    internal_code: 'SCR-LAP-156',
    name: 'Pantalla Repuesto Laptop 15.6 IPS FHD 30 Pines Slim',
    category_id: 'cat-1',
    brand: 'Generic / BOE',
    model: 'NV156FHM-N48',
    description: 'Panel de pantalla 1920x1080 60Hz conector 30 pines sin soportes',
    serial_number: 'BOE-776192',
    supplier_id: 'sup-3',
    location: 'Estante C-3 (Pantallas)',
    purchase_cost: 62.00,
    selling_price: 95.00,
    stock_quantity: 0,
    min_stock: 3,
    status: 'Agotado',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    notes: 'Reordenar urgentemente con FixParts',
    created_at: '2026-07-05'
  }
];

const INITIAL_PURCHASES = [
  {
    id: 'pur-1',
    supplier_id: 'sup-1',
    purchase_date: '2026-07-10',
    invoice_number: 'FAC-99812',
    payment_method: 'Transferencia',
    total_amount: 742.00,
    notes: 'Compra de lote de SSDs y memorias RAM para stock del mes',
    items: [
      { product_id: 'prod-1', quantity: 10, unit_cost: 45.00, total_cost: 450.00 },
      { product_id: 'prod-2', quantity: 7, unit_cost: 38.00, total_cost: 266.00 }
    ],
    invoices: [
      {
        id: 'inv-1',
        file_name: 'Factura_TechData_FAC99812.jpg',
        image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        uploaded_at: '2026-07-10 14:30'
      }
    ]
  },
  {
    id: 'pur-2',
    supplier_id: 'sup-2',
    purchase_date: '2026-07-15',
    invoice_number: 'FAC-00341',
    payment_method: 'Tarjeta',
    total_amount: 325.00,
    notes: 'Compra de tarjeta de video ASUS RTX y tubos de pasta térmica Arctic',
    items: [
      { product_id: 'prod-4', quantity: 1, unit_cost: 310.00, total_cost: 310.00 },
      { product_id: 'prod-3', quantity: 2, unit_cost: 7.50, total_cost: 15.00 }
    ],
    invoices: [
      {
        id: 'inv-2',
        file_name: 'Factura_MacroSys_FAC00341.jpg',
        image_url: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=800&q=80',
        uploaded_at: '2026-07-15 11:15'
      }
    ]
  }
];

const INITIAL_MOVEMENTS = [
  { id: 'mov-1', product_id: 'prod-1', movement_type: 'Entrada', quantity: 10, date: '2026-07-10 14:30', user: 'Admin Taller', notes: 'Compra registrada FAC-99812' },
  { id: 'mov-2', product_id: 'prod-2', movement_type: 'Entrada', quantity: 7, date: '2026-07-10 14:30', user: 'Admin Taller', notes: 'Compra registrada FAC-99812' },
  { id: 'mov-3', product_id: 'prod-2', movement_type: 'Salida', quantity: 4, date: '2026-07-14 09:20', user: 'Técnico Roberto', notes: 'Instalado en reparación de PC Gamer Orden #402' },
  { id: 'mov-4', product_id: 'prod-5', movement_type: 'Salida', quantity: 1, date: '2026-07-18 16:45', user: 'Técnico Carlos', notes: 'Cambio de pantalla Dell Inspiron 15' }
];

// ---------------------------------------------------------------------
// COMPONENTE PRINCIPAL APP TECHFIX ERP
// ---------------------------------------------------------------------
function TechFixApp() {
  // Estado de Autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('techfix_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin Taller',
    email: 'admin@techfix.com',
    role: 'Administrador'
  });

  // Supabase Config State
  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    return {
      url: localStorage.getItem('techfix_sp_url') || '',
      key: localStorage.getItem('techfix_sp_key') || ''
    };
  });

  // Estado Principal de Datos
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('tf_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('tf_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tf_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('tf_purchases');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
  });
  const [movements, setMovements] = useState(() => {
    const saved = localStorage.getItem('tf_movements');
    return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
  });

  // Navegación
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modales
  const [productModal, setProductModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [supplierModal, setSupplierModal] = useState({ isOpen: false, data: null });
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, data: null });
  const [movementModal, setMovementModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Lightbox Modal para Facturas
  const [lightbox, setLightbox] = useState({ isOpen: false, imageUrl: '', title: '', rotation: 0, zoom: 1 });

  // Toast Notifications
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Persistir en LocalStorage
  useEffect(() => { localStorage.setItem('tf_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('tf_suppliers', JSON.stringify(suppliers)); }, [suppliers]);
  useEffect(() => { localStorage.setItem('tf_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('tf_purchases', JSON.stringify(purchases)); }, [purchases]);
  useEffect(() => { localStorage.setItem('tf_movements', JSON.stringify(movements)); }, [movements]);

  // Inicializar Iconos Lucide al renderizar
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    localStorage.setItem('techfix_auth', 'true');
    showToast('Sesión iniciada correctamente como Admin Taller');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('techfix_auth');
    showToast('Has cerrado sesión correctamente', 'info');
  };

  // KPIs Calculados del Dashboard
  const dashboardStats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stock_quantity <= p.min_stock).length;
    
    const totalInventoryPurchaseValue = products.reduce((acc, p) => acc + (p.purchase_cost * p.stock_quantity), 0);
    const totalInventorySalesValue = products.reduce((acc, p) => acc + (p.selling_price * p.stock_quantity), 0);
    
    const totalInvoices = purchases.reduce((acc, p) => acc + (p.invoices ? p.invoices.length : 0), 0);
    const monthlyPurchasesTotal = purchases.reduce((acc, p) => acc + p.total_amount, 0);
    const monthlyOutwardMovements = movements.filter(m => m.movement_type === 'Salida').reduce((acc, m) => acc + m.quantity, 0);

    return {
      totalProducts,
      lowStockCount,
      totalInventoryPurchaseValue,
      totalInventorySalesValue,
      totalInvoices,
      monthlyPurchasesTotal,
      monthlyOutwardMovements
    };
  }, [products, purchases, movements]);

  // Si no está autenticado, muestra vista de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090e] p-4 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md glass-panel p-8 relative z-10 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 mb-4 shadow-lg shadow-cyan-500/20">
              <i data-lucide="wrench" className="w-8 h-8 text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">TechFix ERP</h1>
            <p className="text-xs text-gray-400 mt-1">Control de Inventario y Gestión de Taller de Computación</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Correo Electrónico</label>
              <div className="relative">
                <input 
                  type="email" 
                  defaultValue="admin@techfix.com"
                  className="input-field pl-10"
                  placeholder="usuario@taller.com"
                  required
                />
                <i data-lucide="mail" className="w-4 h-4 text-gray-400 absolute left-3 top-3.5"></i>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Contraseña</label>
              <div className="relative">
                <input 
                  type="password" 
                  defaultValue="demo123"
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
                <i data-lucide="lock" className="w-4 h-4 text-gray-400 absolute left-3 top-3.5"></i>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500/20" />
                Recordar sesión
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Modo Demo: Utiliza cualquier contraseña para ingresar'); }} className="text-cyan-400 hover:underline">¿Olvidaste tu clave?</a>
            </div>

            <button type="submit" className="w-full btn-primary justify-center py-3 text-sm font-semibold">
              <i data-lucide="log-in" className="w-4 h-4"></i>
              Iniciar Sesión en el Sistema
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
            <p>Soporta Supabase Auth & Storage + Modo Demo Local</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-gray-900 border border-cyan-500/30 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <i data-lucide={toast.type === 'danger' ? 'alert-triangle' : 'check-circle'} className={`w-5 h-5 ${toast.type === 'danger' ? 'text-red-400' : 'text-cyan-400'}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Izquierdo Colapsable */}
      <aside className={`bg-[#0e131f] border-r border-white/10 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} relative z-30`}>
        {/* Header del Sidebar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
              <i data-lucide="cpu" className="w-5 h-5 text-white"></i>
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-sm text-white leading-none">TechFix ERP</h2>
                <span className="text-[10px] text-cyan-400 font-mono">v2.4 Enterprise</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <i data-lucide={isSidebarOpen ? 'chevron-left' : 'chevron-right'} className="w-5 h-5"></i>
          </button>
        </div>

        {/* Links de Navegación */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
            { id: 'inventory', label: 'Inventario', icon: 'package', badge: dashboardStats.lowStockCount > 0 ? dashboardStats.lowStockCount : null },
            { id: 'purchases', label: 'Compras', icon: 'shopping-cart' },
            { id: 'invoices', label: 'Facturas (Fotos)', icon: 'file-text', highlight: true },
            { id: 'suppliers', label: 'Proveedores', icon: 'truck' },
            { id: 'categories', label: 'Categorías', icon: 'tag' },
            { id: 'movements', label: 'Movimientos (Kardex)', icon: 'arrow-left-right' },
            { id: 'reports', label: 'Reportes', icon: 'bar-chart-3' },
            { id: 'settings', label: 'Configuración', icon: 'settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                currentTab === item.id 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <i data-lucide={item.icon} className={`w-4 h-4 shrink-0 ${currentTab === item.id ? 'text-cyan-400' : 'text-gray-400'}`}></i>
              {isSidebarOpen && <span className="truncate">{item.label}</span>}
              {isSidebarOpen && item.badge && (
                <span className="ml-auto bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer del Sidebar / Usuario */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
              AT
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{currentUser.email}</p>
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={handleLogout} title="Cerrar Sesión" className="text-gray-400 hover:text-red-400 p-1">
                <i data-lucide="log-out" className="w-4 h-4"></i>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Superior */}
        <header className="bg-[#0e131f]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white tracking-tight uppercase">
              {currentTab === 'dashboard' && 'Dashboard Estadístico'}
              {currentTab === 'inventory' && 'Inventario de Productos'}
              {currentTab === 'purchases' && 'Registro de Compras'}
              {currentTab === 'invoices' && 'Historial de Facturas Fotografías'}
              {currentTab === 'suppliers' && 'Directorio de Proveedores'}
              {currentTab === 'categories' && 'Categorías de Componentes'}
              {currentTab === 'movements' && 'Movimientos de Stock (Kardex)'}
              {currentTab === 'reports' && 'Generación de Reportes'}
              {currentTab === 'settings' && 'Configuración de Supabase'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Alert Indicator */}
            {dashboardStats.lowStockCount > 0 && (
              <button 
                onClick={() => setCurrentTab('inventory')}
                className="hidden sm:flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-all"
              >
                <i data-lucide="alert-triangle" className="w-4 h-4 text-red-400 animate-bounce"></i>
                <span>{dashboardStats.lowStockCount} Repuesto(s) con Stock Bajo</span>
              </button>
            )}

            <button 
              onClick={() => setPurchaseModal(true)}
              className="btn-primary py-2 text-xs"
            >
              <i data-lucide="plus" className="w-4 h-4"></i>
              Nueva Compra / Factura
            </button>
          </div>
        </header>

        {/* Cuerpo de la Sección Selección */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* =========================================================
             VISTA 1: DASHBOARD
             ========================================================= */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Tarjetas KPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Productos Registrados</p>
                      <h3 className="text-2xl font-extrabold text-white mt-1">{dashboardStats.totalProducts}</h3>
                    </div>
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                      <i data-lucide="box" className="w-5 h-5"></i>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-3 inline-block">Catálogo de componentes</span>
                </div>

                <div className="glass-panel p-5 relative overflow-hidden border-red-500/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Poco Stock / Alerta</p>
                      <h3 className="text-2xl font-extrabold text-red-400 mt-1">{dashboardStats.lowStockCount}</h3>
                    </div>
                    <div className="p-3 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
                      <i data-lucide="alert-circle" className="w-5 h-5"></i>
                    </div>
                  </div>
                  <span className="text-[11px] text-red-400/80 mt-3 inline-block">Requieren reorden urgente</span>
                </div>

                <div className="glass-panel p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor del Inventario</p>
                      <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">${dashboardStats.totalInventoryPurchaseValue.toFixed(2)}</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                      <i data-lucide="dollar-sign" className="w-5 h-5"></i>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-3 inline-block">Venta est. ${dashboardStats.totalInventorySalesValue.toFixed(2)}</span>
                </div>

                <div className="glass-panel p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Facturas Almacenadas</p>
                      <h3 className="text-2xl font-extrabold text-purple-400 mt-1">{dashboardStats.totalInvoices}</h3>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                      <i data-lucide="camera" className="w-5 h-5"></i>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-3 inline-block">Respaldo digital en Storage</span>
                </div>
              </div>

              {/* Fila de Gráficos y Accesos Rápido */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tabla de Productos con Poco Stock */}
                <div className="lg:col-span-2 glass-panel p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <i data-lucide="alert-triangle" className="w-4 h-4 text-red-400"></i>
                      Repuestos y Componentes en Nivel Crítico
                    </h3>
                    <button onClick={() => setCurrentTab('inventory')} className="text-xs text-cyan-400 hover:underline">Ver todo inventario →</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Producto</th>
                          <th>Ubicación</th>
                          <th>Stock Actual</th>
                          <th>Mínimo</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.filter(p => p.stock_quantity <= p.min_stock).map(prod => (
                          <tr key={prod.id}>
                            <td className="font-mono text-xs text-cyan-400 font-semibold">{prod.internal_code}</td>
                            <td className="font-medium text-white">{prod.name}</td>
                            <td className="text-gray-400 text-xs">{prod.location}</td>
                            <td className="font-bold text-red-400">{prod.stock_quantity}</td>
                            <td className="text-gray-400 text-xs">{prod.min_stock}</td>
                            <td>
                              <span className={`badge ${prod.stock_quantity === 0 ? 'badge-danger' : 'badge-warning'}`}>
                                {prod.stock_quantity === 0 ? 'Agotado' : 'Poco Stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {products.filter(p => p.stock_quantity <= p.min_stock).length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500 text-xs">
                              ¡Excelente! Todos los productos tienen existencias suficientes.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumen de Movimientos Recientes */}
                <div className="glass-panel p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i data-lucide="activity" className="w-4 h-4 text-cyan-400"></i>
                      Actividad Reciente del Taller
                    </h3>

                    <div className="space-y-4">
                      {movements.slice(0, 4).map(mov => {
                        const prod = products.find(p => p.id === mov.product_id);
                        return (
                          <div key={mov.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                            <div className={`p-2 rounded-lg ${mov.movement_type === 'Entrada' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              <i data-lucide={mov.movement_type === 'Entrada' ? 'arrow-down-left' : 'arrow-up-right'} className="w-4 h-4"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white truncate">{prod ? prod.name : 'Producto'}</p>
                              <p className="text-[11px] text-gray-400">{mov.movement_type}: {mov.quantity} unidad(es)</p>
                              <span className="text-[10px] text-gray-500">{mov.date} • {mov.user}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button onClick={() => setCurrentTab('movements')} className="mt-4 w-full btn-secondary justify-center py-2 text-xs">
                    Ver Kardex Completo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
             VISTA 2: INVENTARIO (CRUD COMPLETO)
             ========================================================= */}
          {currentTab === 'inventory' && (
            <InventoryView 
              products={products}
              categories={categories}
              suppliers={suppliers}
              onOpenCreateModal={() => setProductModal({ isOpen: true, mode: 'create', data: null })}
              onOpenEditModal={(prod) => setProductModal({ isOpen: true, mode: 'edit', data: prod })}
              onDuplicateProduct={(prod) => {
                const dup = { ...prod, id: undefined, internal_code: prod.internal_code + '-DUP', name: prod.name + ' (Copia)' };
                setProductModal({ isOpen: true, mode: 'create', data: dup });
              }}
              onDeleteProduct={(prod) => {
                setConfirmModal({
                  isOpen: true,
                  title: 'Eliminar Producto',
                  message: `¿Estás seguro de eliminar el producto "${prod.name}"? Esta acción no se puede deshacer.`,
                  onConfirm: () => {
                    setProducts(products.filter(p => p.id !== prod.id));
                    showToast('Producto eliminado del inventario', 'info');
                  }
                });
              }}
            />
          )}

          {/* =========================================================
             VISTA 3: COMPRAS & FACTURAS FOTOGRAFIADAS
             ========================================================= */}
          {currentTab === 'purchases' && (
            <PurchasesView 
              purchases={purchases}
              suppliers={suppliers}
              products={products}
              onOpenNewPurchase={() => setPurchaseModal(true)}
              onOpenLightbox={(imageUrl, title) => setLightbox({ isOpen: true, imageUrl, title, rotation: 0, zoom: 1 })}
            />
          )}

          {/* =========================================================
             VISTA 4: HISTORIAL EXCLUSIVO DE FACTURAS
             ========================================================= */}
          {currentTab === 'invoices' && (
            <InvoicesGalleryView 
              purchases={purchases}
              suppliers={suppliers}
              onOpenLightbox={(imageUrl, title) => setLightbox({ isOpen: true, imageUrl, title, rotation: 0, zoom: 1 })}
            />
          )}

          {/* =========================================================
             VISTA 5: PROVEEDORES
             ========================================================= */}
          {currentTab === 'suppliers' && (
            <SuppliersView 
              suppliers={suppliers}
              onOpenAdd={() => setSupplierModal({ isOpen: true, data: null })}
              onOpenEdit={(sup) => setSupplierModal({ isOpen: true, data: sup })}
              onDelete={(sup) => {
                setConfirmModal({
                  isOpen: true,
                  title: 'Eliminar Proveedor',
                  message: `¿Eliminar a ${sup.name} (${sup.company})?`,
                  onConfirm: () => {
                    setSuppliers(suppliers.filter(s => s.id !== sup.id));
                    showToast('Proveedor eliminado');
                  }
                });
              }}
            />
          )}

          {/* =========================================================
             VISTA 6: CATEGORÍAS
             ========================================================= */}
          {currentTab === 'categories' && (
            <CategoriesView 
              categories={categories}
              onOpenAdd={() => setCategoryModal({ isOpen: true, data: null })}
              onOpenEdit={(cat) => setCategoryModal({ isOpen: true, data: cat })}
              onDelete={(cat) => {
                setCategories(categories.filter(c => c.id !== cat.id));
                showToast('Categoría eliminada');
              }}
            />
          )}

          {/* =========================================================
             VISTA 7: MOVIMIENTOS (KARDEX)
             ========================================================= */}
          {currentTab === 'movements' && (
            <MovementsView 
              movements={movements}
              products={products}
              onOpenAdjustment={() => setMovementModal(true)}
            />
          )}

          {/* =========================================================
             VISTA 8: REPORTES Y EXPORTACIÓN
             ========================================================= */}
          {currentTab === 'reports' && (
            <ReportsView 
              products={products}
              purchases={purchases}
              movements={movements}
              stats={dashboardStats}
            />
          )}

          {/* =========================================================
             VISTA 9: CONFIGURACIÓN Y SUPABASE
             ========================================================= */}
          {currentTab === 'settings' && (
            <SettingsView 
              config={supabaseConfig}
              onSaveConfig={(cfg) => {
                setSupabaseConfig(cfg);
                localStorage.setItem('techfix_sp_url', cfg.url);
                localStorage.setItem('techfix_sp_key', cfg.key);
                showToast('Credenciales de Supabase actualizadas con éxito');
              }}
            />
          )}
        </div>
      </main>

      {/* =========================================================
         MODAL CREAR / EDITAR PRODUCTO
         ========================================================= */}
      {productModal.isOpen && (
        <ProductFormModal 
          mode={productModal.mode}
          initialData={productModal.data}
          categories={categories}
          suppliers={suppliers}
          onClose={() => setProductModal({ isOpen: false, mode: 'create', data: null })}
          onSave={(formData) => {
            if (productModal.mode === 'edit') {
              setProducts(products.map(p => p.id === formData.id ? { ...formData, updated_at: new Date().toISOString() } : p));
              showToast('Producto actualizado correctamente');
            } else {
              const newProd = {
                ...formData,
                id: 'prod-' + Date.now(),
                status: formData.stock_quantity === 0 ? 'Agotado' : (formData.stock_quantity <= formData.min_stock ? 'Poco Stock' : 'Disponible'),
                created_at: new Date().toISOString().split('T')[0]
              };
              setProducts([newProd, ...products]);
              showToast('Producto añadido al inventario');
            }
            setProductModal({ isOpen: false, mode: 'create', data: null });
          }}
        />
      )}

      {/* =========================================================
         MODAL REGISTRAR NUEVA COMPRA Y FACTURA FOTOGRAFIADA
         ========================================================= */}
      {purchaseModal && (
        <PurchaseFormModal 
          suppliers={suppliers}
          products={products}
          onClose={() => setPurchaseModal(false)}
          onSave={(purchaseData) => {
            const newPur = {
              ...purchaseData,
              id: 'pur-' + Date.now(),
              created_at: new Date().toISOString()
            };
            
            // Actualizar stock de los productos comprados automáticamente
            const updatedProducts = [...products];
            const newMovements = [...movements];

            purchaseData.items.forEach(item => {
              const pIdx = updatedProducts.findIndex(p => p.id === item.product_id);
              if (pIdx !== -1) {
                const p = updatedProducts[pIdx];
                const newQty = p.stock_quantity + parseInt(item.quantity);
                updatedProducts[pIdx] = {
                  ...p,
                  stock_quantity: newQty,
                  purchase_cost: parseFloat(item.unit_cost),
                  status: newQty > p.min_stock ? 'Disponible' : (newQty === 0 ? 'Agotado' : 'Poco Stock')
                };

                newMovements.unshift({
                  id: 'mov-' + Date.now() + Math.random(),
                  product_id: p.id,
                  movement_type: 'Entrada',
                  quantity: parseInt(item.quantity),
                  date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                  user: currentUser.name,
                  notes: `Compra FAC-${purchaseData.invoice_number || 'S/N'}`
                });
              }
            });

            setProducts(updatedProducts);
            setMovements(newMovements);
            setPurchases([newPur, ...purchases]);

            showToast('Compra y foto de factura registradas. Stock actualizado automáticamente.');
            setPurchaseModal(false);
          }}
        />
      )}

      {/* =========================================================
         MODAL PROVEEDOR
         ========================================================= */}
      {supplierModal.isOpen && (
        <SupplierFormModal 
          initialData={supplierModal.data}
          onClose={() => setSupplierModal({ isOpen: false, data: null })}
          onSave={(data) => {
            if (supplierModal.data) {
              setSuppliers(suppliers.map(s => s.id === data.id ? data : s));
              showToast('Proveedor actualizado');
            } else {
              setSuppliers([...suppliers, { ...data, id: 'sup-' + Date.now() }]);
              showToast('Proveedor registrado');
            }
            setSupplierModal({ isOpen: false, data: null });
          }}
        />
      )}

      {/* =========================================================
         MODAL CATEGORÍA
         ========================================================= */}
      {categoryModal.isOpen && (
        <CategoryFormModal 
          initialData={categoryModal.data}
          onClose={() => setCategoryModal({ isOpen: false, data: null })}
          onSave={(data) => {
            if (categoryModal.data) {
              setCategories(categories.map(c => c.id === data.id ? data : c));
              showToast('Categoría actualizada');
            } else {
              setCategories([...categories, { ...data, id: 'cat-' + Date.now() }]);
              showToast('Categoría registrada');
            }
            setCategoryModal({ isOpen: false, data: null });
          }}
        />
      )}

      {/* =========================================================
         MODAL DE CONFIRMACIÓN DE ACCIONES DESTRUCTIVAS
         ========================================================= */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-sm w-full border border-red-500/30">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <i data-lucide="alert-triangle" className="w-5 h-5 text-red-400"></i>
              {confirmModal.title}
            </h3>
            <p className="text-xs text-gray-300 mt-2">{confirmModal.message}</p>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })}
                className="btn-secondary py-1.5 text-xs"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (confirmModal.onConfirm) confirmModal.onConfirm();
                  setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
                }}
                className="btn-danger py-1.5 text-xs"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
         VISOR LIGHTBOX DE FACTURAS EN PANTALLA COMPLETA
         ========================================================= */}
      {lightbox.isOpen && (
        <div className="lightbox-backdrop">
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <button 
              onClick={() => setLightbox(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }))}
              className="btn-secondary py-1.5 text-xs"
              title="Rotar Imagen"
            >
              <i data-lucide="rotate-cw" className="w-4 h-4"></i> Rotar
            </button>
            <a 
              href={lightbox.imageUrl} 
              download={`Factura_TechFix.jpg`}
              target="_blank"
              className="btn-primary py-1.5 text-xs"
            >
              <i data-lucide="download" className="w-4 h-4"></i> Descargar
            </a>
            <button 
              onClick={() => setLightbox({ isOpen: false, imageUrl: '', title: '', rotation: 0, zoom: 1 })}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <i data-lucide="x" className="w-6 h-6"></i>
            </button>
          </div>

          <div className="p-4 text-center">
            <h4 className="text-sm font-semibold text-white mb-2">{lightbox.title}</h4>
            <img 
              src={lightbox.imageUrl} 
              alt="Fotografía de Factura"
              className="lightbox-img"
              style={{ transform: `rotate(${lightbox.rotation}deg)` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: VISTA DE INVENTARIO
// ---------------------------------------------------------------------
function InventoryView({ products, categories, suppliers, onOpenCreateModal, onOpenEditModal, onDuplicateProduct, onDeleteProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.internal_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (p.model && p.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (p.serial_number && p.serial_number.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchCat = selectedCategory === 'ALL' || p.category_id === selectedCategory;
      const matchStatus = selectedStatus === 'ALL' || p.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.selling_price - b.selling_price;
      if (sortBy === 'price_desc') return b.selling_price - a.selling_price;
      if (sortBy === 'stock_asc') return a.stock_quantity - b.stock_quantity;
      return a.name.localeCompare(b.name);
    });
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const exportToExcel = () => {
    const data = filteredProducts.map(p => ({
      'Código Interno': p.internal_code,
      'Nombre del Producto': p.name,
      'Marca': p.brand,
      'Modelo': p.model,
      'Número de Serie': p.serial_number,
      'Ubicación': p.location,
      'Costo Compra ($)': p.purchase_cost,
      'Precio Venta ($)': p.selling_price,
      'Stock Actual': p.stock_quantity,
      'Stock Mínimo': p.min_stock,
      'Estado': p.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");
    XLSX.writeFile(workbook, "Inventario_TechFix.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Barra Superior de Filtros y Controles */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Búsqueda Inteligente */}
        <div className="relative flex-1 w-full">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre, Código, Marca, Modelo o Número de Serie..."
            className="input-field pl-10"
          />
          <i data-lucide="search" className="w-4 h-4 text-gray-400 absolute left-3 top-3.5"></i>
        </div>

        {/* Filtro Categoría */}
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field md:w-48"
        >
          <option value="ALL">Todas las Categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {/* Filtro Estado */}
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field md:w-40"
        >
          <option value="ALL">Todos los Estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Poco Stock">Poco Stock</option>
          <option value="Agotado">Agotado</option>
        </select>

        {/* Acciones */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={exportToExcel} className="btn-secondary py-2 text-xs" title="Exportar a Excel">
            <i data-lucide="file-spreadsheet" className="w-4 h-4 text-emerald-400"></i> Excel
          </button>
          <button onClick={onOpenCreateModal} className="btn-primary py-2 text-xs whitespace-nowrap">
            <i data-lucide="plus" className="w-4 h-4"></i> Nuevo Producto
          </button>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="glass-panel p-6">
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto / Especificaciones</th>
                <th>Ubicación</th>
                <th>Costo</th>
                <th>Precio Venta</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => {
                const cat = categories.find(c => c.id === p.category_id);
                return (
                  <tr key={p.id}>
                    <td className="font-mono text-xs text-cyan-400 font-semibold">{p.internal_code}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image_url || 'https://images.unsplash.com/photo-1597872250970-45d9472d7335?auto=format&fit=crop&w=100&q=80'} 
                          alt={p.name} 
                          className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">{p.name}</p>
                          <p className="text-[11px] text-gray-400">{p.brand} {p.model} • <span className="text-cyan-400">{cat ? cat.name : ''}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-300 text-xs">{p.location}</td>
                    <td className="text-gray-400 text-xs font-mono">${p.purchase_cost.toFixed(2)}</td>
                    <td className="text-emerald-400 font-bold font-mono">${p.selling_price.toFixed(2)}</td>
                    <td>
                      <span className={`font-extrabold ${p.stock_quantity <= p.min_stock ? 'text-red-400' : 'text-white'}`}>
                        {p.stock_quantity}
                      </span>
                      <span className="text-gray-500 text-[10px]"> (Mín: {p.min_stock})</span>
                    </td>
                    <td>
                      <span className={`badge ${p.stock_quantity === 0 ? 'badge-danger' : (p.stock_quantity <= p.min_stock ? 'badge-warning' : 'badge-success')}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onDuplicateProduct(p)} title="Duplicar Producto" className="p-1.5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg">
                          <i data-lucide="copy" className="w-4 h-4"></i>
                        </button>
                        <button onClick={() => onOpenEditModal(p)} title="Editar Producto" className="p-1.5 hover:bg-white/10 text-cyan-400 rounded-lg">
                          <i data-lucide="edit-2" className="w-4 h-4"></i>
                        </button>
                        <button onClick={() => onDeleteProduct(p)} title="Eliminar Producto" className="p-1.5 hover:bg-red-500/10 text-red-400 rounded-lg">
                          <i data-lucide="trash-2" className="w-4 h-4"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: COMPRAS & FACTURAS FOTOGRAFIADAS
// ---------------------------------------------------------------------
function PurchasesView({ purchases, suppliers, products, onOpenNewPurchase, onOpenLightbox }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Historial de Compras de Materiales y Respaldos</h2>
          <p className="text-xs text-gray-400">Facturas fotografiadas vinculadas a proveedores</p>
        </div>
        <button onClick={onOpenNewPurchase} className="btn-primary text-xs py-2">
          <i data-lucide="plus" className="w-4 h-4"></i> Registrar Compra + Subir Factura
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchases.map(pur => {
          const sup = suppliers.find(s => s.id === pur.supplier_id);
          return (
            <div key={pur.id} className="glass-panel p-5 space-y-4">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">N° Factura: {pur.invoice_number || 'Sin Número'}</span>
                  <h3 className="font-bold text-white text-base mt-0.5">{sup ? sup.name : 'Proveedor General'}</h3>
                  <p className="text-[11px] text-gray-400">{pur.purchase_date} • Pago: {pur.payment_method}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Compra</span>
                  <p className="text-xl font-extrabold text-emerald-400 font-mono">${pur.total_amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Fotografías de Facturas */}
              <div>
                <p className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                  <i data-lucide="camera" className="w-3.5 h-3.5 text-cyan-400"></i>
                  Fotografía(s) de Factura Digitalizada:
                </p>

                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {pur.invoices && pur.invoices.map(inv => (
                    <div 
                      key={inv.id} 
                      onClick={() => onOpenLightbox(inv.image_url, `Factura ${pur.invoice_number} - ${sup ? sup.name : ''}`)}
                      className="relative group cursor-pointer shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-cyan-500 transition-all w-24 h-24 bg-gray-900"
                    >
                      <img src={inv.image_url} alt="Factura" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <i data-lucide="maximize-2" className="w-5 h-5 text-white"></i>
                      </div>
                    </div>
                  ))}
                  {(!pur.invoices || pur.invoices.length === 0) && (
                    <span className="text-xs text-gray-500 italic">Sin imágenes de factura adjuntas</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: GALERÍA EXCLUSIVA DE FACTURAS
// ---------------------------------------------------------------------
function InvoicesGalleryView({ purchases, suppliers, onOpenLightbox }) {
  const [filterSupplier, setFilterSupplier] = useState('ALL');

  const allInvoices = useMemo(() => {
    const list = [];
    purchases.forEach(pur => {
      const sup = suppliers.find(s => s.id === pur.supplier_id);
      if (pur.invoices) {
        pur.invoices.forEach(inv => {
          list.push({
            ...inv,
            purchase_id: pur.id,
            invoice_number: pur.invoice_number,
            supplier_name: sup ? sup.name : 'Proveedor',
            purchase_date: pur.purchase_date,
            total_amount: pur.total_amount,
            supplier_id: pur.supplier_id
          });
        });
      }
    });
    return list;
  }, [purchases, suppliers]);

  const filteredInvoices = allInvoices.filter(i => filterSupplier === 'ALL' || i.supplier_id === filterSupplier);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <i data-lucide="image" className="w-4 h-4 text-cyan-400"></i>
          Galería de Facturas Digitalizadas ({filteredInvoices.length})
        </h3>

        <select 
          value={filterSupplier} 
          onChange={(e) => setFilterSupplier(e.target.value)}
          className="input-field w-48"
        >
          <option value="ALL">Todos los Proveedores</option>
          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredInvoices.map(inv => (
          <div 
            key={inv.id} 
            onClick={() => onOpenLightbox(inv.image_url, `Factura N° ${inv.invoice_number} - ${inv.supplier_name}`)}
            className="glass-panel group cursor-pointer overflow-hidden border border-white/10 hover:border-cyan-500 transition-all flex flex-col"
          >
            <div className="relative h-44 bg-gray-950 overflow-hidden">
              <img src={inv.image_url} alt="Factura" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                ${inv.total_amount.toFixed(2)}
              </span>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-white truncate">{inv.invoice_number || 'Factura S/N'}</p>
              <p className="text-[11px] text-gray-400 truncate">{inv.supplier_name}</p>
              <span className="text-[10px] text-gray-500">{inv.purchase_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: PROVEEDORES
// ---------------------------------------------------------------------
function SuppliersView({ suppliers, onOpenAdd, onOpenEdit, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-white">Directorio de Proveedores</h2>
        <button onClick={onOpenAdd} className="btn-primary py-2 text-xs">
          <i data-lucide="plus" className="w-4 h-4"></i> Nuevo Proveedor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suppliers.map(sup => (
          <div key={sup.id} className="glass-panel p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white text-base">{sup.name}</h3>
                <p className="text-xs text-cyan-400 font-semibold">{sup.company}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => onOpenEdit(sup)} className="p-1 text-cyan-400 hover:bg-white/10 rounded">
                  <i data-lucide="edit" className="w-4 h-4"></i>
                </button>
                <button onClick={() => onDelete(sup)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                  <i data-lucide="trash" className="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <i data-lucide="phone" className="w-3.5 h-3.5 text-gray-400"></i> {sup.phone}
              </p>
              <p className="flex items-center gap-2">
                <i data-lucide="mail" className="w-3.5 h-3.5 text-gray-400"></i> {sup.email}
              </p>
              <p className="flex items-center gap-2">
                <i data-lucide="map-pin" className="w-3.5 h-3.5 text-gray-400"></i> {sup.address}
              </p>
            </div>

            {sup.whatsapp && (
              <a 
                href={`https://wa.me/${sup.whatsapp}`} 
                target="_blank" 
                className="mt-3 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 py-2 rounded-lg text-xs font-semibold transition-all"
              >
                <i data-lucide="message-square" className="w-4 h-4"></i> Contactar por WhatsApp
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: CATEGORÍAS
// ---------------------------------------------------------------------
function CategoriesView({ categories, onOpenAdd, onOpenEdit, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-white">Categorías de Componentes</h2>
        <button onClick={onOpenAdd} className="btn-primary py-2 text-xs">
          <i data-lucide="plus" className="w-4 h-4"></i> Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="glass-panel p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">{cat.name}</h4>
              <p className="text-[11px] text-gray-400 line-clamp-1">{cat.description}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => onOpenEdit(cat)} className="p-1 text-cyan-400">
                <i data-lucide="edit" className="w-3.5 h-3.5"></i>
              </button>
              <button onClick={() => onDelete(cat)} className="p-1 text-red-400">
                <i data-lucide="trash" className="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: MOVIMIENTOS (KARDEX)
// ---------------------------------------------------------------------
function MovementsView({ movements, products }) {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Historial de Entradas, Salidas y Ajustes (Kardex)
        </h3>

        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Producto</th>
                <th>Tipo de Movimiento</th>
                <th>Cantidad</th>
                <th>Usuario</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {movements.map(mov => {
                const prod = products.find(p => p.id === mov.product_id);
                return (
                  <tr key={mov.id}>
                    <td className="text-gray-400 font-mono text-xs">{mov.date}</td>
                    <td className="font-bold text-white">{prod ? prod.name : 'Producto'}</td>
                    <td>
                      <span className={`badge ${mov.movement_type === 'Entrada' ? 'badge-success' : 'badge-warning'}`}>
                        {mov.movement_type}
                      </span>
                    </td>
                    <td className="font-mono font-bold text-white">{mov.quantity}</td>
                    <td className="text-gray-300 text-xs">{mov.user}</td>
                    <td className="text-gray-400 text-xs">{mov.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: REPORTES
// ---------------------------------------------------------------------
function ReportsView({ products, purchases, movements, stats }) {
  const exportPDF = () => {
    const element = document.getElementById('report-container');
    html2pdf().from(element).save('Reporte_TechFix_ERP.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-base font-bold text-white">Generación de Reportes del Sistema</h2>
        <button onClick={exportPDF} className="btn-primary py-2 text-xs">
          <i data-lucide="file-text" className="w-4 h-4"></i> Exportar Reporte Completo a PDF
        </button>
      </div>

      <div id="report-container" className="glass-panel p-8 space-y-6 bg-[#141b2d]">
        <div className="border-b border-white/10 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">TechFix ERP - Taller de Computación</h1>
            <p className="text-xs text-cyan-400">Reporte Consolidado de Valorización de Inventario y Movimientos</p>
          </div>
          <span className="text-xs text-gray-400">Fecha: {new Date().toLocaleDateString('es-ES')}</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <span className="text-xs text-gray-400">Inversión Total en Costos</span>
            <p className="text-xl font-extrabold text-white font-mono">${stats.totalInventoryPurchaseValue.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <span className="text-xs text-gray-400">Valor Estimado de Venta</span>
            <p className="text-xl font-extrabold text-emerald-400 font-mono">${stats.totalInventorySalesValue.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <span className="text-xs text-gray-400">Margen Potencial Ganancia</span>
            <p className="text-xl font-extrabold text-cyan-400 font-mono">
              ${(stats.totalInventorySalesValue - stats.totalInventoryPurchaseValue).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// COMPONENTE: CONFIGURACIÓN DE SUPABASE
// ---------------------------------------------------------------------
function SettingsView({ config, onSaveConfig }) {
  const [url, setUrl] = useState(config.url);
  const [key, setKey] = useState(config.key);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <i data-lucide="database" className="w-4 h-4 text-cyan-400"></i>
          Conexión a Supabase (Base de Datos & Storage)
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">SUPABASE_URL</label>
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://xxxx.supabase.co"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">SUPABASE_ANON_KEY</label>
          <input 
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="eyJhbGci..."
            className="input-field"
          />
        </div>

        <button onClick={() => onSaveConfig({ url, key })} className="btn-primary py-2 text-xs">
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// MODALES AUXILIARES DE FORMULARIOS
// ---------------------------------------------------------------------
function ProductFormModal({ mode, initialData, categories, suppliers, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData || {
    internal_code: 'PROD-' + Math.floor(1000 + Math.random() * 9000),
    name: '',
    category_id: categories[0] ? categories[0].id : '',
    brand: '',
    model: '',
    description: '',
    serial_number: '',
    supplier_id: suppliers[0] ? suppliers[0].id : '',
    location: 'Estante A-1',
    purchase_cost: 0,
    selling_price: 0,
    stock_quantity: 1,
    min_stock: 3,
    image_url: ''
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel p-6 max-w-2xl w-full my-8 space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white">{mode === 'edit' ? 'Editar Producto' : 'Registrar Nuevo Producto'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><i data-lucide="x" className="w-5 h-5"></i></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 mb-1">Código Interno</label>
            <input type="text" value={formData.internal_code} onChange={e => setFormData({ ...formData, internal_code: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Nombre del Producto</label>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Categoría</label>
            <select value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value })} className="input-field">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Marca</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Costo Compra ($)</label>
            <input type="number" step="0.01" value={formData.purchase_cost} onChange={e => setFormData({ ...formData, purchase_cost: parseFloat(e.target.value) || 0 })} className="input-field" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Precio Venta ($)</label>
            <input type="number" step="0.01" value={formData.selling_price} onChange={e => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })} className="input-field" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Stock Disponible</label>
            <input type="number" value={formData.stock_quantity} onChange={e => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })} className="input-field" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Stock Mínimo (Alerta)</label>
            <input type="number" value={formData.min_stock} onChange={e => setFormData({ ...formData, min_stock: parseInt(e.target.value) || 0 })} className="input-field" />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
          <button onClick={onClose} className="btn-secondary text-xs py-2">Cancelar</button>
          <button onClick={() => onSave(formData)} className="btn-primary text-xs py-2">Guardar Producto</button>
        </div>
      </div>
    </div>
  );
}

function PurchaseFormModal({ suppliers, products, onClose, onSave }) {
  const [supplierId, setSupplierId] = useState(suppliers[0] ? suppliers[0].id : '');
  const [invoiceNumber, setInvoiceNumber] = useState('FAC-' + Math.floor(10000 + Math.random() * 90000));
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [items, setItems] = useState([{ product_id: products[0] ? products[0].id : '', quantity: 1, unit_cost: products[0] ? products[0].purchase_cost : 0 }]);
  const [invoiceImages, setInvoiceImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInvoiceImages(prev => [
          ...prev, 
          { id: 'inv-' + Date.now() + Math.random(), file_name: file.name, image_url: event.target.result }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const totalAmount = items.reduce((acc, i) => acc + (i.quantity * i.unit_cost), 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel p-6 max-w-3xl w-full my-8 space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white">Registrar Compra de Materiales + Factura Fotografiada</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><i data-lucide="x" className="w-5 h-5"></i></button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 mb-1">Proveedor</label>
            <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="input-field">
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.company})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">N° de Factura</label>
            <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Método de Pago</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="input-field">
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia Bancaria</option>
              <option value="Tarjeta">Tarjeta de Crédito</option>
            </select>
          </div>
        </div>

        {/* Carga Fotográfica de Factura */}
        <div className="p-4 bg-white/5 border border-dashed border-cyan-500/30 rounded-xl text-center space-y-2">
          <p className="text-xs font-semibold text-cyan-400 flex items-center justify-center gap-2">
            <i data-lucide="camera" className="w-4 h-4"></i>
            📷 Tomar fotografía desde celular o seleccionar imagen de factura
          </p>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            multiple 
            onChange={handleImageUpload} 
            className="hidden" 
            id="invoice-photo-input"
          />
          <label htmlFor="invoice-photo-input" className="btn-secondary inline-flex py-1.5 px-4 text-xs cursor-pointer">
            Seleccionar / Tomar Foto
          </label>

          <div className="flex gap-2 overflow-x-auto justify-center mt-2">
            {invoiceImages.map(img => (
              <img key={img.id} src={img.image_url} className="w-16 h-16 object-cover rounded border border-cyan-500/40" />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-sm font-bold text-white">Total: ${totalAmount.toFixed(2)}</span>
          <button onClick={() => onSave({ supplier_id: supplierId, invoice_number: invoiceNumber, payment_method: paymentMethod, total_amount: totalAmount, items, invoices: invoiceImages, purchase_date: new Date().toISOString().split('T')[0] })} className="btn-primary text-xs py-2">
            Guardar Compra y Actualizar Stock
          </button>
        </div>
      </div>
    </div>
  );
}

function SupplierFormModal({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData || { name: '', company: '', phone: '', whatsapp: '', email: '', address: '', rtn: '' });
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 max-w-md w-full space-y-4">
        <h3 className="text-base font-bold text-white">{initialData ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
        <input type="text" placeholder="Nombre de Contacto" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" />
        <input type="text" placeholder="Empresa" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="input-field" />
        <input type="text" placeholder="Teléfono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input-field" />
        <input type="text" placeholder="WhatsApp (ej. 50499887766)" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} className="input-field" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary text-xs py-1.5">Cancelar</button>
          <button onClick={() => onSave(formData)} className="btn-primary text-xs py-1.5">Guardar</button>
        </div>
      </div>
    </div>
  );
}

function CategoryFormModal({ initialData, onClose, onSave }) {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 max-w-md w-full space-y-4">
        <h3 className="text-base font-bold text-white">{initialData ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
        <input type="text" placeholder="Nombre de la categoría" value={name} onChange={e => setName(e.target.value)} className="input-field" />
        <input type="text" placeholder="Descripción breve" value={description} onChange={e => setDescription(e.target.value)} className="input-field" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary text-xs py-1.5">Cancelar</button>
          <button onClick={() => onSave({ id: initialData ? initialData.id : undefined, name, description })} className="btn-primary text-xs py-1.5">Guardar</button>
        </div>
      </div>
    </div>
  );
}

// Renderizar la aplicación React en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TechFixApp />);
