import React from 'react';

/**
 * Authentic Vodafone Speechmark Droplet Logo
 */
export const VodafoneLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="100" fill="#E60000" />
    <path
      d="M100 42C67.97 42 42 67.97 42 100C42 132.03 67.97 158 100 158C132.03 158 158 132.03 158 100C158 75.25 142.45 54.14 120.67 46.04C121.2 48.06 121.5 50.18 121.5 52.37C121.5 70.36 106.86 85 88.87 85C83.39 85 78.26 83.63 73.78 81.25C72.63 87.12 72 93.18 72 99.4C72 119.06 87.94 135 107.6 135C127.26 135 143.2 119.06 143.2 99.4C143.2 67.7 117.7 42 100 42Z"
      fill="white"
    />
  </svg>
);

/**
 * White Speechmark without red circle background (for red cards)
 */
export const VodafoneSpeechmarkWhite: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 32.1 80.7 16.8 64.9 10.9C65.3 12.4 65.5 13.9 65.5 15.5C65.5 28.5 54.9 39.1 41.9 39.1C38 39.1 34.3 38.1 31 36.4C30.2 40.6 29.7 45 29.7 49.5C29.7 63.8 41.2 75.3 55.5 75.3C69.8 75.3 81.3 63.8 81.3 49.5C81.3 26.5 62.8 8 50 8Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Vodafone Cash rectangular badge as seen in video (Red box with speechmark + "كاش")
 */
export const VodafoneCashBadge: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#e60000] text-white shadow-xs ${className}`}>
    <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="#e60000">
        <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
      </svg>
    </div>
    <span className="text-[12px] font-bold tracking-tight leading-none pt-0.5">كاش</span>
  </div>
);

/**
 * Meeza (ميزة) Official Egyptian Payment Network Logo
 */
export const MeezaLogo: React.FC<{ className?: string }> = ({ className = 'h-5' }) => (
  <div className={`inline-flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-xs ${className}`}>
    <div className="flex -space-x-1 items-center">
      <span className="w-2.5 h-2.5 rounded-full bg-[#00A859] inline-block opacity-90"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#F39200] inline-block opacity-90 -mr-1"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#E50019] inline-block opacity-90 -mr-1"></span>
    </div>
    <span className="text-[11px] font-extrabold text-[#1f2937] tracking-tight leading-none">ميزة</span>
  </div>
);

import vodafoneCashPhoneLogo from '../assets/vodafone_cash_phone_logo.png';

/**
 * Authentic Vodafone Cash official phone emblem
 * Matches photo_2026-11-05_00-18-00_3de4c369.jpg uploaded by the user with 100% fidelity.
 */
export const VodafoneCashPhoneIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-13' }) => (
  <img
    src={vodafoneCashPhoneLogo}
    alt="Vodafone Cash"
    className={`shrink-0 select-none object-contain pointer-events-none ${className}`}
  />
);

/**
 * Authentic Vodafone Cash Brand Logo as seen in Video Frame 9 (crop_logo.jpg)
 * Smartphone with flying cash flyer + red italic "كاش" speed-stripes wordmark
 */
export const VodafoneCashAuthLogo: React.FC<{ className?: string }> = ({ className = 'w-20' }) => (
  <div className={`flex flex-col items-center justify-center select-none ${className}`}>
    {/* Phone with flying cash */}
    <div className="relative w-9 h-14 rounded-[7px] border-[2.2px] border-[#e60000] bg-white flex flex-col items-center justify-between p-1">
      {/* Speaker notch */}
      <div className="w-2.5 h-[2px] bg-[#e60000] rounded-full"></div>

      {/* Origami Flying Cash Flyer inside phone screen */}
      <svg viewBox="0 0 40 32" className="w-6 h-5 my-auto" fill="none">
        <path
          d="M4 18 L24 4 L36 12 L18 28 L14 22 Z"
          fill="#e60000"
        />
        <path
          d="M24 4 L14 22 L18 28 Z"
          fill="#ffffff"
          fillOpacity="0.45"
        />
        <circle cx="27" cy="11" r="2.2" fill="#ffffff" />
      </svg>

      {/* Bottom Home indicator */}
      <div className="w-2.5 h-[2px] bg-[#e60000] rounded-full"></div>
    </div>

    {/* Authentic Red "كاش" with speed slashes below the phone */}
    <div className="flex items-center justify-center gap-1 mt-1.5 text-[#e60000]">
      {/* 4 Speed slashes */}
      <div className="flex items-center -space-x-0.5">
        <span className="w-1.5 h-3.5 -skew-x-[25deg] bg-[#e60000] inline-block"></span>
        <span className="w-1.5 h-3.5 -skew-x-[25deg] bg-[#e60000] inline-block ml-0.5"></span>
        <span className="w-1.5 h-3.5 -skew-x-[25deg] bg-[#e60000] inline-block ml-0.5"></span>
      </div>
      {/* Stylized "كاش" */}
      <span className="text-[17px] font-black italic tracking-tighter leading-none -skew-x-[15deg]">
        كاش
      </span>
    </div>
  </div>
);

/**
 * Green Scalloped Rosette Badge with Checkmark (Exact match to Vodafone Cash photo_2026-11-02_16-51-34_6785427b.jpg)
 */
export const ScallopedSuccessBadge: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Single pristine 12-lobed scalloped rosette matching Vodafone Cash screenshot */}
    <path
      d="M40.29 13.78
         A11.5 11.5 0 0 1 59.71 13.78
         A11.5 11.5 0 0 1 76.52 23.48
         A11.5 11.5 0 0 1 86.22 40.29
         A11.5 11.5 0 0 1 86.22 59.71
         A11.5 11.5 0 0 1 76.52 76.52
         A11.5 11.5 0 0 1 59.71 86.22
         A11.5 11.5 0 0 1 40.29 86.22
         A11.5 11.5 0 0 1 23.48 76.52
         A11.5 11.5 0 0 1 13.78 59.71
         A11.5 11.5 0 0 1 13.78 40.29
         A11.5 11.5 0 0 1 23.48 23.48
         A11.5 11.5 0 0 1 40.29 13.78 Z"
      fill="#00A859"
    />
    {/* Clean, thick white checkmark with rounded ends */}
    <path
      d="M33 50.5 L44.5 62 L67.5 39"
      stroke="#ffffff"
      strokeWidth="7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

