import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { VodafoneCashAuthLogo } from './VodafoneIcons';
import { playKeypadTick, unlockAudio } from '../utils/audio';

interface PinScreenProps {
  onComplete: (pin: string) => void;
  onBack?: () => void;
  title?: string;
}

export const PinScreen: React.FC<PinScreenProps> = ({
  onComplete,
  onBack,
  title = 'ادخل الرقم السري للمحفظة',
}) => {
  const [pin, setPin] = useState<string>('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      unlockAudio();
      playKeypadTick();
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 6) {
        setTimeout(() => {
          onComplete(newPin);
        }, 100);
      }
    }
  };

  const handleDelete = () => {
    unlockAudio();
    playKeypadTick();
    setPin((prev) => prev.slice(0, -1));
  };

  // Keyboard support for desktop testing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Enter' && pin.length >= 4) {
        onComplete(pin);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  // Keypad definitions in standard English digits:
  const keypadRows = [
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ],
    [
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
    ],
    [
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
    ],
  ];

  return (
    <div
      className="flex flex-col h-full w-full bg-white text-gray-900 justify-between select-none relative overflow-hidden"
      dir="rtl"
    >
      {/* Top Bar with optional back button */}
      <div className="shrink-0 pt-4 px-4 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            title="رجوع"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>
        ) : (
          <div className="w-6" />
        )}
        <div className="w-6" />
      </div>

      {/* Main Content: Logo, Title, 6 Dots, and Forgot PIN */}
      <div className="flex-1 flex flex-col items-center justify-start pt-2 px-6">
        {/* Vodafone Cash Brand Logo matching Video Frame 9 (phone with cash + كاش) */}
        <div className="mb-4">
          <VodafoneCashAuthLogo className="w-20" />
        </div>

        {/* Title: Exact wording from the video */}
        <h1 className="text-[20px] font-bold text-[#222222] mb-6 text-center tracking-normal">
          {title}
        </h1>

        {/* 6 Pin Indicator Dots */}
        <div className="flex items-center justify-center gap-3.5 mb-4" dir="ltr">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  scale: isFilled ? [1, 1.25, 1] : 1,
                  backgroundColor: isFilled ? '#e60000' : '#cfd4dc',
                }}
                transition={{ duration: 0.15 }}
                className="w-4 h-4 rounded-full shadow-2xs"
              />
            );
          })}
        </div>

        {/* Forgot PIN link matching video */}
        <button
          type="button"
          onClick={() => setShowForgotModal(true)}
          className="text-[14.5px] font-medium text-[#e60000] hover:underline transition-colors mt-1"
        >
          نسيت الرقم السري؟
        </button>
      </div>

      {/* Keypad matching Video Frame 9: Soft flat grey circular discs + Arabic numerals */}
      <div className="w-full px-6 pb-8 max-w-[310px] mx-auto shrink-0" dir="ltr">
        <div className="grid grid-cols-3 gap-y-3.5 gap-x-5 justify-items-center">
          {/* Rows 1, 2, 3 */}
          {keypadRows.map((row, rowIndex) =>
            row.map((btn) => (
              <button
                key={`${rowIndex}-${btn.value}`}
                type="button"
                onClick={() => handleDigit(btn.value)}
                className="w-[72px] h-[72px] rounded-full bg-[#f0f2f5] active:bg-[#e2e5e9] active:scale-95 transition-all duration-75 flex items-center justify-center text-[29px] font-medium text-[#111827] cursor-pointer shadow-2xs"
              >
                {btn.label}
              </button>
            ))
          )}

          {/* Row 4: Empty (left), 0 (center), Backspace [X] (right) */}
          <div className="w-[72px] h-[72px]" />

          {/* 0 */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="w-[72px] h-[72px] rounded-full bg-[#f0f2f5] active:bg-[#e2e5e9] active:scale-95 transition-all duration-75 flex items-center justify-center text-[29px] font-medium text-[#111827] cursor-pointer shadow-2xs font-sans"
          >
            0
          </button>

          {/* Backspace Button with authentic [X] tag icon from video */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-[72px] h-[72px] rounded-full active:bg-[#e2e5e9] active:scale-95 transition-all duration-75 flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="مسح"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-[#262626]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Forgot PIN Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl text-center space-y-3"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-900 text-sm">إعادة تعيين الرقم السري</span>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                لإعادة تعيين الرقم السري لمحفظة فودافون كاش، اطلب كود{' '}
                <span className="font-bold text-[#e60000] font-mono dir-ltr inline-block">#9*</span>{' '}
                أو توجه لأقرب فرع فودافون ببطاقة الرقم القومي السارية.
              </p>

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2.5 bg-[#e60000] text-white font-bold rounded-xl text-xs hover:bg-[#bd0000] transition-colors"
              >
                حسناً
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
