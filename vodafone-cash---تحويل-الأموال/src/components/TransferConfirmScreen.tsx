import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { VodafoneCashPhoneIcon } from './VodafoneIcons';
import { unlockAudio } from '../utils/audio';

import { toArabicDigits } from '../utils/dateFormatter';
import { getRegisteredNameForPhone } from '../utils/phoneNameResolver';

interface TransferConfirmScreenProps {
  senderPhone: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  fee: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const TransferConfirmScreen: React.FC<TransferConfirmScreenProps> = ({
  senderPhone,
  recipientPhone,
  recipientName,
  amount,
  fee,
  onBack,
  onConfirm,
}) => {
  const [addGreetingCard, setAddGreetingCard] = useState(false);
  const totalAmount = amount + fee;

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 select-none justify-between overflow-hidden" dir="rtl">
      {/* Top Header - Exact replica of photo_2026-11-02_16-51-40_3ebc9666.jpg */}
      <div className="shrink-0 pt-4 pb-3 px-4 flex items-center justify-between border-b border-gray-100 bg-white">
        <div className="w-6"></div>

        <h2 className="text-base font-bold text-gray-800">تأكيد</h2>

        <button
          type="button"
          onClick={onBack}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ArrowRight className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Big Amount Display - Numeral in vibrant teal/cyan #147a96 matching photo */}
        <div className="text-center pt-2 pb-1">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-[#147a96] tracking-tight">
              {amount}
            </span>
            <span className="text-2xl font-bold text-gray-900">جنيه</span>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            مبلغ التحويل
          </p>
        </div>

        {/* Card 1: Sender & Recipient (Exact replica of Vodafone Cash screenshot) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3.5">
          {/* Sender (من) */}
          <div className="flex items-start gap-4">
            {/* Red Vodafone Cash logo on the far right in RTL */}
            <VodafoneCashPhoneIcon className="w-10 h-13 shrink-0" />

            {/* Labels and phone number adjacent to the logo on its left */}
            <div className="flex flex-col text-right justify-center min-h-[48px]">
              <span className="text-[13px] font-normal text-gray-500 mb-0.5">من</span>
              <span className="text-[17px] font-bold font-mono text-gray-900 tracking-wider">
                {senderPhone}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Recipient (إلي) */}
          <div className="flex items-start gap-4">
            {/* Red Vodafone Cash logo on the far right in RTL */}
            <VodafoneCashPhoneIcon className="w-10 h-13 shrink-0" />

            {/* Labels, phone number, and recipient name adjacent to the logo */}
            <div className="flex flex-col text-right justify-center">
              <span className="text-[13px] font-normal text-gray-500 mb-0.5">إلي</span>
              <span className="text-[17px] font-bold font-mono text-gray-900 tracking-wider">
                {recipientPhone}
              </span>
              <p className="text-xs font-medium text-gray-500 mt-1">
                {recipientName || getRegisteredNameForPhone(recipientPhone)}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Breakdown (الرسوم والإجمالي) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold text-gray-500">الرسوم</span>
            <span className="font-bold text-gray-900">{fee} جنيه</span>
          </div>

          <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between text-gray-700">
            <span className="font-semibold text-gray-500">الإجمالي</span>
            <span className="font-bold text-gray-900 text-sm">
              {totalAmount} جنيه
            </span>
          </div>
        </div>

        {/* Card 3: Greeting Card Toggle & Fun Stickers (Matching screenshot) */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs flex items-center justify-between gap-3">
          {/* Left: Sticker Thumbnails preview */}
          <div className="flex items-center -space-x-2 space-x-reverse">
            <div className="w-12 h-12 rounded-lg bg-red-600 text-white p-1 text-[9px] font-black flex flex-col justify-center items-center shadow-xs border border-white rotate-[-4deg]">
              <span>شبرق</span>
              <span>نفسك</span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-white border border-gray-200 text-gray-700 p-1 text-[8px] font-bold flex items-center justify-center text-center shadow-xs rotate-[3deg]">
              لما اشوف اخرتها معاكم
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 p-0.5 text-[7px] font-semibold flex items-center justify-center text-center shadow-xs hidden sm:flex">
              هذا الرقم غير متاح
            </div>
          </div>

          {/* Right: Label & Switch Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-800 leading-tight">
              زود كارت معايدة
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={addGreetingCard}
                onChange={() => setAddGreetingCard(!addGreetingCard)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e60000]"></div>
            </label>
          </div>
        </div>

        {/* Disclaimer Warning Notice (Matching screenshot) */}
        <p className="text-[11px] text-gray-500 leading-relaxed text-center px-2 pt-1 font-medium">
          تأكد من ادخال الرقم الصحيح و في حالة التحويل الخاطئ لن تتمكن من اعادة المبلغ.
        </p>
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            onConfirm();
          }}
          className="w-full py-4 rounded-xl bg-[#e60000] text-white text-base font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all"
        >
          تأكيد
        </button>
      </div>
    </div>
  );
};
