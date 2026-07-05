"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaQrcode } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { fireConfetti } from "@/lib/confetti";

const ShareDialog = dynamic(
  () => import("./ShareDialog").then((m) => m.ShareDialog),
  { ssr: false },
);

type ShareProps = {
  label?: string;
  asButton?: boolean;
  className?: string;
};

export const Share = ({
  label = "Share",
  asButton = false,
  className = "",
}: ShareProps) => {
  const [isAnimated, setIsAnimated] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setIsAnimated(false);
    setOpen(true);
    fireConfetti();
  };

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
        <Pill
          variant="outline"
          size="sm"
          Icon={FaQrcode}
          iconPosition="left"
          className={cn("sm:text-sm", isAnimated && "qr-pulse", className)}
          onClick={handleClick}
          aria-label="Share"
        >
          {label}
        </Pill>
      )}
      {open && <ShareDialog open={open} onOpenChange={setOpen} />}
    </>
  );
};
