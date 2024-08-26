'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// import { useWalletModal, } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';

const ConnectWalletButton: React.FC = () => {
  const { wallet, connect, connecting, connected, publicKey } = useWallet();
  //   const { setVisible } = useWalletModal();
  const router = useRouter();

  const clipPath = 'polygon(12% 0, 100% 0, 100% 77%, 86% 100%, 0 100%, 0 25%)';

  const handleClick = async () => {
    if (connected) {
      router.push('/games/');
    } else {
      try {
        if (wallet) {
          await connect();
        } else {
          //   setVisible(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  return (
    <div className="button-shadow-wrapper">
      <button
        className={`
          relative
          inline-block
          px-6 py-3
          bg-[#2D2D2D]
          text-white text-opacity-80 
          font-sans text-sm sm:text-base md:text-lg
          focus:outline-none
          transition-all duration-300 ease-in-out
          hover:brightness-110 active:brightness-90
          w-full
        `}
        style={{ clipPath }}
        onClick={handleClick}
        disabled={connecting}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-[#002D00] bg-opacity-50 -z-10"
          style={{ clipPath }}
        />

        {/* Content */}
        <span className="relative z-10">
          {connecting
            ? 'Connecting...'
            : connected
            ? 'Connected'
            : 'Connect Wallet'}
        </span>
      </button>
    </div>
  );
};

export default ConnectWalletButton;
