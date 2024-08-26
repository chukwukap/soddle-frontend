"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className=" py-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <Link
          href="https://x.com/soddle_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/twitterx.png"
            alt="Twitter"
            width={24}
            height={24}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link
          href="https://t.me/SoddleOfficial"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/telegram.png"
            alt="Telegram"
            width={24}
            height={24}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
