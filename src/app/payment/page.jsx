"use client";
import React from "react";
import {useState, useEffect, useRef} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MainComponent() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [account, setAccount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [service, setService] = useState(null);
  const [type, setType] = useState(null);
  const [currency, setCurrency] = useState("DH");
  const isStreamingService = service === "NETFLIX" || service === "BEINSPORTS";
  const dropdownRef = useRef(null);

  const serviceDetails = {
    "1XBET": {
      name: "1XBET",
      logo: "https://ucarecdn.com/29cb20bc-cf95-46b4-a244-10b0e58a3d17/1xbet.jpg",
      withdrawalAddresses: {
        DH: {
          city: "Beni mallal",
          address: "Atf dh",
        },
        USD: {
          city: "Beni mellal",
          address: "H2M service pro",
        },
      },
    },
    LINEBET: {
      name: "LINE BET",
      logo: "https://ucarecdn.com/e8c18818-7713-4657-ae39-44610a66636e/linebet.jpg",
      withdrawalAddresses: {
        DH: {
          city: "Seuk sebt",
          address: "Hicha2M",
        },
        USD: {
          city: "",
          address: "",
        },
      },
    },
    BETWINNER: {
      name: "BETWINNER",
      logo: "https://ucarecdn.com/5f829dcb-8d1c-45e4-9850-d2f7f64c79d0/betwinner.jpg",
      withdrawalAddresses: {
        DH: {
          city: "Beni mallal",
          address: "Dakhela",
        },
        USD: {
          city: "Beni mallal",
          address: "Dakhela01",
        },
      },
    },
    NETFLIX: {
      id: 1,
      name: "NETFLIX 4K",
      description: " خدمة بث الأفلام والمسلسلات الرائدة عالمياً 4K",
      prices: [
        { duration: "40 يوم", price: "65" },
        { duration: "3 أشهر", price: "140" },
        { duration: "4 أشهر", price: "190" },
        { duration: "6 أشهر", price: "270" },
        { duration: "سنة", price: "500" },
      ],
    logo:
        "https://ucarecdn.com/8b357142-a7d0-47a3-bdc7-c2c83895ba29/-/format/auto/",
    },
    BEINSPORTS: {
      id: 2,
      name: "BEINSPORTS",
      description: "أفضل تغطية رياضية مباشرة للمباريات العالمية",
      prices: [
        { duration: "3 أشهر", price: "520" },
        { duration: "6 أشهر", price: "1040" },
        { duration: "12 أشهر", price: "2050" },
      ],
      logo:
        "https://ucarecdn.com/d1d625eb-d39f-4f7f-bb80-b5311bf2c525/-/format/auto/",
    },

    
    SKRILL: {
      id: 6,
      name: "SKRILL",
      description: "محفظة رقمية للمعاملات الآمنة",
      image:
        "https://ucarecdn.com/b166bc70-89e1-4146-b256-505b61e14ba0/-/format/auto/",
      bgColor: "bg-black",
    },
    USDT: {
      id: 7,
      name: "USDT",
      description: "عملة رقمية مستقرة للمعاملات",
      image:
        "https://ucarecdn.com/57fa51cc-a6b1-4ab9-a2ea-6e7b61ca36af/usdt.jpg",
      bgColor: "bg-black",
    },
  };

  useEffect(() => {
    setIsVisible(true);
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    setService(serviceParam);
    setType(urlParams.get("type"));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const banks = [
    {
      id: 1,
      name: "التجاري وفا بنك",
      logo: "https://i.ibb.co/MDMKd9dx/attijariwafabank.jpg",
      arabicName: "التجاري وفا بنك",
      username: "M.Chtioui Hicham",
      withdrawalAddress: "007095000405700030685565",
    },
    {
      id: 2,
      name: "بريد بنك",
      logo: "https://i.ibb.co/HLxbP1KF/barid.png",
      arabicName: "بريد بنك",
      withdrawalAddress: "11973112",
      username: "chtioui hicham"

    },
    {
      id: 3,
      name: "Inwi",
      logo: "https://i.ibb.co/dJw5qtq6/brand.gif",
      arabicName: "إنوي",
      withdrawalAddress: "0695300043",
      username: "hicham el mellali"

    },
    {
      id: 4,
      name: "كاش بلوس",
      logo: "https://i.ibb.co/KcPGVdRJ/cashplus.jpg",
      username: "hicham el mellali",
      arabicName: "كاش بلوس",
      withdrawalAddress: "0707116342",
    },
    {
      id: 5,
      name: "بنك CIH",
      logo: "https://i.ibb.co/ymsFDKnH/cih.png",
      username: "hicham el mellali",
      arabicName: "البنك التجاري العقاري والسياحي",
      withdrawalAddress: "2486615225021000",
    },
    {
      id: 6,
      name: "Orange",
      logo: "https://i.ibb.co/bRNf7nTt/orange.webp",
      username: "hicham el mellali",
      arabicName: "أورنج",
      withdrawalAddress: "077111490",
    },
  ];
  
  const handlePayment = () => {
    if (!selectedBank || !amount) return;
    const serviceInfo = getServiceInfo();

    const message = encodeURIComponent(
      `مرحباً، أود ${type === "withdrawal" ? " سحب " : "شحن"} ${
        serviceInfo?.displayName
      }\n` +
        `البنك: ${selectedBank.arabicName}\n` +
        `المبلغ: ${amount} ${currency}\n` +
        `ID: ${id}\n` +
        `${isStreamingService ? `رقم البطاقة: ${cardNumber}\n` : ""}` +
        (type === "withdrawal"
          ? `كود السحب: ${code}\n` +
            `الاسم الكامل: ${name}\n` +
            `رقم الحساب البنكي: ${account}\n`
          : ""),
    );
    window.open(`https://wa.me/+212660536055?text=${message}`, "_blank");
  };
  const getServiceInfo = () => {
    const baseService = service?.split("-")[0];
    if (!serviceDetails[baseService]) return null;

    return {
      ...serviceDetails[baseService],
      displayName: `${serviceDetails[baseService].name} ${
        isStreamingService ? (
          ""
        ) : (
          currency  === "DH" ? "درهم" : "دولار"
        )
        
      }`,
      withdrawalAddress:
        serviceDetails[baseService].withdrawalAddresses,
    };
  };

  return (
    <div className="min-h-screen bg-black rtl">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center mb-12">
          <a
            href="/"
            className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300"
          >
            <i className="fas fa-arrow-right text-xl"></i>
            <span className="text-lg font-bold">عودة للرئيسية</span>
          </a>
        </div>

        <div
          className={`space-y-8 fade-slide-up ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-black via-[#FFD700]/5 to-black rounded-xl p-6 border border-[#FFD700]/20">
            <div className="flex items-center justify-center gap-6">
              <img
                src={getServiceInfo()?.logo}
                alt={service}
                className="w-24 h-24 object-contain rounded-[20px]"
              />
              <div className="text-right">
              <p className="text-white/80">
                  {type === "withdrawal" ? "سحب الرصيد"   :  "شحن الحساب"}
                </p>
                <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
                  {getServiceInfo()?.displayName || service}
                </h1>
                {!isStreamingService && (
                  <div className="mt-4 flex gap-4 justify-end">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="currency"
                      value="USD"
                      checked={currency === "USD"}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        currency === "USD"
                          ? "border-[#FFD700] bg-[#FFD700]/20"
                          : "border-white/30"
                      }`}
                    >
                      {currency === "USD" && (
                        <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                      )}
                    </div>
                    <span
                      className={`cursor-pointer ${
                        currency === "USD" ? "text-[#FFD700]" : "text-white/80"
                      }`}
                    >
                      دولار $
                      {type === "withdrawal" ? (
                      <div className="mt-2">
                        <p className="text-[#FFD700]">
                          المدينة:{" "}
                          {getServiceInfo()?.withdrawalAddress[currency]?.city}
                        </p>
                        <p className="text-[#FFD700]">
                          العنوان:{" "}
                          {getServiceInfo()?.withdrawalAddress[currency]?.address}
                        </p>
                      </div>
                    ) : (<span></span>) }
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="currency"
                      value="DH"
                      checked={currency === "DH"}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        currency === "DH"
                          ? "border-[#FFD700] bg-[#FFD700]/20"
                          : "border-white/30"
                      }`}
                    >
                      {currency === "DH" && (
                        <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                      )}
                    </div>
                    <span
                      className={`cursor-pointer ${
                        currency === "DH" ? "text-[#FFD700]" : "text-white/80"
                      }`}
                    >
                      درهم DH
                      {type === "withdrawal" ? (
                      <div className="mt-2">
                        <p className="text-[#FFD700]">
                          المدينة:{" "}
                          {getServiceInfo()?.withdrawalAddress[currency]?.city}
                        </p>
                        <p className="text-[#FFD700]">
                          العنوان:{" "}
                          {getServiceInfo()?.withdrawalAddress[currency]?.address}
                        </p>
                      </div>
                    ) : (<span></span>) }
                    </span>
                    
                  </label>
                </div>
                )}
                
                
              </div>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-black/80 text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 flex items-center justify-between backdrop-blur-sm"
            >
              {selectedBank ? (
                <div className="flex items-center gap-3">
                  <img
                    src={selectedBank.logo}
                    alt={selectedBank.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />


                  <div className="flex flex-col">
                    <span>{selectedBank.arabicName}</span>
                    <span className="text-sm text-[#FFD700]">
                      الحساب: {selectedBank.withdrawalAddress}
                    </span>
                    {selectedBank.name ==="Inwi" ? (
                      <p dir="rtl" className="text-sm text-[#FFFFFF]">
                         نقبل ايضا الشحن ببطاقة التعبئة انوي(INWi)50  درهم فما فوق
                      </p>
                    ) : (
                      <span className="text-sm text-[#FFD700]">
                      الاسم: {selectedBank.username}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-white/60">اختر البنك</span>
              )}
              <i
                className={`fas fa-chevron-down transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            <div
              className={`absolute w-full mt-2 bg-black/85 backdrop-blur-xl border border-[#FFD700]/30 rounded-lg overflow-hidden transition-all duration-300 max-h-[240px] overflow-y-auto z-50 ${
                isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#FFD700 transparent",
              }}
            >
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => {
                    setSelectedBank(bank);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-[#FFD700]/10 ${
                    selectedBank?.id === bank.id ? "bg-[#FFD700]/5" : ""
                  }`}
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-8 h-8 object-contain rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm">
                      {bank.arabicName}
                    </span>
                    <span className="text-sm text-[#FFD700]">
                      الحساب: {bank.withdrawalAddress}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`المبلغ (${currency})`}
              className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              min="0"
              step="any"
            />
            
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
              {currency}
            </span>
          </div>
          {isStreamingService ? (
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="رقم البطاقة (ID CARTE)"
                className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              />
            </div>
          ) : (
          <div className="relative">
          <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={`رقم الحساب ID`}
              className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              min="0"
              step="any"
            />
          </div>
        )}
          {type === "withdrawal" ? (
            <>

              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`كود السحب`}
                  className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder={`رقم الحساب البنكي لدفه ارباحك`}
                  className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`الاسمك الكامل في حسابك البنكي`}
                  className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
                />
              </div>
            </>
          ) : type === "recharge" ? (
            <div className="mt-4 p-6 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-center">
              <p className="text-red-500 text-lg font-bold mb-2">⚠️ تنبيه مهم</p>
              <p className="text-red-500">
                يرجى إرسال صورة إيصال التحويل عبر الواتساب بعد إتمام عملية
                التحويل
              </p>
            </div>
          ) : null}

          {/* <div className="relative">
          <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`كود السحب`}
              className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              min="0"
              step="any"
            />
          </div>
          <div className="relative">
          <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder={`رقم الحساب البنكي لدفه ارباحك`}
              className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              min="0"
              step="any"
            />
          </div>
          <div className="relative">
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`الاسمك الكامل في حسابك البنكي`}
              className="w-full bg-black text-white p-4 rounded-lg border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 focus:outline-none focus:border-[#FFD700] cursor-text"
              min="0"
              step="any"
            />
          </div> */}
          <button
            onClick={handlePayment}
            disabled={!selectedBank || !amount}
            className="w-full bg-[#FFD700] text-black p-4 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fab fa-whatsapp text-xl"></i>
              إتمام الدفع
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        * {
          cursor: default;
        }

        button:not(:disabled),
        .cursor-pointer,
        label,
        input[type="radio"] + div {
          cursor: pointer !important;
        }

        input[type="number"] {
          cursor: text !important;
        }

        button:disabled {
          cursor: not-allowed !important;
        }

        .pointer-events-none {
          pointer-events: none !important;
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

        .fade-slide-up {
          animation: fadeSlideUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .rtl {
          direction: rtl;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #FFD700;
          border-radius: 20px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #FFD700/80;
        }

        input[type="radio"] + div {
          transition: all 0.3s ease;
        }

        input[type="radio"]:checked + div {
          transform: scale(1.1);
        }

        input[type="radio"] + div:hover {
          border-color: rgba(255, 215, 0, 0.5);
        }

        label:hover span {
          color: rgba(255, 215, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;