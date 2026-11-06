import React from 'react';
import { Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { VodafoneCashPhoneIcon, ScallopedSuccessBadge } from './VodafoneIcons';

import { toArabicDigits } from '../utils/dateFormatter';
import { getRegisteredNameForPhone } from '../utils/phoneNameResolver';

interface TransferSuccessScreenProps {
  senderPhone: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  fee: number;
  dateTime?: string;
  referenceNumber?: string;
  onDone: () => void;
  onShare?: () => void;
}

export const TransferSuccessScreen: React.FC<TransferSuccessScreenProps> = ({
  senderPhone,
  recipientPhone,
  recipientName,
  amount,
  fee,
  dateTime,
  referenceNumber = 'VF88392019',
  onDone,
}) => {
  const totalAmount = amount + fee;

  const handleShare = async () => {
    const textToShare = `لقد تم الدفع بنجاح! بمبلغ ${amount} جنيه لرقم ${recipientPhone} من خلال فودافون كاش. رقم العملية: ${referenceNumber}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'إيصال دفع فودافون كاش',
          text: textToShare,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard?.writeText(textToShare);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 justify-between select-none overflow-hidden" dir="rtl">
      {/* Top Header - Exact replica of photo_2026-11-02_16-51-34_6785427b.jpg */}
      <div className="shrink-0 pt-4 pb-3 px-4 flex items-center justify-center border-b border-gray-100 bg-white">
        <h2 className="text-base font-bold text-gray-800">تم بنجاح</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Animated Green Scalloped Rosette Badge (Non-clickable, Realistic single badge) */}
        <div className="flex flex-col items-center justify-center pt-3 pb-1">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-3 select-none pointer-events-none"
          >
            <ScallopedSuccessBadge className="w-20 h-20" />
          </motion.div>
          <p className="text-base font-bold text-gray-800">
            لقد تم الدفع بنجاح!
          </p>
        </div>

        {/* Amount Display - Numeral in vibrant teal/cyan #147a96 matching photo */}
        <div className="text-center pt-1 pb-1">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black text-[#147a96] tracking-tight">
              {amount}
            </span>
            <span className="text-2xl font-bold text-gray-900">جنيه</span>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            اجمالي المبلغ
          </p>
        </div>

        {/* Card 1: Sender & Recipient (Exact replica of screenshot) */}
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
      </div>

      {/* Bottom Action Buttons (Right: شارك Red, Left: تم White, matching photo_2026-11-02_16-51-34_6785427b.jpg) */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3" dir="rtl">
        {/* شارك Button on Right in RTL */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 py-3.5 rounded-xl bg-[#e60000] text-white text-base font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5 stroke-[2.2]" />
          <span>شارك</span>
        </button>

        {/* تم Button on Left in RTL */}
        <button
          type="button"
          onClick={onDone}
          className="flex-1 py-3.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-base font-bold shadow-xs hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
        >
          تم
        </button>
      </div>
    </div>
  );
};
