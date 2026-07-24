# TechFix ERP - Sistema de Control de Inventario y Gestión para Taller de Computación

Una aplicación web profesional tipo ERP para administrar talleres de reparación y venta de computadoras, repuestos, compras y respaldo digital fotografiado de facturas.

---

## 🚀 Características Principales

- **Dashboard Ejecutivo**: Tarjetas KPI con valor del inventario (costo vs. precio de venta), productos registrados, total de facturas y repuestos en nivel crítico con alerta visual en rojo.
- **Módulo de Inventario (CRUD)**: Búsqueda inteligente por nombre, código interno, marca, modelo y número de serie. Filtros por categoría y estado de stock. Exportación en 1-clic a Excel (`.xlsx`), PDF e impresión.
- **Facturas Fotografiadas (Función Especial)**: Permite capturar fotos de facturas directamente desde la cámara del celular (`capture="environment"`) o subir archivos desde la PC al registrar compras.
- **Galería e Historial de Facturas**: Visor modal de facturas con pantalla completa, rotación (90°, 180°, 270°), descarga directa e inspección de comprobantes por proveedor.
- **Movimientos de Stock (Kardex)**: Trazabilidad automática de entradas al comprar repuestos y salidas al realizar mantenimientos o ventas.
- **Proveedores y Categorías**: CRUD completo con enlace directo de contacto por WhatsApp.
- **Soporte Híbrido Supabase + Demo**: Funciona al instante con datos de prueba locales y está preparado para conectarse a **Supabase PostgreSQL & Storage** mediante el archivo `schema.sql`.

---

## 🛠️ Cómo Ejecutar el Sistema Localmente

### Opción A: Servidor Python Integrado (Recomendado)
Abre la consola de comandos en esta carpeta y ejecuta:
```bash
python server.py
```
Luego abre en tu navegador: **http://localhost:8000**

---

## 🗄️ Configuración con Supabase (Opcional para producción)

1. En tu proyecto de Supabase, ve al **SQL Editor**.
2. Copia y ejecuta todo el contenido de `schema.sql` (creará las tablas `products`, `purchases`, `invoices`, `suppliers`, `categories`, `stock_movements` y los buckets de Storage `invoices` y `products` con políticas RLS).
3. En la sección **Configuración** de la aplicación web, ingresa tu `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
