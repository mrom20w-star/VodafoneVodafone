import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { VodafoneLogo, VodafoneCashAuthLogo } from './VodafoneIcons';
import { playKeypadTick, unlockAudio } from '../utils/audio';

interface VodafoneLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const VodafoneLoginModal: React.FC<VodafoneLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [phone, setPhone] = useState('01025860529');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginMethod, setLoginMethod] = useState<'password' | 'pin'>('pin');
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudio();
    onSuccess(phone);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-[#e60000] text-white px-5 pt-5 pb-6 relative flex flex-col items-center">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <VodafoneLogo className="w-12 h-12 mb-2 drop-shadow-sm" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              تسجيل الدخول
            </h2>
            <p className="text-xs text-red-100 mt-0.5">
              تطبيق أنا فودافون وفودافون كاش
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex border-b border-gray-100 bg-gray-50/80 p-1.5 text-xs font-bold text-gray-600">
            <button
              type="button"
              onClick={() => {
                playKeypadTick();
                setLoginMethod('pin');
              }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                loginMethod === 'pin'
                  ? 'bg-white text-[#e60000] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              الرقم السري للمحفظة
            </button>
            <button
              type="button"
              onClick={() => {
                playKeypadTick();
                setLoginMethod('password');
              }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                loginMethod === 'password'
                  ? 'bg-white text-[#e60000] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              كلمة المرور
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                رقم الموبايل
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  dir="ltr"
                  placeholder="010XXXXXXXX"
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-mono text-sm font-bold focus:bg-white focus:border-[#e60000] focus:ring-2 focus:ring-[#e60000]/20 outline-none transition-all"
                  required
                />
                <Smartphone className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
              </div>
            </div>

            {loginMethod === 'password' ? (
              /* Password Input */
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 block">
                    كلمة المرور
                  </label>
                  <a href="#forgot" className="text-[11px] font-semibold text-[#e60000] hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="ltr"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:bg-white focus:border-[#e60000] focus:ring-2 focus:ring-[#e60000]/20 outline-none transition-all"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-400 hover:text-gray-600 absolute right-3"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              /* 6-digit PIN entry */
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 block">
                    الرقم السري للمحفظة (6 أرقام)
                  </label>
                  <span className="text-[11px] font-semibold text-[#e60000]">
                    نسيت الرقم السري؟
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2" dir="ltr">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <input
                      key={idx}
                      id={`pin-box-${idx}`}
                      type="password"
                      maxLength={1}
                      value={pinDigits[idx]}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newPin = [...pinDigits];
                        newPin[idx] = val;
                        setPinDigits(newPin);
                        if (val && idx < 5) {
                          document.getElementById(`pin-box-${idx + 1}`)?.focus();
                        } else if (val && idx === 5) {
                          setTimeout(() => {
                            unlockAudio();
                            onSuccess(phone);
                          }, 120);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !pinDigits[idx] && idx > 0) {
                          document.getElementById(`pin-box-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:border-[#e60000] focus:bg-white focus:ring-2 focus:ring-[#e60000]/20 outline-none"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded text-[#e60000] focus:ring-[#e60000] accent-[#e60000]"
                />
                <span>تذكرني على هذا الجهاز</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>حماية فودافون</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#e60000] hover:bg-[#cc0000] active:scale-[0.98] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>تسجيل الدخول</span>
            </button>

            {/* Register link */}
            <p className="text-center text-xs text-gray-500 pt-1">
              ليس لديك حساب؟{' '}
              <button
                type="button"
                onClick={onClose}
                className="text-[#e60000] font-bold hover:underline"
              >
                اشترك الآن مجاناً
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
