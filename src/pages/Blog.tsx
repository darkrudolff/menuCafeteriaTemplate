import React, { useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Scissors, 
  Sparkles, 
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.75; // Desplaza el 75% del ancho de pantalla
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
    };
  const serviciosCorte = [
    { nombre: 'Corte Dama', descripcion: 'Incluye lavado y estilizado', precio: '$200' },
    { nombre: 'Corte Caballero', descripcion: 'Incluye lavado, afeitado con navaja y estilizado', precio: '$140' },
    { nombre: 'Peinado Social', descripcion: 'Semirecojido, recojido y messy', precio: '$550+' },
    { nombre: 'Alaseado express', descripcion: '', precio: '$150' },
    { nombre: 'Ondulado', descripcion: '', precio: '$250' },
    { nombre: 'Curly permanente', descripcion: 'Incluye base para dama o caballero', precio: '$650+' },
     { nombre: 'Queratina', descripcion: '', precio: '$1,400+' }
  ];

  const serviciosColor = [
    { nombre: 'Tinte Global', descripcion: 'Tono uniforme con shot de proteina', precio: '$900+' },
    { nombre: 'Retoque de Raíz', descripcion: 'Cobertura de cana / crecimiento de 1 a 2 cm', precio: '$500' },
    { nombre: 'Balayage / Mechas / babylights / highlights', descripcion: 'Diseño personalizado de iluminación', precio: '$1,900+' },
    { nombre: 'Matiz, glosing y shot de hidratacion', descripcion: 'Refresco de tono e hidratación', precio: '$800+' }
  ];
  const maquillajeProfesional = [
    { nombre: 'Maquillaje social', descripcion: 'Incluye peinado sencillo y pestañas postizas', precio: '$1,500' },
    { nombre: 'Maquillaje 15 años', descripcion: 'Incluye peinado, skincare y pestañas postizas, (no incluye prueba de maquillaje)', precio: '$2,100' },
    { nombre: 'Paquete de 15 años', descripcion: 'Incluye peinado, skincare, pestañas postizas y prueba de maquillaje', precio: '$4,000' },
    { nombre: 'Maquillaje de novia', descripcion: 'Incluye peinado sencillo o con estructura, skincare, exfoliación facial, parches para ojos, pestañas postizas y kit de regalo, (no incluye prieba de maquillaje)', precio: '$2,950' },
    { nombre: 'Paquete de novia', descripcion: 'Incluye Asesoramiento previo al evento, peinado sencillo o con estructura, skincare, parches, exfoliación facial, pestañas postizas, diseño de ceja, maquillaje correctivo, maquillaje de escote, kit de regalo y prueba de maquillaje', precio: '$5,500' }
  ];

  return (
    <div className="bg-[#121212] text-gray-200 min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Botón Flotante de WhatsApp */}
      <a
        href="https://wa.me/525521945420?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Velvet%20Room%20Hair"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center border border-green-400/30"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>

      {/* Navegación */}
      <nav className="fixed top-0 left-0 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#D4AF37]/20 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-widest text-white uppercase">
           <img src="/LogoVelvetRoomHair.jpeg" alt="" className="h-10 md:h-18 w-auto object-contain transition-all duration-300"/>
          </div>
          <div className="flex gap-6 text-sm uppercase tracking-wider">
            <a href="#servicios" className="hover:text-[#D4AF37] transition-colors">Precios</a>
            <a href="#ubicacion" className="hover:text-[#D4AF37] transition-colors">Ubicación</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 border-b border-[#D4AF37]/10 flex items-center min-h-[500px]">
        {/* Imagen de fondo con capa oscura (Overlay) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop"
            alt="Fondo Velvet Room"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay oscuro para darle el tono luxury y legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/70" />
        </div>

        {/* Contenido alineado en Flex/Grid */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Lado Izquierdo: Texto */}
          <div className="text-left md:max-w-xl">
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wider mb-1">
              VELVET
            </h1>
            <p className="text-lg md:text-xl text-[#D4AF37] tracking-[0.3em] uppercase mb-4 font-medium">
              Room Hair
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Estudio especializado en diseño de imagen, colorimetría de alta precisión y cuidado capilar profesional.
            </p>
          </div>

          {/* Lado Derecho: Botones */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0 md:min-w-[220px]">
            <a
              href="https://wa.me/525521945420?text=Hola,%20quisiera%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37] text-black hover:bg-[#B8952E] font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-all duration-300 shadow-lg shadow-[#D4AF37]/10 text-center"
            >
              Agendar Cita
            </a>
            <a
              href="#servicios"
              className="border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-xs transition-all duration-300 text-center"
            >
              Ver Catálogo
            </a>
          </div>

        </div>
      </section>

   
     {/* Catálogo de Precios */}
      <section id="servicios" className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-3">
              Catálogo de Servicios
            </h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Precios sujetos a evaluación y largo de cabello</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Categoría 1: Corte & Estilismo */}
            <div className="bg-[#151515] p-8 rounded-sm border border-[#D4AF37]/20 shadow-xl transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <Scissors className="text-[#D4AF37] w-6 h-6" />
                <h3 className="text-xl font-serif text-white">Corte & Estilismo</h3>
              </div>
              <div className="space-y-6">
                {serviciosCorte.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-gray-800/60 pb-3">
                    <div>
                      <h4 className="text-white font-medium text-base">{item.nombre}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.descripcion}</p>
                    </div>
                    <span className="text-[#D4AF37] font-semibold text-lg">{item.precio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categoría 2: Colorimetría & Diseño */}
            <div className="bg-[#151515] p-8 rounded-sm border border-[#D4AF37]/20 shadow-xl transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <Sparkles className="text-[#D4AF37] w-6 h-6" />
                <h3 className="text-xl font-serif text-white">Colorimetría & Diseño</h3>
              </div>
              <div className="space-y-6">
                {serviciosColor.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-gray-800/60 pb-3">
                    <div>
                      <h4 className="text-white font-medium text-base">{item.nombre}</h4>
                      <p className="text-gray-500 text-xs mt-0.5 ">{item.descripcion}</p>
                    </div>
                    <span className="text-[#D4AF37] font-semibold text-lg">{item.precio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categoría 3: Maquillaje profesional */}
            <div className="bg-[#151515] p-8 rounded-sm border border-[#D4AF37]/20 shadow-xl transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <Sparkles className="text-[#D4AF37] w-6 h-6" />
                <h3 className="text-xl font-serif text-white">Maquillaje profesional</h3>
              </div>
              <div className="space-y-6">
                {maquillajeProfesional.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-gray-800/60 pb-3">
                    <div>
                      <h4 className="text-white font-medium text-base">{item.nombre}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.descripcion}</p>
                    </div>
                    <span className="text-[#D4AF37] font-semibold text-lg">{item.precio}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Galería de Fotos */}
      <section id="galeria" className="py-20 px-6 bg-[#121212] border-t border-[#D4AF37]/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-3">
              Nuestras instalaciones.
            </h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">
              Diseños de imagen, cortes y colorimetría realizados en nuestro salón
            </p>
          </div>

          {/* Contenedor relativo para posicionar las flechas en Mobile */}
          <div className="relative group">
            
            {/* Flecha Izquierda (solo Mobile) */}
            <button
              onClick={() => handleScroll('left')}
              className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#D4AF37] p-2 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Flecha Derecha (solo Mobile) */}
            <button
              onClick={() => handleScroll('right')}
              className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#D4AF37] p-2 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* 
              Contenedor de Imágenes:
              - Mobile: Oculta scrollbar ([&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]).
              - PC: Grid de 3 columnas sin botones.
            */}
            <div
              ref={scrollContainerRef}
              className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              
              {/* Foto 1 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                  alt="Balayage y Colorimetría"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Balayage & Iluminación
                  </span>
                </div>
              </div>

              {/* Foto 2 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
                  alt="Corte y Peinado Dama"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Corte & Estilismo
                  </span>
                </div>
              </div>

              {/* Foto 3 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop"
                  alt="Tratamiento Capilar"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Cuidado Capilar
                  </span>
                </div>
              </div>

              {/* Foto 4 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop"
                  alt="Corte Caballero"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Diseño Masculino
                  </span>
                </div>
              </div>

              {/* Foto 5 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop"
                  alt="Peinado Social"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Peinado Social
                  </span>
                </div>
              </div>

              {/* Foto 6 */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto relative group/item overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop"
                  alt="Tratamiento Capilar"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-[#D4AF37] text-sm font-serif tracking-wider uppercase">
                    Cuidado Capilar
                  </span>
                </div>
              </div>

              

            </div>
          </div>
        </div>
      </section>

      {/* Ubicación y Mapa */}
      <section id="ubicacion" className="py-20 px-6 bg-[#121212]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-white mb-2">Ubicación y Contacto</h2>
            <p className="text-[#D4AF37] uppercase tracking-widest text-xs mb-8">Visítanos en nuestra sucursal</p>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#D4AF37] w-6 h-6 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Dirección:</strong>
                  <span>C. Agricultura Nte. 4a, San Cristóbal Centro, Ecatepec de Morelos, Méx.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-[#D4AF37] w-6 h-6 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Horarios de Atención:</strong>
                  <span>Lunes a Viernes: 11:00 am – 8:00 pm</span><br />
                  <span>Sábados: 10:00 am – 3:30 pm</span><br />
                  <span className="text-gray-500 text-xs">Un dia de descnaso a la semana, previa cita</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[#D4AF37] w-6 h-6 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Teléfono / WhatsApp:</strong>
                  <a href="tel:525521945420" className="hover:text-[#D4AF37] transition-colors">+52 55 2194 5420</a>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-4">
              <span className="text-md text-gray-400">Síguenos:</span>
              {/* Botón de Instagram */}
              <a
                  href="https://www.instagram.com/rojogram_?utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-300 hover:text-[#D4AF37] p-2 rounded-full hover:bg-[#D4AF37]/10 transition-colors duration-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 md:w-9 md:h-9" 
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
            </div>
          </div>

          {/* iFrame Google Maps */}
          <div className="h-80 md:h-96 rounded-sm border border-[#D4AF37]/30 overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.579154244569!2d-99.05168486254563!3d19.60252259238654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f177b07f8875%3A0x77dcd736253dc061!2sVelvet%20Room%20Hair!5e0!3m2!1sen!2smx!4v1786738968960!5m2!1sen!2smx" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación Velvet Room Hair"
            ></iframe>
            
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-[#050505] py-8 px-6 text-center text-xs text-gray-600 border-t border-[#D4AF37]/10">
        <p>© {new Date().getFullYear()} Velvet Room Hair. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}