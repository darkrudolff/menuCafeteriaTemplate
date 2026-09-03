import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Check, Coffee, Trash2, Utensils, ShoppingBag as BagIcon, User } from 'lucide-react';

// ==========================================
// 1. DEFINICIÓN DE TIPOS E INTERFACES
// ==========================================
export interface ExtraOption {
  id: string;
  nombre: string;
  precio: number;
}

export interface ExtraCategory {
  titulo: string;
  opciones: ExtraOption[];
}

export interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precioBase: number;
  imagen: string;
  aplicaExtras: boolean;
}

export interface MenuCategory {
  id: string;
  nombre: string;
  productos: MenuItem[];
}

export interface SelectedExtra {
  categoria: string;
  opcion: ExtraOption;
}

export interface CartItem {
  idUnico: string;
  producto: MenuItem;
  extras: SelectedExtra[];
  precioTotalUnitario: number;
  cantidad: number;
  notas: string;
}

export type TipoEntrega = 'restaurante' | 'llevar' | null;

// ==========================================
// 2. CONFIGURACIÓN DE EXTRAS Y MENÚ
// ==========================================
export const EXTRAS_CAFETERIA: ExtraCategory[] = [
  {
    titulo: "Tipo de Leche",
    opciones: [
      { id: "leche-entera", nombre: "Entera (Tradicional)", precio: 0 },
      { id: "leche-deslactosada", nombre: "Deslactosada", precio: 0 },
      { id: "leche-almendra", nombre: "Almendra", precio: 12 },
      { id: "leche-avena", nombre: "Avena", precio: 15 }
    ]
  },
  {
    titulo: "Cargas de Espresso",
    opciones: [
      { id: "shot-extra", nombre: "Shot Extra de Espresso", precio: 15 },
      { id: "descafeinado", nombre: "Cambiar a Descafeinado", precio: 0 }
    ]
  },
  {
    titulo: "Jarabes y Sabores",
    opciones: [
      { id: "jarabe-vainilla", nombre: "Jarabe de Vainilla", precio: 10 },
      { id: "jarabe-caramelo", nombre: "Jarabe de Caramelo", precio: 10 },
      { id: "jarabe-avellana", nombre: "Jarabe de Avellana", precio: 10 }
    ]
  }
];

export const MENU_PROTOTIPO: MenuCategory[] = [
  {
    id: "cafes-calientes",
    nombre: "Cafés Calientes",
    productos: [
      { id: 101, nombre: "Espresso Italiano", descripcion: "Extracción corta de café concentrado con crema densa.", precioBase: 35, imagen: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 102, nombre: "Americano", descripcion: "Espresso diluido en agua caliente con tueste medio.", precioBase: 40, imagen: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 103, nombre: "Cappuccino Tradicional", descripcion: "Espresso, leche vaporizada y abundante espuma de leche.", precioBase: 55, imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 104, nombre: "Café Latte", descripcion: "Espresso con abundante leche al vapor y capa fina de espuma.", precioBase: 58, imagen: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 105, nombre: "Mochaccino", descripcion: "Espresso con chocolate artesanal, leche al vapor y crema batida.", precioBase: 65, imagen: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 106, nombre: "Flat White", descripcion: "Doble carga de espresso con leche micro-vaporizada.", precioBase: 60, imagen: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80", aplicaExtras: true }
    ]
  },
  {
    id: "bebidas-frias",
    nombre: "Bebidas Frías y Frappés",
    productos: [
      { id: 201, nombre: "Iced Latte Vanilla", descripcion: "Espresso con leche fría, jarabe de vainilla y hielo.", precioBase: 62, imagen: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 202, nombre: "Frappé Mocha Oreo", descripcion: "Base de café helado batido con galleta Oreo y crema batida.", precioBase: 75, imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 203, nombre: "Cold Brew Artesanal", descripcion: "Café macerado en frío durante 16 horas, suave y poco ácido.", precioBase: 50, imagen: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 204, nombre: "Matcha Iced Latte", descripcion: "Té matcha orgánico batido con leche fría y hielo.", precioBase: 70, imagen: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 205, nombre: "Frappé Caramel Crunch", descripcion: "Café helado con jarabe de caramelo y trozos de toffee.", precioBase: 75, imagen: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 206, nombre: "Té Helado Durazno", descripcion: "Infusión de té negro con toque natural de durazno.", precioBase: 45, imagen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80", aplicaExtras: false }
    ]
  },
  {
    id: "panaderia-reposteria",
    nombre: "Panadería y Repostería",
    productos: [
      { id: 301, nombre: "Croissant de Mantequilla", descripcion: "Pan hojaldrado artesanal horneado diariamente.", precioBase: 38, imagen: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 302, nombre: "Chocolatín (Pain au Chocolat)", descripcion: "Hojaldre relleno de dos barras de chocolate oscuro.", precioBase: 42, imagen: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 303, nombre: "Rebanada Pastel Red Velvet", descripcion: "Pastel suave de cacao con cobertura de queso crema.", precioBase: 68, imagen: "https://images.unsplash.com/photo-1586788680404-3282482837d3?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 304, nombre: "Cheesecake de Frutos Rojos", descripcion: "Tarta de queso estilo Nueva York con mermelada casera.", precioBase: 72, imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 305, nombre: "Muffin de Chispas de Chocolate", descripcion: "Panecillo esponjoso repleto de trozos de chocolate.", precioBase: 35, imagen: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 306, nombre: "Cinnamon Roll", descripcion: "Rollo de canela tibio con glaseado de vainilla.", precioBase: 48, imagen: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&q=80", aplicaExtras: false }
    ]
  },
  {
    id: "sandwiches-salados",
    nombre: "Sandwiches y Salados",
    productos: [
      { id: 401, nombre: "Panini Jamón Serrano y Gouda", descripcion: "Pan ciabatta con jamón serrano, queso gouda y pesto.", precioBase: 95, imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 402, nombre: "Bagel de Salmón Ahumado", descripcion: "Con queso crema, alcaparras y cebolla morada.", precioBase: 115, imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 403, nombre: "Croissant Caprese", descripcion: "Relleno de jitomate, queso mozzarella fresco y albahaca.", precioBase: 85, imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 404, nombre: "Club Sandwich Tradicional", descripcion: "Pollo, tocino, queso, lechuga, jitomate y mayonesa.", precioBase: 105, imagen: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 405, nombre: "Sándwich de Pollo al Chipotle", descripcion: "Pechuga deshebrada con aderezo casero de chipotle.", precioBase: 88, imagen: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=400&q=80", aplicaExtras: false }
    ]
  },
  {
    id: "desayunos-brunch",
    nombre: "Desayunos y Brunch",
    productos: [
      { id: 501, nombre: "Avocado Toast con Huevo", descripcion: "Pan de masa madre con aguacate machacado y huevo pochado.", precioBase: 92, imagen: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 502, nombre: "Bowl de Acai y Fruta", descripcion: "Base de acai con plátano, fresas, granola y miel.", precioBase: 88, imagen: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 503, nombre: "Pancakes de Arándanos", descripcion: "Tres pancakes esponjosos servidos con jarabe de arce.", precioBase: 80, imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 504, nombre: "Chilaquiles Verdes o Rojos", descripcion: "Con crema, queso fresco, cebolla y proteína a elegir.", precioBase: 98, imagen: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 505, nombre: "Waffles con Nieve de Vainilla", descripcion: "Waffles crujientes acompañados de fruta de temporada.", precioBase: 85, imagen: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80", aplicaExtras: false }
    ]
  },
  {
    id: "metodos-tes",
    nombre: "Métodos de Extracción y Tés",
    productos: [
      { id: 601, nombre: "Método V60 / Chemex", descripcion: "Extracción filtrada que resalta notas florales y frutales.", precioBase: 65, imagen: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 602, nombre: "Prensa Francesa", descripcion: "Café de cuerpo completo e intensidad pronunciada.", precioBase: 55, imagen: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 603, nombre: "Chai Tea Latte", descripcion: "Té negro especiado con leche vaporizada y canela.", precioBase: 62, imagen: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80", aplicaExtras: true },
      { id: 604, nombre: "Infusión Manzanilla y Menta", descripcion: "Mezcla de hierbas naturales sin cafeína.", precioBase: 40, imagen: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80", aplicaExtras: false },
      { id: 605, nombre: "Té Verde Sencha", descripcion: "Té verde japonés de perfil herbal y fresco.", precioBase: 42, imagen: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80", aplicaExtras: false }
    ]
  }
];

const LISTA_CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  ...MENU_PROTOTIPO.map(cat => ({ id: cat.id, nombre: cat.nombre }))
];

const LOCAL_STORAGE_KEY = 'cafe_velvet_carrito_v1';

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState<MenuItem | null>(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<Record<string, ExtraOption>>({});
  const [notas, setNotas] = useState<string>('');
  const [mostrarCarrito, setMostrarCarrito] = useState<boolean>(false);

  // Estados para datos obligatorios de la orden
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>(null);
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const [erroresFormulario, setErroresFormulario] = useState<{ entrega?: boolean; nombre?: boolean }>({});

  // Inicializar estado del Carrito desde LocalStorage
  const [carrito, setCarrito] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const datosGuardados = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (datosGuardados) {
        try {
          return JSON.parse(datosGuardados);
        } catch (e) {
          console.error("Error al parsear el carrito de localStorage", e);
        }
      }
    }
    return [];
  });

  // Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Obtener Categorías a mostrar
  const categoriasAMostrar = categoriaActiva === "todos"
    ? MENU_PROTOTIPO
    : MENU_PROTOTIPO.filter(cat => cat.id === categoriaActiva);

  // Abrir Modal de Producto
  const abrirModal = (producto: MenuItem) => {
    setProductoSeleccionado(producto);
    setExtrasSeleccionados({});
    setNotas('');
  };

  // Manejar Selección de Extras
  const toggleExtra = (tituloCategoria: string, opcion: ExtraOption) => {
    setExtrasSeleccionados(prev => {
      const nuevoState = { ...prev };
      if (nuevoState[tituloCategoria]?.id === opcion.id) {
        delete nuevoState[tituloCategoria];
      } else {
        nuevoState[tituloCategoria] = opcion;
      }
      return nuevoState;
    });
  };

  // Calcular Precio Total Unitario
  const calcularPrecioModal = (): number => {
    if (!productoSeleccionado) return 0;
    const precioExtras = Object.values(extrasSeleccionados).reduce((sum, item) => sum + item.precio, 0);
    return productoSeleccionado.precioBase + precioExtras;
  };

  // Agregar al Carrito
  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    const extrasArray: SelectedExtra[] = Object.entries(extrasSeleccionados).map(([cat, opc]) => ({
      categoria: cat,
      opcion: opc
    }));

    const nuevoItem: CartItem = {
      idUnico: `${productoSeleccionado.id}-${Date.now()}`,
      producto: productoSeleccionado,
      extras: extrasArray,
      precioTotalUnitario: calcularPrecioModal(),
      cantidad: 1,
      notas: notas
    };

    setCarrito(prev => [...prev, nuevoItem]);
    setProductoSeleccionado(null);
  };

  // Eliminar Artículo del Carrito
  const eliminarDelCarrito = (idUnico: string) => {
    setCarrito(prev => prev.filter(item => item.idUnico !== idUnico));
  };

  // Vaciar Carrito y Formulario
  const vaciarCarrito = () => {
    setCarrito([]);
    setTipoEntrega(null);
    setNombreCliente('');
    setErroresFormulario({});
  };

  // Totales
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const granTotal = carrito.reduce((sum, item) => sum + (item.precioTotalUnitario * item.cantidad), 0);

  // Seleccionar Tipo de Entrega
  const handleSeleccionarEntrega = (tipo: TipoEntrega) => {
    setTipoEntrega(tipo);
    setErroresFormulario(prev => ({ ...prev, entrega: false }));
  };

  // Enviar a WhatsApp con validación obligatoria y limpieza posterior
  const enviarWhatsApp = () => {
    const hayErrorEntrega = !tipoEntrega;
    const hayErrorNombre = !nombreCliente.trim();

    if (hayErrorEntrega || hayErrorNombre) {
      setErroresFormulario({
        entrega: hayErrorEntrega,
        nombre: hayErrorNombre
      });
      return;
    }

    const telefono = "522201404854"; // Reemplazar por el número de WhatsApp receptor
    const textoEntrega = tipoEntrega === 'restaurante' ? '🍽️ EN RESTAURANTE' : '🥡 PARA LLEVAR';
    
    let mensaje = `¡Hola! Quisiera realizar el siguiente pedido:\n`;
    mensaje += `*Cliente:* ${nombreCliente.trim()}\n`;
    mensaje += `*Modalidad:* ${textoEntrega}\n\n`;

    carrito.forEach((item, index) => {
      mensaje += `*${index + 1}. ${item.producto.nombre}* - $${item.precioTotalUnitario}\n`;
      if (item.extras.length > 0) {
        item.extras.forEach(ext => {
          mensaje += `   • ${ext.categoria}: ${ext.opcion.nombre} ${ext.opcion.precio > 0 ? `(+$${ext.opcion.precio})` : ''}\n`;
        });
      }
      if (item.notas) {
        mensaje += `   • Nota: ${item.notas}\n`;
      }
      mensaje += `\n`;
    });

    mensaje += `*TOTAL A PAGAR: $${granTotal} MXN*`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir ventana de WhatsApp
    window.open(url, '_blank');

    // Vaciar carrito y reiniciar formulario
    vaciarCarrito();
    setMostrarCarrito(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 pb-24 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-amber-600" />
            <h1 className="font-bold text-lg text-neutral-900">Café Velvet Demo</h1>
          </div>
          <button 
            onClick={() => setMostrarCarrito(true)}
            className="relative p-2 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* NAVEGACIÓN DE CATEGORÍAS */}
        <div className="flex overflow-x-auto gap-2 px-4 py-2 scrollbar-hide border-t border-neutral-100 max-w-md mx-auto">
          {LISTA_CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categoriaActiva === cat.id 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </header>

      {/* LISTA DE PRODUCTOS */}
      <main className="max-w-md mx-auto px-4 mt-4 space-y-6">
        {categoriasAMostrar.map(cat => (
          <div key={cat.id} className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-1">{cat.nombre}</h2>
            <div className="grid grid-cols-1 gap-3">
              {cat.productos.map(prod => (
                <div 
                  key={prod.id} 
                  onClick={() => abrirModal(prod)}
                  className="flex bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:border-amber-400 transition-all cursor-pointer"
                >
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div className="p-3 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">{prod.nombre}</h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-0.5">{prod.descripcion}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-amber-700 text-sm">${prod.precioBase}</span>
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                        <Plus className="w-3 h-3" /> Agregar
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* MODAL PERSONALIZACIÓN DE PRODUCTO */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="relative">
              <img 
                src={productoSeleccionado.imagen} 
                alt={productoSeleccionado.nombre} 
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1">
              <h3 className="text-lg font-bold text-neutral-900">{productoSeleccionado.nombre}</h3>
              <p className="text-xs text-neutral-500 mt-1">{productoSeleccionado.descripcion}</p>

              {productoSeleccionado.aplicaExtras && (
                <div className="mt-4 space-y-4">
                  {EXTRAS_CAFETERIA.map(catExtra => (
                    <div key={catExtra.titulo} className="border-t border-neutral-100 pt-3">
                      <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                        {catExtra.titulo}
                      </h4>
                      <div className="space-y-1.5">
                        {catExtra.opciones.map(opc => {
                          const estaSeleccionado = extrasSeleccionados[catExtra.titulo]?.id === opc.id;
                          return (
                            <button
                              key={opc.id}
                              onClick={() => toggleExtra(catExtra.titulo, opc)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                                estaSeleccionado 
                                  ? 'border-amber-600 bg-amber-50 text-amber-900 font-medium' 
                                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  estaSeleccionado ? 'border-amber-600 bg-amber-600 text-white' : 'border-neutral-300'
                                }`}>
                                  {estaSeleccionado && <Check className="w-3 h-3" />}
                                </span>
                                {opc.nombre}
                              </span>
                              {opc.precio > 0 && <span className="text-neutral-500">+${opc.precio}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 border-t border-neutral-100 pt-3">
                <label className="text-xs font-bold text-neutral-700 block mb-1">Notas especiales</label>
                <input 
                  type="text" 
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Ej. Muy caliente, sin azúcar..."
                  className="w-full text-xs p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <button 
                onClick={agregarAlCarrito}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between transition-colors"
              >
                <span>Agregar al Pedido</span>
                <span>${calcularPrecioModal()}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CARRITO / PEDIDO */}
      {mostrarCarrito && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900">Tu Pedido</h3>
                {carrito.length > 0 && (
                  <button 
                    onClick={vaciarCarrito}
                    className="text-[10px] text-red-500 hover:underline font-medium ml-2"
                  >
                    Vaciar todo
                  </button>
                )}
              </div>
              <button onClick={() => setMostrarCarrito(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {carrito.length > 0 && (
                <div className="space-y-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  {/* NOMBRE DEL CLIENTE (OBLIGATORIO) */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-neutral-600" />
                        Nombre del Cliente
                      </span>
                      <span className="text-[10px] text-red-500 uppercase tracking-wider font-semibold">* Requerido</span>
                    </label>
                    <input 
                      type="text"
                      value={nombreCliente}
                      onChange={(e) => {
                        setNombreCliente(e.target.value);
                        setErroresFormulario(prev => ({ ...prev, nombre: false }));
                      }}
                      placeholder="Escribe tu nombre completo..."
                      className={`w-full text-xs p-2.5 bg-white border rounded-lg focus:outline-none transition-colors ${
                        erroresFormulario.nombre 
                          ? 'border-red-500 ring-1 ring-red-500' 
                          : 'border-neutral-200 focus:border-amber-500'
                      }`}
                    />
                    {erroresFormulario.nombre && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1">
                        ⚠️ Por favor escribe tu nombre.
                      </p>
                    )}
                  </div>

                  {/* TIPO DE ENTREGA (OBLIGATORIO) */}
                  <div className="space-y-1.5 pt-1 border-t border-neutral-200/60">
                    <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                      <span>¿Cómo lo deseas disfrutar?</span>
                      <span className="text-[10px] text-red-500 uppercase tracking-wider font-semibold">* Requerido</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleSeleccionarEntrega('restaurante')}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          tipoEntrega === 'restaurante'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Utensils className="w-4 h-4" />
                        En restaurante
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSeleccionarEntrega('llevar')}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          tipoEntrega === 'llevar'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <BagIcon className="w-4 h-4" />
                        Para llevar
                      </button>
                    </div>
                    {erroresFormulario.entrega && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1">
                        ⚠️ Selecciona si es en restaurante o para llevar.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* LISTA DE ARTÍCULOS */}
              {carrito.length === 0 ? (
                <p className="text-center text-xs text-neutral-400 py-8">Tu carrito está vacío.</p>
              ) : (
                <div className="space-y-3">
                  {carrito.map(item => (
                    <div key={item.idUnico} className="flex items-start justify-between border-b border-neutral-100 pb-3 gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-xs text-neutral-900">{item.producto.nombre}</p>
                        {item.extras.map(e => (
                          <p key={e.opcion.id} className="text-[10px] text-neutral-500">
                            + {e.opcion.nombre}
                          </p>
                        ))}
                        {item.notas && <p className="text-[10px] italic text-neutral-400">"{item.notas}"</p>}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs text-amber-700">${item.precioTotalUnitario}</span>
                        <button 
                          onClick={() => eliminarDelCarrito(item.idUnico)}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Total</span>
                  <span className="text-amber-700">${granTotal} MXN</span>
                </div>
                <button 
                  onClick={enviarWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                >
                  Confirmar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}