import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

/**
 * Authentic Vodafone Loading Screen matching the video (f_04.jpg & f_05.jpg):
 * - Dimmed overlay (bg-black/45)
 * - The exact white circular stroke spinner arc ("الدايرة اللي هي بتروح عاملة دي")
 * - Crisp text "جاري التحميل. برجاء الانتظار" positioned above the bottom action area
 */
export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = 'جاري التحميل. برجاء الانتظار',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="vodafone-loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-between bg-black/45 backdrop-blur-[1px] select-none pointer-events-auto"
          dir="rtl"
        >
          {/* Top spacer */}
          <div className="w-full h-16 shrink-0" />

          {/* Center: The exact Vodafone circular arc spinner matching video frames f_04.jpg & f_05.jpg */}
          <div className="flex-1 flex items-center justify-center -mt-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg
                className="vodafone-circle-spinner w-14 h-14"
                viewBox="0 0 50 50"
              >
                <circle
                  className="vodafone-circle-path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Lower portion: Clean white text positioned above bottom button */}
          <div className="w-full pb-28 px-6 flex justify-center shrink-0">
            <p className="text-white text-[15.5px] font-medium tracking-normal text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {message}
            </p>
          </div>

          {/* Authentic Material / Vodafone circular arc animation */}
          <style>{`
            .vodafone-circle-spinner {
              animation: vodafoneCircleRotate 1.4s linear infinite;
              transform-origin: center center;
            }
            .vodafone-circle-path {
              stroke-dasharray: 1, 150;
              stroke-dashoffset: 0;
              animation: vodafoneCircleDash 1.4s ease-in-out infinite;
            }
            @keyframes vodafoneCircleRotate {
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes vodafoneCircleDash {
              0% {
                stroke-dasharray: 1, 150;
                stroke-dashoffset: 0;
              }
              50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -35;
              }
              100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
