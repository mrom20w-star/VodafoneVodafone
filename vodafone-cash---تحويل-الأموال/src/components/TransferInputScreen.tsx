import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, QrCode, X, FileText, CheckCircle2 } from 'lucide-react';
import { playKeypadTick, unlockAudio } from '../utils/audio';
import { getRegisteredNameForPhone } from '../utils/phoneNameResolver';

interface TransferInputScreenProps {
  onBack: () => void;
  onProceed: (phone: string, amount: number, recipientName: string) => void;
  defaultPhone?: string;
  defaultAmount?: number;
  balance?: number | string;
}

export const TransferInputScreen: React.FC<TransferInputScreenProps> = ({
  onBack,
  onProceed,
  defaultPhone = '',
  defaultAmount = 5,
}) => {
  const [activeTab, setActiveTab] = useState<'send' | 'request'>('send');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone);
  const [amount, setAmount] = useState<number | ''>(defaultAmount);

  // Registered real name state automatically resolved from phone number
  const [registeredName, setRegisteredName] = useState(() =>
    defaultPhone ? getRegisteredNameForPhone(defaultPhone) : ''
  );

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Update registered name whenever phone number changes
  useEffect(() => {
    if (phoneNumber.length >= 10) {
      const resolved = getRegisteredNameForPhone(phoneNumber);
      setRegisteredName(resolved);
    } else {
      setRegisteredName('');
    }
  }, [phoneNumber]);

  const numericAmount = typeof amount === 'number' ? amount : 0;
  const isPhoneValid = phoneNumber.length === 11 && phoneNumber.startsWith('01');
  const isAmountValid = numericAmount >= 5 && numericAmount <= 60000;
  const canConfirm = isPhoneValid && isAmountValid;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(raw);
    if (raw.length === 11) {
      setRegisteredName(getRegisteredNameForPhone(raw));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 5);
    setAmount(raw === '' ? '' : Number(raw));
  };

  const addQuickAmount = (val: number) => {
    playKeypadTick();
    const current = typeof amount === 'number' ? amount : 0;
    const updated = Math.min(60000, current + val);
    setAmount(updated);
    amountInputRef.current?.focus();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (canConfirm) {
      unlockAudio();
      onProceed(phoneNumber, numericAmount, registeredName);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 select-none justify-between overflow-hidden relative" dir="rtl">
      {/* Top Header - Replica of photo_2026-11-02_16-51-45_cf8030a4.jpg */}
      <div className="shrink-0 bg-white border-b border-gray-100">
        <div className="pt-4 pb-3 px-4 flex items-center justify-between">
          <div className="w-6"></div>

          <h2 className="text-base font-bold text-gray-800">تحويل أموال</h2>

          <button
            type="button"
            onClick={onBack}
            className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowRight className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* 2 Segmented Tabs: إرسال / طلب */}
        <div className="flex items-center border-t border-gray-100 px-4">
          {/* Tab 1: إرسال (Send) */}
          <button
            type="button"
            onClick={() => setActiveTab('send')}
            className={`flex-1 py-3 text-sm font-bold transition-all relative ${
              activeTab === 'send'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            إرسال
            {activeTab === 'send' && (
              <span className="absolute bottom-0 inset-x-8 h-0.5 bg-[#e60000] rounded-full"></span>
            )}
          </button>

          {/* Tab 2: طلب (Request with 'New' pill badge) */}
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-3 text-sm font-bold transition-all relative flex items-center justify-center gap-1.5 ${
              activeTab === 'request'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="bg-[#e60000] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              New
            </span>
            <span>طلب</span>
            {activeTab === 'request' && (
              <span className="absolute bottom-0 inset-x-8 h-0.5 bg-[#e60000] rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar flex flex-col justify-between"
      >
        <div className="space-y-4">
          {/* Section 1: حول إلي */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-gray-800">
                حول إلي
              </h3>
              <span className="text-[10px] text-gray-400 font-medium">
                اكتب من لوحة مفاتيح جهازك
              </span>
            </div>

            {/* Input Card */}
            <div
              onClick={() => phoneInputRef.current?.focus()}
              className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-2 cursor-text"
            >
              <div className="flex items-center justify-between">
                {/* Right: Label & Phone Input */}
                <div className="space-y-0.5 flex-1">
                  <label className="text-[11px] font-semibold text-gray-400 block">
                    رقم الموبايل
                  </label>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-transparent border-0 p-0 text-lg font-bold text-gray-900 tracking-wider focus:outline-none placeholder:text-gray-300 font-mono"
                    maxLength={11}
                  />
                </div>

                {/* Left: Clear button + QR scan icon */}
                <div className="flex items-center gap-2 pl-1">
                  {phoneNumber.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhoneNumber('');
                        phoneInputRef.current?.focus();
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5 stroke-[2]" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhoneNumber('01012345678');
                      setRegisteredName(getRegisteredNameForPhone('01012345678'));
                    }}
                    className="p-1 text-gray-600 hover:text-gray-900"
                    title="مسح QR"
                  >
                    <QrCode className="w-6 h-6 stroke-[1.8]" />
                  </button>
                </div>
              </div>

              {/* Dynamic Real Registered Name Lookup */}
              {isPhoneValid && (
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[11px] text-gray-500 font-medium">الاسم المسجل:</span>
                  </div>

                  <span className="font-bold text-gray-900 font-mono text-[11px]">
                    {registeredName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: مبلغ */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-gray-800">مبلغ</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>الرسوم</span>
              </div>
            </div>

            {/* Amount Box */}
            <div
              onClick={() => amountInputRef.current?.focus()}
              className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-4 cursor-text"
            >
              {/* Big Centered Amount - Numeral in cyan/teal #147a96 matching photo_2026-11-02_16-51-45_cf8030a4.jpg */}
              <div className="flex items-baseline justify-center gap-2 pt-2">
                <input
                  ref={amountInputRef}
                  type="tel"
                  inputMode="numeric"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-36 text-center bg-transparent border-0 p-0 text-4xl font-black text-[#147a96] tracking-tight focus:outline-none placeholder:text-[#147a96]/40 font-mono"
                  maxLength={5}
                />
                <span className="text-2xl font-bold text-gray-900">جنيه</span>
              </div>

              {/* Quick Preset Chips (+10, +100, +500) */}
              <div className="flex items-center justify-center gap-2" dir="rtl">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addQuickAmount(10);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs"
                >
                  + 10 جنيه
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addQuickAmount(100);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs"
                >
                  + 100 جنيه
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addQuickAmount(500);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs"
                >
                  + 500 جنيه
                </button>
              </div>

              {/* Footnote Notice */}
              <p className="text-[11px] text-gray-400 text-center font-medium pt-1">
                المبلغ المسموح به من 5 جنيه إلي 60000 جنيه
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Confirm Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!canConfirm}
            className={`w-full py-4 rounded-xl text-base font-bold transition-all shadow-md ${
              canConfirm
                ? 'bg-[#e60000] text-white hover:bg-[#cc0000] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            تأكيد
          </button>
        </div>
      </form>
    </div>
  );
};
