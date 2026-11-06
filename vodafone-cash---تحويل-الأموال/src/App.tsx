import React, { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { VodafoneCashDashboard } from './components/VodafoneCashDashboard';
import { PinScreen } from './components/PinScreen';
import { TransferInputScreen } from './components/TransferInputScreen';
import { TransferConfirmScreen } from './components/TransferConfirmScreen';
import { TransferSuccessScreen } from './components/TransferSuccessScreen';
import { DepositScreen } from './components/DepositScreen';
import { DepositSuccessScreen } from './components/DepositSuccessScreen';
import { LoadingModal } from './components/LoadingModal';
import { VodafoneLoginModal } from './components/VodafoneLoginModal';
import { AppScreen } from './types';
import { unlockAudio, playCashRegisterSound } from './utils/audio';
import { formatVodafoneCashDateTime, generateVodafoneCashRef } from './utils/dateFormatter';
import { getRegisteredNameForPhone } from './utils/phoneNameResolver';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('HOME');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('جاري التحميل. برجاء الانتظار');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pinMode, setPinMode] = useState<'LOGIN' | 'TRANSFER'>('TRANSFER');

  // Wallet State - Initialized to 404.87 EGP matching photo_2026-11-02_16-51-50_377df0a2.jpg
  const [balance, setBalance] = useState<number>(404.87);
  const senderPhone = '01025860529';
  const [recipientPhone, setRecipientPhone] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(5);
  const fee = 1;

  // Deposit State
  const [lastDepositAmount, setLastDepositAmount] = useState<number>(500);
  const [lastDepositMethod, setLastDepositMethod] = useState<string>('كارت بنكي (ميزة / فيزا)');

  // Dynamic Real-Time Date & Reference Number for Transfers
  const [transactionDateTime, setTransactionDateTime] = useState<string>(() => formatVodafoneCashDateTime());
  const [referenceNumber, setReferenceNumber] = useState<string>(() => generateVodafoneCashRef());

  // Auto transition from splash to home screen like in video
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1100);
    return () => clearTimeout(splashTimer);
  }, []);

  // Pre-unlock audio on any first click in window
  useEffect(() => {
    const handleFirstTouch = () => {
      unlockAudio();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const transitionWithLoading = (
    nextScreen: AppScreen,
    delayMs = 450,
    msg = 'جاري التحميل. برجاء الانتظار'
  ) => {
    setLoadingMessage(msg);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen(nextScreen);
    }, delayMs);
  };

  const handleOpenVodafoneCash = () => {
    unlockAudio();
    transitionWithLoading('VODAFONE_CASH', 350, 'جاري التحميل. برجاء الانتظار');
  };

  const handleOpenPinLogin = () => {
    unlockAudio();
    setPinMode('LOGIN');
    transitionWithLoading('TRANSFER_PIN', 400, 'جاري التحميل. برجاء الانتظار');
  };

  const handleLockWallet = () => {
    unlockAudio();
    setPinMode('LOGIN');
    transitionWithLoading('TRANSFER_PIN', 400, 'جاري التحميل. برجاء الانتظار');
  };

  const handleStartTransfer = () => {
    unlockAudio();
    transitionWithLoading('TRANSFER_INPUT', 400, 'جاري التحميل. برجاء الانتظار');
  };

  const handleStartDeposit = () => {
    unlockAudio();
    transitionWithLoading('DEPOSIT_INPUT', 400, 'جاري التحميل. برجاء الانتظار');
  };

  const handleDepositToWallet = (amount: number) => {
    setBalance((prev) => prev + amount);
    setLastDepositAmount(amount);
  };

  const handleConfirmDeposit = (amount: number, method: string) => {
    setBalance((prev) => prev + amount);
    setLastDepositAmount(amount);
    setLastDepositMethod(method);
    transitionWithLoading('DEPOSIT_SUCCESS', 600, 'جاري إيداع المبلغ في المحفظة...');
  };

  // Dynamic recipient name resolved for any phone number
  const [recipientName, setRecipientName] = useState(() => getRegisteredNameForPhone('01278300189'));

  const handleInputProceed = (phone: string, amount: number, name?: string) => {
    unlockAudio();
    const resolvedName = name || getRegisteredNameForPhone(phone);
    setRecipientPhone(phone);
    setTransferAmount(amount);
    setRecipientName(resolvedName);
    transitionWithLoading('TRANSFER_CONFIRM', 850, 'جاري التحميل. برجاء الانتظار');
  };

  const handleConfirmProceed = () => {
    unlockAudio();
    setPinMode('TRANSFER');
    transitionWithLoading('TRANSFER_PIN', 450, 'جاري التحميل. برجاء الانتظار');
  };

  const handleAuthorizePinComplete = (_pin: string) => {
    unlockAudio();

    if (pinMode === 'LOGIN') {
      // Wallet login authentication success
      transitionWithLoading('VODAFONE_CASH', 550, 'جاري التحميل. برجاء الانتظار');
      return;
    }

    // Transfer PIN authorization success
    // Generate fresh real-time timestamp and reference number at transfer moment
    setTransactionDateTime(formatVodafoneCashDateTime(new Date()));
    setReferenceNumber(generateVodafoneCashRef());

    // Deduct transferred amount from wallet balance so it stays accurate
    setBalance((prev) => Math.max(0, prev - transferAmount));

    // Immediately play the user's custom audio file right when transfer finishes (strictly once!)
    playCashRegisterSound();

    // Transition directly to success screen with exact loading message from video
    transitionWithLoading('TRANSFER_SUCCESS', 650, 'جاري التحميل. برجاء الانتظار');
  };

  const handleDone = () => {
    // Return to Vodafone Cash hub to view updated wallet balance
    transitionWithLoading('VODAFONE_CASH', 350, 'جاري التحميل. برجاء الانتظار');
  };

  return (
    <PhoneFrame>
      {/* Loading Modal with spinning Vodafone speechmark */}
      <LoadingModal isOpen={isLoading} message={loadingMessage} />

      {/* Ana Vodafone Account Login Modal */}
      <VodafoneLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          transitionWithLoading('VODAFONE_CASH', 500, 'جاري التحميل. برجاء الانتظار');
        }}
      />

      {/* Splash Screen */}
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {currentScreen === 'HOME' && (
            <HomeScreen
              balance={balance}
              onOpenVodafoneCash={handleOpenVodafoneCash}
              onStartTransfer={handleStartTransfer}
              onStartDeposit={handleStartDeposit}
            />
          )}

          {currentScreen === 'VODAFONE_CASH' && (
            <VodafoneCashDashboard
              balance={balance}
              userName="جون"
              onBack={() => transitionWithLoading('HOME', 300)}
              onStartTransfer={handleStartTransfer}
              onDepositSuccess={handleDepositToWallet}
              onLockWallet={handleLockWallet}
            />
          )}

          {currentScreen === 'DEPOSIT_INPUT' && (
            <DepositScreen
              currentBalance={balance}
              onBack={() => transitionWithLoading('VODAFONE_CASH', 300)}
              onConfirmDeposit={handleConfirmDeposit}
            />
          )}

          {currentScreen === 'DEPOSIT_SUCCESS' && (
            <DepositSuccessScreen
              amount={lastDepositAmount}
              newBalance={balance}
              method={lastDepositMethod}
              onDone={handleDone}
              onGoToTransfer={handleStartTransfer}
            />
          )}

          {currentScreen === 'TRANSFER_INPUT' && (
            <TransferInputScreen
              defaultPhone={recipientPhone}
              defaultAmount={transferAmount}
              balance={balance}
              onBack={() => transitionWithLoading('VODAFONE_CASH', 300)}
              onProceed={handleInputProceed}
            />
          )}

          {currentScreen === 'TRANSFER_CONFIRM' && (
            <TransferConfirmScreen
              senderPhone={senderPhone}
              recipientPhone={recipientPhone}
              recipientName={recipientName}
              amount={transferAmount}
              fee={fee}
              onBack={() => transitionWithLoading('TRANSFER_INPUT', 300)}
              onConfirm={handleConfirmProceed}
            />
          )}

          {currentScreen === 'TRANSFER_PIN' && (
            <PinScreen
              onComplete={handleAuthorizePinComplete}
              title="ادخل الرقم السري للمحفظة"
              onBack={() => {
                if (pinMode === 'LOGIN') {
                  transitionWithLoading('HOME', 300);
                } else {
                  transitionWithLoading('TRANSFER_CONFIRM', 300);
                }
              }}
            />
          )}

          {currentScreen === 'TRANSFER_SUCCESS' && (
            <TransferSuccessScreen
              senderPhone={senderPhone}
              recipientPhone={recipientPhone}
              recipientName={recipientName}
              amount={transferAmount}
              fee={fee}
              dateTime={transactionDateTime}
              referenceNumber={referenceNumber}
              onDone={handleDone}
            />
          )}
        </>
      )}
    </PhoneFrame>
  );
}
