"use client";
import React from "react";
import {useState, useEffect, useRef} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MainComponent() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [service, setService] = useState(null);
  const [type, setType] = useState(null);
  const [currency, setCurrency] = useState("DH");
  const dropdownRef = useRef(null);

  const serviceDetails = {
    "1XBET": {
      name: "1XBET",
      logo: "https://ucarecdn.com/29cb20bc-cf95-46b4-a244-10b0e58a3d17/1xbet.jpg",
      withdrawalAddresses: {
        DH: {
          city: "بني ملال",
          address: "ATF DH",
        },
        USD: {
          city: "بني ملال",
          address: "H2M service pro",
        },
      },
    },
    LINEBET: {
      name: "LINE BET",
      logo: "https://ucarecdn.com/e8c18818-7713-4657-ae39-44610a66636e/linebet.jpg",
      withdrawalAddresses: {
        DH: {
          city: "سوق السبت",
          address: "Hicha2M",
        },
        USD: {
          city: "سوق السبت",
          address: "Hicha2M",
        },
      },
    },
    BETWINNER: {
      name: "BETWINNER",
      logo: "https://ucarecdn.com/5f829dcb-8d1c-45e4-9850-d2f7f64c79d0/betwinner.jpg",
      withdrawalAddresses: {
        DH: {
          city: "بني ملال",
          address: "الداخلة",
        },
        USD: {
          city: "بني ملال",
          address: "Dakhela01",
        },
      },
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
      name: "بنك CIH",
      logo: "https://ucarecdn.com/0c51593e-2011-4486-8dd5-b24f4137bc8a/-/format/auto/",
      arabicName: "البنك التجاري العقاري والسياحي",
      withdrawalAddress: "CIH-1234",
    },
    {
      id: 2,
      name: "بنك المغرب",
      logo: "https://ucarecdn.com/f8b6c7c5-5c8c-4c89-a4b2-d5c3ec64c42e/-/format/auto/",
      arabicName: "بنك المغرب",
      withdrawalAddress: "BAM-5678",
    },
    {
      id: 3,
      name: "التجاري وفا بنك",
      logo: "https://ucarecdn.com/4c7e09df-497f-44e5-9077-0aa52c9c1299/-/format/auto/",
      arabicName: "التجاري وفا بنك",
      withdrawalAddress: "AWB-9012",
    },
    {
      id: 4,
      name: "البنك الإفريقي",
      logo: "https://ucarecdn.com/e9e4d66c-06f4-4c48-9cf4-c1e0e9d5f0d9/-/format/auto/",
      arabicName: "البنك الإفريقي",
      withdrawalAddress: "BAF-3456",
    },
    {
      id: 5,
      name: "BMCI بنك",
      logo: "https://ucarecdn.com/1c2a81d5-8fc4-4d4c-9e77-114e7e75445c/-/format/auto/",
      arabicName: "البنك المغربي للتجارة والصناعة",
      withdrawalAddress: "BMCI-7890",
    },
    {
      id: 6,
      name: "القرض الفلاحي",
      logo: "https://ucarecdn.com/d5d5b2e2-8c8d-4d1c-9e5a-f8d8c7d0b5a5/-/format/auto/",
      arabicName: "القرض الفلاحي للمغرب",
      withdrawalAddress: "CAM-1357",
    },
    {
      id: 7,
      name: "القرض المغربي",
      logo: "https://ucarecdn.com/b5b5b2e2-8c8d-4d1c-9e5a-f8d8c7d0b5a5/-/format/auto/",
      arabicName: "القرض المغربي",
      withdrawalAddress: "CM-2468",
    },
    {
      id: 8,
      name: "بريد بنك",
      logo: "https://ucarecdn.com/c5c5b2e2-8c8d-4d1c-9e5a-f8d8c7d0b5a5/-/format/auto/",
      arabicName: "بريد بنك",
      withdrawalAddress: "PB-9876",
    },
    {
      id: 9,
      name: "سوسيتي جنرال",
      logo: "https://ucarecdn.com/d5d5b2e2-8c8d-4d1c-9e5a-f8d8c7d0b5a5/-/format/auto/",
      arabicName: "سوسيتي جنرال المغرب",
      withdrawalAddress: "SG-5432",
    },
  ];
  const handlePayment = () => {
    if (!selectedBank || !amount) return;
    const serviceInfo = getServiceInfo();

    const message = encodeURIComponent(
      `مرحباً، أود ${type === "recharge" ? "شحن" : "سحب"} ${
        serviceInfo?.displayName
      }\n` +
        `البنك: ${selectedBank.arabicName}\n` +
        `المبلغ: ${amount} ${currency}\n` +
        `المدينة: ${serviceInfo?.withdrawalAddress?.city}\n` +
        `العنوان: ${serviceInfo?.withdrawalAddress?.address}`
    );
    window.open(`https://wa.me/+212660536055?text=${message}`, "_blank");
  };
  const getServiceInfo = () => {
    const baseService = service?.split("-")[0];
    if (!serviceDetails[baseService]) return null;

    return {
      ...serviceDetails[baseService],
      displayName: `${serviceDetails[baseService].name} ${
        currency === "DH" ? "درهم" : "دولار"
      }`,
      withdrawalAddress:
        serviceDetails[baseService].withdrawalAddresses[currency],
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
                className="w-24 h-24 object-contain"
              />
              <div className="text-right">
                <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
                  {getServiceInfo()?.displayName || service}
                </h1>
                <p className="text-white/80">
                  {type === "recharge" ? "شحن الحساب" : "سحب الرصيد"}
                </p>
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
                    </span>
                  </label>
                </div>
                <div className="mt-2 text-[#FFD700]/80">
                  <p>المدينة: {getServiceInfo()?.withdrawalAddress?.city}</p>
                  <p>العنوان: {getServiceInfo()?.withdrawalAddress?.address}</p>
                </div>
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
                    className="w-8 h-8 object-contain"
                  />
                  <div className="flex flex-col">
                    <span>{selectedBank.arabicName}</span>
                    <span className="text-sm text-[#FFD700]">
                      سحب: {selectedBank.withdrawalAddress}
                    </span>
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
                    className="w-6 h-6 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm">
                      {bank.arabicName}
                    </span>
                    <span className="text-sm text-[#FFD700]">
                      سحب: {bank.withdrawalAddress}
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