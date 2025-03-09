"use client";
import React from "react";
import {useState, useEffect} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


function MainComponent() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const payment = "hecham-mellali-site/payment";

  useEffect(() => {
    setIsVisible(true);
    
    const handleRevealElements = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          el.classList.add("visible");
        }
      });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
      handleRevealElements();
    };
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll(".parallax-bg");
      parallaxElements.forEach((el) => {
        const scrolled = window.pageYOffset;
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleParallax);

    setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    if (isSidebarOpen && startX < window.innerWidth - 50) {
      setIsSidebarOpen(false);
    }
  };
  const streamingProducts = [
    {
      id: 1,
      name: "NETFLIX",
      description: " خدمة بث الأفلام والمسلسلات الرائدة عالمياً 4K",
      prices: [
        { duration: "40 يوم", price: "65" },
        { duration: "3 أشهر", price: "140" },
        { duration: "4 أشهر", price: "190" },
        { duration: "6 أشهر", price: "270" },
        { duration: "سنة", price: "500" },
      ],
    image:
        "https://ucarecdn.com/8b357142-a7d0-47a3-bdc7-c2c83895ba29/-/format/auto/",
    },
    {
      id: 2,
      name: "BEINSPORTS",
      description: "أفضل تغطية رياضية مباشرة للمباريات العالمية",
      prices: [
        { duration: "3 أشهر", price: "520" },
        { duration: "6 أشهر", price: "1040" },
        { duration: "12 أشهر", price: "2050" },
      ],
      image:
        "https://ucarecdn.com/d1d625eb-d39f-4f7f-bb80-b5311bf2c525/-/format/auto/",
    },
  ];
  const bettingProducts = [
    {
      id: 3,
      name: "1XBET",
      description: "منصة المراهنات الرياضية الأكثر موثوقية",
      image:
        "https://ucarecdn.com/29cb20bc-cf95-46b4-a244-10b0e58a3d17/1xbet.jpg",
      bgColor: "bg-black",
    },
    {
      id: 4,
      name: "BETWINNER",
      description: "منصة رائدة في المراهنات الرياضية",
      image:
        "https://ucarecdn.com/5f829dcb-8d1c-45e4-9850-d2f7f64c79d0/betwinner.jpg",
      bgColor: "bg-black",
    },
    {
      id: 5,
      name: "LINEBET",
      description: "منصة مراهنات رياضية موثوقة وآمنة",
      image:
        "https://ucarecdn.com/e8c18818-7713-4657-ae39-44610a66636e/linebet.jpg",
      bgColor: "bg-black",
    },
    {
      id: 6,
      name: "SKRILL",
      description: "محفظة رقمية للمعاملات الآمنة",
      image:
        "https://ucarecdn.com/b166bc70-89e1-4146-b256-505b61e14ba0/-/format/auto/",
      bgColor: "bg-black",
    },
    {
      id: 7,
      name: "USDT",
      description: "عملة رقمية مستقرة للمعاملات",
      image:
        "https://ucarecdn.com/57fa51cc-a6b1-4ab9-a2ea-6e7b61ca36af/usdt.jpg",
      bgColor: "bg-black",
    },
  ];
  const allProducts = [...streamingProducts, ...bettingProducts];

  return (
    <div
      className="min-h-screen bg-black rtl smooth-scroll"
      onTouchStart={handleTouchStart}
    >
      {isLoading && (
        <div className="loading-animation">
          <img
            src="https://ucarecdn.com/9f954007-b19f-49e0-9087-5d4c41288fc4/-/format/auto/"
            alt="Loading..."
            className="loading-logo w-24 h-24 md:w-28 md:h-28"
          />
        </div>
      )}
      <nav
        className={`navbar fixed w-full top-0 z-50 transition-all duration-300 nav-blur ${
          scrollY > 0
            ? "bg-black/95 border-b border-[#FFD700]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 md:order-1">
              <a
                href="https://wa.me/+212660536055"
                className="relative gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:scale-105 hidden md:flex items-center gap-2 font-bold"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                06.60.53.60.55
              </a>
              <button
                className="text-2xl text-[#FFD700] md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>

            <div className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-8 md:order-2">
              <a
                href="#"
                className="relative text-white/90 hover:text-[#FFD700] transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#FFD700] hover:after:w-full after:transition-all"
              >
                تواصل معنا
              </a>
              <a
                href="#"
                className="relative text-white/90 hover:text-[#FFD700] transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#FFD700] hover:after:w-full after:transition-all"
              >
                المنتجات
              </a>
              <a
                href="#"
                className="relative text-white/90 hover:text-[#FFD700] transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#FFD700] hover:after:w-full after:transition-all"
              >
                الرئيسية
              </a>
            </div>

            <div className="flex-shrink-0 md:order-3">
              <img
                src="https://ucarecdn.com/9f954007-b19f-49e0-9087-5d4c41288fc4/-/format/auto/"
                alt="متجر الخدمات الرقمية"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-50 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        >
        </div>

        <div
          className={`fixed top-0 right-0 w-[280px] h-screen bg-black border-l border-[#FFD700]/10 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out transform z-50 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-6 border-b border-[#FFD700]/10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-[#FFD700] hover:text-[#FFD700]/80 transition-all duration-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
                <h2 className="text-xl font-bold text-[#FFD700]">
                  قائمة المنتجات
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-4">
                {allProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFD700]/5 transition-all duration-200 cursor-pointer mb-2"
                  >
                    <div className="text-right flex-1">
                      <h3 className="text-[#FFD700] font-bold group-hover:text-[#FFD700]/90 transition-colors">
                        {product.name}
                      </h3>

                    </div>
                    <div className="w-16 h-16 rounded-lg bg-[#FFD700]/5 p-2 flex items-center justify-center group-hover:bg-[#FFD700]/10 transition-all duration-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 p-6 border-t border-[#FFD700]/10 bg-black/50 backdrop-blur-sm">
              <a
                href="https://wa.me/+212660536055"
                className="w-full gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:scale-105 flex items-center justify-center gap-2 font-bold"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                06.60.53.60.55
              </a>
            </div>
          </div>
        </div>
      </nav>
              <div
        className="absolute top-32 right-8 md:right-12 z-20 fade-slide-up opacity-0"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
          <div className="relative bg-black/90 border border-[#FFD700]/20 p-6 rounded-2xl backdrop-blur-xl transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
            <div className="absolute -top-3 -right-3">
              <div className="bg-[#FFD700] text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300">
                حصري
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <i className="fas fa-gift text-[#FFD700] text-xl"></i>
                <h3 className="text-[#FFD700] font-bold">كود ترحيبي</h3>
              </div>
              <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-3 text-center relative group">
                <span className="text-2xl font-bold text-white tracking-wider font-mono select-all">
                  HICHA2M
                </span>
                <div className="absolute -top-2 -right-2 scale-0 group-hover:scale-100 transition-transform duration-300">
                  <div className="bg-[#FFD700] text-black px-2 py-1 rounded text-xs font-bold shadow-lg">
                    انقر للنسخ
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm text-right">
                احصل على خصم فوري عند استخدام هذا الكود
              </p>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText("HICHA2M")
                    .then(() => {
                      const button = document.getElementById("copyButton");
                      const originalText = button.innerHTML;
                      button.innerHTML =
                        '<i class="fas fa-check text-[#FFD700]"></i> تم النسخ';
                      setTimeout(() => {
                        button.innerHTML = originalText;
                      }, 2000);
                    })
                    .catch((err) => {
                      console.error("Failed to copy:", err);
                      const button = document.getElementById("copyButton");
                      const originalText = button.innerHTML;
                      button.innerHTML =
                        '<i class="fas fa-times text-red-500"></i> فشل النسخ';
                      setTimeout(() => {
                        button.innerHTML = originalText;
                      }, 2000);
                    });
                }}
                id="copyButton"
                className="w-full bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 group/btn mt-3"
              >
                <span>نسخ الكود</span>
                <i className="fas fa-copy group-hover/btn:scale-110 transition-transform duration-300"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-black overflow-hidden pt-32">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://ucarecdn.com/d282dae0-053c-4be7-837e-bf7b7f1bd7f5/-/format/auto/')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.15",
          }}
        ></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="h-[150px]">

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="flex flex-col items-center">
            <div className="w-full text-center md:text-right mb-12">
              <div className="space-y-8 max-w-3xl mx-auto md:mr-0">
                <h1
                  className="text-5xl md:text-6xl font-bold leading-tight fade-slide-up opacity-0"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-200 text-transparent bg-clip-text">
                    DISPONIBLE
                  </span>

                  <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text">WITHDRAWAL PAR ID</span>
                </h1>

                <p
                  className="text-lg md:text-xl text-yellow-200 leading-relaxed fade-slide-up opacity-0"
                  style={{ animationDelay: "0.6s" }}
                >
                  نحن نوفر لكم خدمات الشحن والسحب عن طريق ID بسرعة وضمان
                  والتعامل الطيب والرائع
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end fade-slide-up opacity-0"
                  style={{ animationDelay: "0.9s" }}
                >
                  <button className="gradient-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 text-black px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_10px_20px_-10px_rgba(255,215,0,0.4)] hover:scale-105 transform-gpu font-bold">
                    تصفح المنتجات
                  </button>
                  <a
                    href="https://wa.me/+212660536055"
                    className="flex items-center justify-center gap-2 gradient-shine bg-[#FFD700]/10 text-[#FFD700] px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform-gpu"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                    06.60.53.60.55
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto">
              <div className="floating relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-black/10">
                <div className="relative">
                  <img
                    src="https://ucarecdn.com/66170415-e9d4-4e2b-9d4b-cc580638e51d/WhatsAppImage20250308at120947_57bdc1a4.jpg"
                    alt="Méthodes de paiement et tarifs disponibles"
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-[#FFD700] text-right mb-16 fade-slide-up opacity-0">
            خدمات المراهنات الرياضية
      </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {bettingProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gradient-to-br from-black via-[#FFD700]/5 to-black rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] border border-[#FFD700]/20 hover:border-[#FFD700]/40 fade-slide-up opacity-0 backdrop-blur-sm transform hover:-translate-y-2"
                style={{
                  animationDelay: `${product.id * 0.1}s`,
                }}
              >
                <div className="p-4 md:p-8 relative">
                    <div className="h-24 md:h-32 mb-4 md:mb-6 flex items-center justify-center p-3 md:p-4 bg-black/30 rounded-xl backdrop-blur-sm">
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-full filter brightness-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]"                          style={{
                            aspectRatio: "1",
                            width: "auto",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                  <h2 className="text-lg md:text-2xl font-bold text-[#FFD700] text-center mb-2 md:mb-3 glow-text relative">
                    <span className="relative z-10">{product.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></span>
                  </h2>
                  <p className="text-white/90 text-right text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-row gap-2 md:gap-3">
                    {product.name === "SKRILL" || product.name === "USDT" ? (
                      <>
                        <a
                          href={`/${payment}?service=${product.name}&type=buy`}
                          className="flex-1 group/btn gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-3 md:px-6 py-2 md:py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:scale-105 flex items-center justify-center gap-2 font-bold overflow-hidden relative text-sm md:text-base"
                        >
                          <span className="relative z-10 group-hover/btn:translate-y-px transition-transform duration-300">
                            شراء
                          </span>
                        </a>
                        <a
                          href="https://wa.me/+212660536055"
                          className="flex-1 group/btn gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-3 md:px-6 py-2 md:py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:scale-105 flex items-center justify-center gap-2 font-bold overflow-hidden relative text-sm md:text-base"
                        >
                          <span className="relative z-10 group-hover/btn:translate-y-px transition-transform duration-300">
                            بيع
                          </span>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href={`/${payment}?service=${product.name}&type=recharge`}
                          className="flex-1 group/btn gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-3 md:px-6 py-2 md:py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:scale-105 flex items-center justify-center gap-2 font-bold overflow-hidden relative text-sm md:text-base"
                        >
                          <span className="relative z-10 group-hover/btn:translate-y-px transition-transform duration-300">
                            شحن
                          </span>
                        </a>
                        <a
                          href={`/${payment}?service=${product.name}&type=withdrawal`}
                          className="flex-1 group/btn gradient-shine bg-black text-[#FFD700] border border-[#FFD700] px-3 md:px-6 py-2 md:py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:scale-105 flex items-center justify-center gap-2 font-bold overflow-hidden relative text-sm md:text-base"
                        >
                          <span className="relative z-10 group-hover/btn:translate-y-px transition-transform duration-300">
                            سحب
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <h2 className="text-4xl font-bold text-[#FFD700] text-right mb-16 fade-slide-up opacity-0">
            خدمات البث المباشر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-24">
          {streamingProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gradient-to-br from-black max-w-md via-black/95 to-[#FFD700]/5 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,215,0,0.15)] border border-[#FFD700]/20 hover:border-[#FFD700]/40 fade-slide-up opacity-0 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${product.id * 0.1}s`,
                }}
              >
                <div className="relative h-64 w-full overflow-hidden card-zoom">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-all duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="text-[#FFD700] bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#FFD700]/20 text-sm font-bold transform rotate-3 hover:rotate-0 transition-all duration-300">
                      {product.name}
                    </div>
                  </div>
                </div>
                <div className="p-8 relative backdrop-blur-sm">
                  <div className="absolute -top-4 left-8 bg-[#FFD700] text-black px-6 py-2 rounded-full text-sm font-bold shadow-[0_4px_20px_rgba(255,215,0,0.3)] transform hover:scale-105 hover:rotate-2 transition-all duration-300">
                  <a
                    href={`/${payment}?service=${product.name}&type=recharge`}
                  >طلب الآن</a>
                  </div>
                  <p className="text-white/90 text-right text-base mb-6 leading-relaxed" dir="rtl">
                    {product.description}
                  </p>
                    <div className="text-right mb-6 space-y-2">
                      <p className="text-[#FFD700] font-bold mb-2" dir="rtl">الأسعار:</p>
                      {product.prices.map((priceOption, index) => (
                        <p key={index} className="text-white/90 text-base" dir="rtl">
                          <span className="text-[#FFD700]" >
                            {priceOption.duration}
                          </span>
                          : {priceOption.price} DH
                        </p>
                      ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="relative bg-black overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4 fade-slide-up opacity-0">
              تواصل معنا
            </h2>
            <p
              className="text-white/80 text-lg fade-slide-up opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              نحن هنا لمساعدتك ، لا تتردد في الاتصال بنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              className="group bg-gradient-to-br from-black via-[#FFD700]/5 to-black rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] border border-[#FFD700]/20 hover:border-[#FFD700]/40 p-8 text-center fade-slide-up opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="h-16 w-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-whatsapp text-[#FFD700] text-3xl"></i>
              </div>
              <h3 className="text-[#FFD700] text-xl font-bold mb-4">
                WhatsApp
              </h3>
              <p className="text-white/90 mb-6">
                تواصل معنا عبر الواتساب للرد السريع
              </p>
              <a
                href="https://wa.me/+212660536055"
                className="inline-flex items-center justify-center gap-2 gradient-shine bg-[#FFD700] text-black px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-105 font-bold"
              >
                <i className="fab fa-whatsapp"></i>
                06.60.53.60.55
              </a>
            </div>

            <div
              className="group bg-gradient-to-br from-black via-[#FFD700]/5 to-black rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] border border-[#FFD700]/20 hover:border-[#FFD700]/40 p-8 text-center fade-slide-up opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="h-16 w-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-instagram text-[#FFD700] text-3xl"></i>
              </div>
              <h3 className="text-[#FFD700] text-xl font-bold mb-4">
                Instagram
              </h3>
              <p className="text-white/90 mb-6">
                تابعنا على انستغرام للعروض الحصرية
              </p>
              <a
                href="https://www.instagram.com/hicham_chtioui007"
                className="inline-flex items-center justify-center gap-2 gradient-shine bg-[#FFD700] text-black px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-105 font-bold"
              >
                <i className="fab fa-instagram"></i>
                @hicham_chtioui007
              </a>
            </div>

            <div
              className="group bg-gradient-to-br from-black via-[#FFD700]/5 to-black rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] border border-[#FFD700]/20 hover:border-[#FFD700]/40 p-8 text-center fade-slide-up opacity-0"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="h-16 w-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-telegram text-[#FFD700] text-3xl"></i>
              </div>
              <h3 className="text-[#FFD700] text-xl font-bold mb-4">
                Telegram
              </h3>
              <p className="text-white/90 mb-6">انضم إلى قناتنا على تليجرام</p>
              <a
                href="https://t.me/h2mservicepro"
                className="inline-flex items-center justify-center gap-2 gradient-shine bg-[#FFD700] text-black px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-105 font-bold"
              >
                <i className="fab fa-telegram"></i>
                @h2mservicepro
              </a>
            </div>
          </div>

          <div
            className="text-center border-t border-[#FFD700]/20 pt-16 fade-slide-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>


      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: linear-gradient(to right, #FFD700, #FDB931);
          border-radius: 50%;
          animation: snowfall linear infinite;
          filter: blur(1px);
          box-shadow: 0 0 5px #FFD700;
        }

        .particle:nth-child(3n) {
          width: 2px;
          height: 2px;
        }

        .particle:nth-child(3n + 1) {
          width: 4px;
          height: 4px;
        }

        .particle:nth-child(2n) {
          animation-duration: 3s !important;
        }

        .particle:nth-child(3n) {
          animation-duration: 4s !important;
        }

        .particle:nth-child(5n) {
          animation-duration: 5s !important;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sidebarBackdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes gradientPosition {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        .loading-animation {
          position: fixed;
          inset: 0;
          background: #000000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeOut 0.8s ease-in-out forwards;
          animation-delay: 2s;
        }

        .loading-logo {
          animation: scalePulse 1.5s ease-in-out infinite;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-zoom {
          perspective: 1000px;
        }

        .card-zoom img {
          transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-zoom:hover img {
          transform: scale(1.1) translateZ(0);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: perspective(1000px) rotateX(0) rotateY(0);
          backdrop-filter: blur(10px);
        }

        .card-hover:hover {
          transform: perspective(1000px) rotateX(2deg) rotateY(2deg);
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.1);
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
          transition: text-shadow 0.3s ease;
        }
        
        .glow-text:hover {
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .gradient-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 215, 0, 0.1) 40%,
            rgba(255, 215, 0, 0.2) 50%,
            rgba(255, 215, 0, 0.1) 60%,
            transparent 100%
          );
          transform: skewX(-25deg);
          transition: all 0.75s ease;
        }

        .gradient-shine:hover::before {
          animation: shine 1.5s infinite;
        }

        .button-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .button-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 215, 0, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .button-hover:hover::before {
          width: 300%;
          height: 300%;
        }

        .navbar {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px -10px rgba(255, 215, 0, 0.1);
        }

        .gradient-text {
          background: linear-gradient(45deg, #FFD700, #FFD700);
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientFlow 8s linear infinite;
        }

        .nav-blur {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .fade-slide-up {
          animation: fadeSlideUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .sidebar-backdrop {
          animation: sidebarBackdrop 0.3s ease-out;
        }

        .bg-gradient-animate {
          background-size: 200% 200%;
          animation: gradientPosition 15s ease infinite;
        }

        .group\/button:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,215,0,0.2), transparent 70%);
          opacity: 0;
          animation: pulseGlow 1.5s ease-out infinite;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}



export default MainComponent;