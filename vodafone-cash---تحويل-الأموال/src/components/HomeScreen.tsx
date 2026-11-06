import React from 'react';
import {
  Bell,
  Search,
  ChevronLeft,
  PhoneCall,
  Smartphone,
  Menu,
  CreditCard,
} from 'lucide-react';
import { VodafoneLogo, VodafoneCashPhoneIcon } from './VodafoneIcons';

interface HomeScreenProps {
  balance?: number | string;
  onOpenVodafoneCash: () => void;
  onStartTransfer: () => void;
  onStartDeposit: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenVodafoneCash,
  onStartDeposit,
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#f4f5f7] text-gray-900 overflow-y-auto no-scrollbar pb-24 select-none relative" dir="rtl">
      {/* Top Header Bar matching photo_2026-11-02_16-52-23_3730c456.jpg */}
      <div className="shrink-0 bg-white px-4 pt-3 pb-3 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        {/* Right in RTL: Vodafone Red Circular Logo */}
        <div className="flex items-center gap-2">
          <VodafoneLogo className="w-8 h-8" />
        </div>

        {/* Left in RTL: Notification Bell + Search */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>

          <button
            type="button"
            className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="p-3.5 space-y-3">
        {/* Hero Slider Banner: "الشبكة بقت الدبل تاني!" */}
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141416] via-[#1f1f24] to-[#0a0a0c] text-white p-4 shadow-md border border-neutral-800">
            {/* Red neon circular ring graphic in background */}
            <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full border-4 border-[#e60000]/60 opacity-60 pointer-events-none"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1 max-w-[65%]">
                <h3 className="text-lg font-black tracking-tight leading-tight text-white">
                  الشبكة بقت الدبل تاني!
                </h3>
                <p className="text-xs text-gray-300 font-bold">
                  عشان ماينفعش تحس بينا
                </p>
              </div>

              {/* 5G Badge and Vodafone Icon */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#e60000] flex items-center justify-center p-1.5 shadow-sm">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="white">
                    <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
                  </svg>
                </div>
                <span className="text-[10px] font-black tracking-wider text-white bg-black/60 px-1.5 py-0.5 rounded border border-white/20">
                  5G
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator (6 dots, 4th red) */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-[#e60000]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          </div>
        </div>

        {/* Red Strip Banner: "ريح بالك 14 قرش" */}
        <div className="bg-[#e60000] text-white rounded-xl py-2 px-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 stroke-[2.2]" />
            <span className="text-xs font-bold">ريح بالك 14 قرش</span>
          </div>
        </div>

        {/* Middle Card: "كروت فكة" */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            {/* Title with icon */}
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-bold text-gray-900">كروت فكة</h4>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e60000]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            </div>
          </div>

          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            لا يوجد لديك كروت متاحة. اشحن كارت فكة دلوقتي.
          </p>

          <button
            type="button"
            className="w-full py-2.5 rounded-xl bg-[#e60000] text-white text-xs font-bold hover:bg-[#cc0000] active:scale-[0.99] transition-all text-center"
          >
            تحكم في الكروت
          </button>
        </div>

        {/* 2x2 Grid Tiles (Matching photo_2026-11-02_16-52-23_3730c456.jpg) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Top-Right: شحن الرصيد */}
          <div
            onClick={onStartDeposit}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex flex-col justify-between h-28 cursor-pointer hover:border-red-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">شحن الرصيد</span>
              <Smartphone className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600">0.0 جنيه</span>
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Top-Left: كروت فكة */}
          <div className="bg-[#cc0000] text-white rounded-2xl p-3 border border-red-700 shadow-xs flex flex-col justify-between h-28 relative overflow-hidden">
            <span className="text-xs font-bold">كروت فكة</span>
            <div className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold py-1 px-2 rounded-lg text-center w-fit">
              كارت الفكة
            </div>
          </div>

          {/* Bottom-Right: فودافون كاش (Click opens Vodafone Cash!) */}
          <div
            onClick={onOpenVodafoneCash}
            className="bg-[#1f1f24] text-white rounded-2xl p-3.5 border border-neutral-800 shadow-md flex flex-col justify-between h-28 cursor-pointer hover:bg-neutral-900 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">فودافون كاش</span>
              <VodafoneCashPhoneIcon className="w-5 h-5 text-red-500" />
            </div>

            <div className="text-[11px] text-red-400 font-bold flex items-center gap-1">
              <span>المحفظة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bottom-Left: حول لباقات فليكس */}
          <div className="bg-[#1f1f24] text-white rounded-2xl p-3.5 border border-neutral-800 shadow-md flex flex-col justify-between h-28">
            <span className="text-xs font-bold text-white leading-tight">
              حول لباقات فليكس
            </span>

            {/* Badges of Anghami, Yango Play, Watch It */}
            <div className="flex items-center gap-1 text-[8px] font-extrabold text-gray-300">
              <span className="bg-purple-950 text-purple-300 px-1 py-0.5 rounded">anghami</span>
              <span className="bg-amber-950 text-amber-300 px-1 py-0.5 rounded">YANGO</span>
              <span className="bg-red-950 text-red-300 px-1 py-0.5 rounded">WATCH IT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation Bar matching photo_2026-11-02_16-52-23_3730c456.jpg */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between z-30 max-w-lg mx-auto">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-900">
          <Menu className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Center Floating Vodafone Circular Button */}
        <div className="relative -top-3">
          <button
            type="button"
            onClick={onOpenVodafoneCash}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center p-1.5 hover:scale-105 active:scale-95 transition-transform"
          >
            <VodafoneLogo className="w-full h-full" />
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenVodafoneCash}
          className="p-2 text-[#e60000]"
        >
          <VodafoneCashPhoneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
