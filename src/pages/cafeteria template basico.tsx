import React, { useState } from 'react';

interface ExtraOption {
  nombre: string;
  precio: number;
}

interface MenuItem {
  id: string;
  nombre: string;
  ingredientes: string[];
  precio: number;
  categoria: 'todos' | 'cafe' | 'panaderia' | 'postres';
  imagenUrl: string;
  popular?: boolean;
  extrasDisponibles?: ExtraOption[];
}

const EXTRAS_CAFE_DEFAULT: ExtraOption[] = [
  { nombre: 'Shot de espresso extra', precio: 15 },
  { nombre: 'Leche de Almendra / Avena', precio: 12 },
  { nombre: 'Leche Deslactosada / Sombra', precio: 8 },
  { nombre: 'Jarabe de Vainilla / Caramelo', precio: 10 },
];

const MENU_DATA: MenuItem[] = [
  {
    id: '1',
    nombre: 'Capuchino Artesanal',
    ingredientes: ['Espresso doble', 'Leche cremada', 'Cacao en polvo'],
    precio: 55,
    categoria: 'cafe',
    imagenUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800',
    popular: true,
    extrasDisponibles: EXTRAS_CAFE_DEFAULT,
  },
  {
    id: '2',
    nombre: 'Espresso Doble',
    ingredientes: ['Extracción doble de grano 100% arábica'],
    precio: 40,
    categoria: 'cafe',
    imagenUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800',
    extrasDisponibles: [
      { nombre: 'Shot de espresso extra', precio: 15 },
      { nombre: 'Toque de crema batida', precio: 10 },
    ],
  },
  {
    id: '3',
    nombre: 'Flat White',
    ingredientes: ['Doble shot de espresso', 'Leche microfumada'],
    precio: 50,
    categoria: 'cafe',
    imagenUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800',
    extrasDisponibles: EXTRAS_CAFE_DEFAULT,
  },
  {
    id: '4',
    nombre: 'Croissant de Almendra',
    ingredientes: ['Masa hojaldrada', 'Frangipane de almendra', 'Almendra fileteada'],
    precio: 65,
    categoria: 'panaderia',
    imagenUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    popular: true,
  },
  {
    id: '5',
    nombre: 'Cheesecake de Frutos Rojos',
    ingredientes: ['Base de galleta', 'Queso crema', 'Mermelada artesanal de frutos rojos'],
    precio: 75,
    categoria: 'postres',
    imagenUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
  },
];

const CATEGORIAS = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'cafe', nombre: 'Café' },
  { id: 'panaderia', nombre: 'Panadería' },
  { id: 'postres', nombre: 'Postres' },
];

export default function MenuCafeteria() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
  const [itemSeleccionado, setItemSeleccionado] = useState<MenuItem | null>(null);

  // Configuración de WhatsApp
  const TELEFONO_WHATSAPP = '5215512345678';
  const MENSAJE_WHATSAPP = encodeURIComponent('¡Hola! Me gustaría hacer un pedido desde el menú digital.');
  const LINK_WHATSAPP = `https://wa.me/${TELEFONO_WHATSAPP}?text=${MENSAJE_WHATSAPP}`;

  const itemsFiltrados = categoriaActiva === 'todos' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 pb-24 font-sans antialiased relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-stone-900 text-amber-50 px-4 py-6 shadow-md">
        <div className="max-w-md mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Café & Bar</span>
          <h1 className="text-2xl font-serif font-bold tracking-tight mt-1">Café de Barrio</h1>
          <p className="text-xs text-stone-400 mt-1">Toca cualquier producto para ampliar la imagen y opciones</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6">
        {/* Filtro por Categorías */}
        <nav className="flex space-x-2 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                categoriaActiva === cat.id
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </nav>

        {/* Lista de Productos */}
        <section className="mt-4 space-y-4">
          {itemsFiltrados.map((item) => (
            <article 
              key={item.id} 
              onClick={() => setItemSeleccionado(item)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex gap-4 items-center hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={item.imagenUrl} 
                  alt={item.nombre} 
                  className="w-24 h-24 rounded-xl object-cover bg-stone-100"
                  loading="lazy"
                />
                {item.popular && (
                  <span className="absolute -top-2 -left-2 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    ★ Popular
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-semibold text-stone-900 text-base leading-snug truncate">
                    {item.nombre}
                  </h2>
                  <span className="font-bold text-amber-900 text-base flex-shrink-0">
                    ${item.precio}
                  </span>
                </div>

                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.ingredientes.join(', ')}
                </p>
                
                <span className="inline-block text-[11px] text-amber-800 font-medium mt-2">
                  Ver detalle y extras →
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* MODAL / POP-UP DE ACCESIBILIDAD */}
      {itemSeleccionado && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setItemSeleccionado(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-stone-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setItemSeleccionado(null)}
              className="absolute top-3 right-3 z-10 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full p-2 transition-colors focus:outline-none"
              aria-label="Cerrar vista ampliada"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen Ampliada */}
            <div className="relative h-64 w-full bg-stone-100">
              <img 
                src={itemSeleccionado.imagenUrl} 
                alt={itemSeleccionado.nombre} 
                className="w-full h-full object-cover"
              />
              {itemSeleccionado.popular && (
                <span className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ★ Recomendado
                </span>
              )}
            </div>

            {/* Contenido Ampliado (Alta Legibilidad) */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline gap-2">
                <h2 className="text-2xl font-bold text-stone-900 leading-tight">
                  {itemSeleccionado.nombre}
                </h2>
                <span className="text-2xl font-black text-amber-900 flex-shrink-0">
                  ${itemSeleccionado.precio}
                </span>
              </div>

              {/* Ingredientes Básicos */}
              <div className="border-t border-stone-200 pt-3">
                <h3 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">
                  Ingredientes & Detalles
                </h3>
                <p className="text-base text-stone-800 font-medium leading-relaxed">
                  {itemSeleccionado.ingredientes.join(', ')}
                </p>
              </div>

              {/* Opciones Adicionales / Extras (Si aplica) */}
              {itemSeleccionado.extrasDisponibles && itemSeleccionado.extrasDisponibles.length > 0 && (
                <div className="border-t border-stone-100 pt-3 bg-amber-50/50 -mx-6 px-6 py-3">
                  <h3 className="text-xs uppercase tracking-wider text-amber-900 font-bold mb-2">
                    Personaliza tu café (Opciones extra)
                  </h3>
                  <ul className="space-y-1.5">
                    {itemSeleccionado.extrasDisponibles.map((extra, idx) => (
                      <li key={idx} className="flex justify-between items-center text-xs text-stone-600">
                        <span className="font-medium text-stone-700">+ {extra.nombre}</span>
                        <span className="font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                          +${extra.precio}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setItemSeleccionado(null)}
                className="w-full mt-2 bg-stone-900 text-amber-50 font-semibold py-3 rounded-xl hover:bg-stone-800 transition-colors"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante para Pedir por WhatsApp */}
      <div className="fixed bottom-6 right-4 left-4 max-w-md mx-auto z-20 pointer-events-none flex justify-end">
        <a
          href={LINK_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span className="text-sm">Pedir por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}