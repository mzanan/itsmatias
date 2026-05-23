"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaQrcode } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const ShareDialog = dynamic(
  () => import("./ShareDialog").then((m) => m.ShareDialog),
  { ssr: false },
);

type ShareProps = {
  isInHero?: boolean;
  label?: string;
  asButton?: boolean;
  className?: string;
};

export const Share = ({
  isInHero = false,
  label = "Share",
  asButton = false,
  className = "",
}: ShareProps) => {
  const [isAnimated, setIsAnimated] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setIsAnimated(false);
    setOpen(true);
  };

  const pillBase =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-[1.03]";
  const pillColors = isInHero
    ? "border-cyan-300/60 text-white bg-white/5 hover:bg-cyan-400/15 hover:border-cyan-300"
    : "border-cyan-400/50 text-cyan-200 bg-cyan-400/5 hover:bg-cyan-400/15 hover:border-cyan-300";
  const pillPulse = isAnimated ? "qr-pulse" : "";
  const pillClassName = `${pillBase} ${pillColors} ${pillPulse} ${className}`;

  return (
    <>
      {asButton ? (
        <Button
          size="lg"
          variant="outline"
          className="text-base px-6 group bg-transparent"
          onClick={handleClick}
        >
          {label}
          <FaShareNodes className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
        </Button>
      ) : (
        <button
          type="button"
          className={pillClassName}
          onClick={handleClick}
          aria-label="Share"
        >
          <FaQrcode className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      )}
      {open && <ShareDialog open={open} onOpenChange={setOpen} />}
    </>
  );
};
