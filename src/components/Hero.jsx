import { Link } from 'react-router-dom';
import { Activity, ArrowRight, MessageCircle, Calendar, ShoppingBag, Shield, CheckCircle } from 'lucide-react';

export default function Hero() {
  const services = [
    { icon: MessageCircle, label: 'Chat Dokter', link: '/content' },
    { icon: Calendar, label: 'Buat Janji', link: '/content' },
    { icon: ShoppingBag, label: 'Aloshop', link: '/content' },
    { icon: Shield, label: 'Langganan', link: '/content' },
    { icon: CheckCircle, label: 'Alochoice', link: '/content' }
  ];

  return (
    <section className="relative w-full bg-cover bg-center bg-gradient-to-r from-blue-500 to-blue-600" style={{minHeight: '100vh', backgroundImage: 'url(/awal.png)', backgroundAttachment: 'scroll', backgroundSize: 'cover'}}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-blue-600/50 to-blue-700/50"></div>

      {/* Animated Floating Elements */}
      <div className="hidden lg:block absolute top-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="hidden lg:block absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>

      {/* Main Container */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Desktop Layout - Text on Left */}
          <div className="hidden lg:block">
            {/* Heading */}
            <div className="mb-8 animate-slideUp" style={{animationDelay: '0.1s'}}>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-4">
                Layanan Cepat
                <br />
                dan Tepat
              </h1>
              <p className="text-lg text-white/90 font-medium max-w-md">
                Layanan Booking dan Chat Dokter Terbaik di Indonesia
              </p>
            </div>

            {/* Service Icons Grid */}
            <div className="grid grid-cols-5 gap-6 mt-12 max-w-2xl animate-fadeIn" style={{animationDelay: '0.3s'}}>
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={idx}
                    to={service.link}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <Icon size={32} className="text-blue-600" />
                    </div>
                    <span className="text-white font-semibold text-sm text-center hover:underline">
                      {service.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout - Vertical Centered */}
          <div className="lg:hidden flex flex-col justify-center items-center space-y-6 h-full py-12">
            
            {/* Heading */}
            <div className="text-center animate-slideUp" style={{animationDelay: '0.1s'}}>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-3">
                Layanan Cepat
                <br />
                dan Tepat
              </h1>
              <p className="text-sm sm:text-base text-white/90 font-medium">
                Layanan Booking dan Chat Dokter Terbaik di Indonesia
              </p>
            </div>

            {/* Service Icons Grid - Mobile */}
            <div className="grid grid-cols-5 gap-3 w-full px-2 animate-fadeIn" style={{animationDelay: '0.3s'}}>
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={idx}
                    to={service.link}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <span className="text-white font-semibold text-xs text-center line-clamp-2">
                      {service.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Doctor Image - Mobile */}
            {/* Dokter image removed */}
          </div>
        </div>
      </div>

      {/* Desktop Fixed Doctor Image - Removed */}

    </section>
  );
}
