import React, { useState } from 'react';
import {
  ArrowRight,
  Gift,
  Bell,
  QrCode,
  Eye,
  EyeOff,
  ArrowLeftRight,
  Plus,
  CreditCard,
  Phone,
  Zap,
  Flame,
  Droplets,
  CreditCard as CardIcon,
  ChevronLeft,
  X,
  CheckCircle2,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VodafoneCashPhoneIcon } from './VodafoneIcons';
import { playCashRegisterSound, playKeypadTick, unlockAudio } from '../utils/audio';

interface VodafoneCashDashboardProps {
  balance: number;
  userName?: string;
  onBack: () => void;
  onStartTransfer: () => void;
  onDepositSuccess: (amount: number) => void;
  onLockWallet?: () => void;
}

export const VodafoneCashDashboard: React.FC<VodafoneCashDashboardProps> = ({
  balance,
  userName = 'جون',
  onBack,
  onStartTransfer,
  onDepositSuccess,
  onLockWallet,
}) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number | ''>(500);
  const [showBalance, setShowBalance] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeBottomNav, setActiveBottomNav] = useState<'wallet' | 'transfer' | 'services'>('wallet');

  const [useArabicNumerals, setUseArabicNumerals] = useState(false);

  const rawFormatted = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedBalance = rawFormatted;

  const handleDepositSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const amt = typeof depositAmount === 'number' ? depositAmount : 0;
    if (amt <= 0) return;

    unlockAudio();
    playCashRegisterSound();
    onDepositSuccess(amt);
    setShowDepositModal(false);

    setToastMessage(`تم إيداع ${amt.toLocaleString()} جنيه في محفظتك بنجاح!`);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleQuickPreset = (amt: number) => {
    playKeypadTick();
    setDepositAmount(amt);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 select-none overflow-y-auto no-scrollbar relative pb-20" dir="rtl">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            className="fixed top-3 inset-x-4 z-50 max-w-md mx-auto bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <p className="text-xs font-bold">{toastMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessToast(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header - Exact replica of photo_2026-11-02_16-51-50_377df0a2.jpg */}
      <div className="shrink-0 bg-[#160205] text-white pt-4 pb-4 px-4 flex items-center justify-between">
        {/* Right in RTL: Arrow + Title */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="p-1 rounded-full text-white hover:text-red-300 transition-colors"
          >
            <ArrowRight className="w-6 h-6 stroke-[2]" />
          </button>
          <h1 className="text-lg font-bold text-white tracking-tight">
            فودافون كاش
          </h1>
        </div>

        {/* Left in RTL: Gift with badge + Bell */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative p-1 text-white hover:text-red-300 transition-colors"
            title="الإشعارات"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            type="button"
            className="relative p-1 text-white hover:text-red-300 transition-colors"
            title="الهدايا"
          >
            <Gift className="w-5 h-5 stroke-[2]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e60000] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-[#160205]">
              1
            </span>
          </button>
        </div>
      </div>

      {/* Hero Greeting Bar */}
      <div className="bg-[#160205] text-white px-4 pb-4 pt-1 flex items-center justify-between">
        {/* Right: Welcome Name */}
        <h2 className="text-xl font-bold tracking-tight text-white">
          أهلاً وسهلاً {userName}
        </h2>

        {/* Left: Active wallet badge / Lock & PIN verification */}
        {onLockWallet ? (
          <button
            type="button"
            onClick={onLockWallet}
            className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 cursor-pointer"
            title="تأكيد الرقم السري للمحفظة"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-white">الرقم السري للمحفظة</span>
          </button>
        ) : (
          <div className="bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-2 border border-white/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-white">المحفظة: مفعل</span>
          </div>
        )}
      </div>

      {/* Main Body Content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Dark Burgundy Balance Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-[#2a060d] via-[#1a0206] to-[#0f0103] text-white p-4 shadow-md border border-red-950">
          <div className="flex items-start justify-between">
            {/* Left side in RTL: QR icon + divider + Eye toggle */}
            <div className="flex items-center gap-2 text-gray-300 pt-1">
              <button
                type="button"
                onClick={() => {
                  setToastMessage('كود الـ QR جاهز للمسح');
                  setShowSuccessToast(true);
                }}
                className="hover:text-white transition-colors"
                title="كود الـ QR"
              >
                <QrCode className="w-5 h-5 stroke-[1.8]" />
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="hover:text-white transition-colors"
                title="إظهار / إخفاء الرصيد"
              >
                {showBalance ? <Eye className="w-5 h-5 stroke-[1.8]" /> : <EyeOff className="w-5 h-5 stroke-[1.8]" />}
              </button>
            </div>

            {/* Right side in RTL: Balance */}
            <div className="text-right">
              <div
                onClick={() => setUseArabicNumerals(!useArabicNumerals)}
                className="flex items-baseline justify-end gap-1.5 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                title="اضغط للتبديل بين الأرقام العربية والإنجليزية"
              >
                <span className="text-3xl font-black text-white tracking-tight">
                  {showBalance ? formattedBalance : '••••••'}
                </span>
                <span className="text-lg font-bold text-gray-200">جنيه</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Link: عرض مصروفاتك */}
          <div className="pt-4 border-t border-white/10 mt-3 flex items-center justify-between text-xs text-gray-300">
            <button
              type="button"
              onClick={() => {
                setToastMessage('مصروفاتك للشهر الحالي: 0.00 جنيه');
                setShowSuccessToast(true);
              }}
              className="flex items-center gap-1 font-semibold hover:text-white transition-colors"
            >
              <span>عرض مصروفاتك</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Circular Action Buttons (Exact replica of photo_2026-11-02_16-51-50_377df0a2.jpg) */}
        <div className="grid grid-cols-4 gap-2 text-center py-1">
          {/* 1. تحويل الأموال */}
          <div
            onClick={() => {
              unlockAudio();
              onStartTransfer();
            }}
            className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center group-hover:border-red-400 transition-colors">
              <ArrowLeftRight className="w-6 h-6 text-gray-800 stroke-[2]" />
            </div>
            <span className="mt-2 text-xs font-bold text-gray-800 leading-tight">
              تحويل<br />الأموال
            </span>
          </div>

          {/* 2. إيداع الأموال */}
          <div
            onClick={() => {
              unlockAudio();
              playKeypadTick();
              setShowDepositModal(true);
            }}
            className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center group-hover:border-red-400 transition-colors">
              <Plus className="w-6 h-6 text-gray-800 stroke-[2.5]" />
            </div>
            <span className="mt-2 text-xs font-bold text-gray-800 leading-tight">
              إيداع<br />الأموال
            </span>
          </div>

          {/* 3. عمليات ATM */}
          <div
            onClick={() => {
              playKeypadTick();
              setToastMessage('عمليات الـ ATM جاهزة');
              setShowSuccessToast(true);
            }}
            className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center group-hover:border-red-400 transition-colors">
              <CreditCard className="w-6 h-6 text-gray-800 stroke-[1.8]" />
            </div>
            <span className="mt-2 text-xs font-bold text-gray-800 leading-tight">
              عمليات<br />ATM
            </span>
          </div>

          {/* 4. خدمات الاتصالات */}
          <div
            onClick={() => {
              playKeypadTick();
              setToastMessage('خدمات الاتصالات متاحة');
              setShowSuccessToast(true);
            }}
            className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center group-hover:border-red-400 transition-colors">
              <Phone className="w-6 h-6 text-gray-800 stroke-[1.8]" />
            </div>
            <span className="mt-2 text-xs font-bold text-gray-800 leading-tight">
              خدمات<br />الاتصالات
            </span>
          </div>
        </div>

        {/* Section: خدمات كاش */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">
              خدمات كاش
            </h3>
            <button
              type="button"
              className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              عرض الكل
            </button>
          </div>

          {/* 4 Blue Squircle Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center pt-1">
            {/* كارت الكهرباء */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-13 h-13 rounded-2xl bg-[#008bd2] text-white flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
                <CardIcon className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-gray-700 leading-tight">
                كارت الكهرباء
              </span>
            </div>

            {/* كهرباء */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-13 h-13 rounded-2xl bg-[#008bd2] text-white flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
                <Zap className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-gray-700 leading-tight">
                كهرباء
              </span>
            </div>

            {/* غاز */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-13 h-13 rounded-2xl bg-[#008bd2] text-white flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
                <Flame className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-gray-700 leading-tight">
                غاز
              </span>
            </div>

            {/* مياه */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-13 h-13 rounded-2xl bg-[#008bd2] text-white flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
                <Droplets className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-gray-700 leading-tight">
                مياه
              </span>
            </div>
          </div>
        </div>

        {/* Section: العروض (Promo Banner) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-800 px-1">
            العروض
          </h3>

          <div
            onClick={() => {
              unlockAudio();
              setShowDepositModal(true);
            }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e60000] via-[#cc0000] to-[#990000] text-white p-4 shadow-md cursor-pointer hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1 max-w-[70%]">
                <h4 className="text-base font-black tracking-tight leading-snug">
                  اشحن رصيد محفظة فودافون كاش
                </h4>
                <p className="text-[11px] text-red-100 font-medium">
                  واستمتع بعروض وكاش باك حصري على كل المعاملات!
                </p>
              </div>

              {/* Gold coin graphic */}
              <div className="w-14 h-14 rounded-full bg-amber-400 border-2 border-amber-300 shadow-md flex items-center justify-center text-amber-950 font-black text-xl">
                EGP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#e60000] flex items-center justify-center">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      إيداع في المحفظة
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      المبلغ هيتضاف تلقائي في رصيدك
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">
                  اكتب المبلغ اللي عايز تضيفه:
                </label>
                <div className="flex items-center border-2 border-[#e60000] rounded-2xl px-3 py-2 bg-red-50/20">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={depositAmount}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDepositAmount(v === '' ? '' : Math.max(0, Number(v)));
                    }}
                    placeholder="0"
                    autoFocus
                    className="w-full text-3xl font-black text-gray-900 bg-transparent focus:outline-none font-mono"
                  />
                  <span className="text-base font-bold text-gray-500 shrink-0">
                    جنيه
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500">
                  مبالغ سريعة:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleQuickPreset(amt)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                        depositAmount === amt
                          ? 'bg-[#e60000] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      +{amt} ج.م
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDepositSubmit}
                  disabled={typeof depositAmount !== 'number' || depositAmount <= 0}
                  className="flex-1 py-3.5 rounded-xl bg-[#e60000] text-white text-sm font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إيداع وتحديث الرصيد الآن
                </button>
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-5 py-3.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom 3-Tab Navigation Bar matching photo_2026-11-02_16-51-50_377df0a2.jpg */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between z-30 max-w-lg mx-auto">
        {/* Right in RTL: المحفظة */}
        <button
          type="button"
          onClick={() => setActiveBottomNav('wallet')}
          className="flex flex-col items-center gap-0.5 text-[#e60000]"
        >
          <VodafoneCashPhoneIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">المحفظة</span>
        </button>

        {/* Center: تحويل أموال */}
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            onStartTransfer();
          }}
          className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftRight className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">تحويل أموال</span>
        </button>

        {/* Left: الخدمات */}
        <button
          type="button"
          onClick={() => {
            setActiveBottomNav('services');
            setToastMessage('قائمة جميع الخدمات');
            setShowSuccessToast(true);
          }}
          className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <LayoutGrid className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">الخدمات</span>
        </button>
      </div>
    </div>
  );
};
