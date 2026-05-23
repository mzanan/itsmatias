"use client";

import { QRCodeSVG } from "qrcode.react";
import { FaWhatsapp, FaTelegram, FaCopy, FaCheck, FaShare } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconButton } from "@/components/Styles/Buttons/IconButton/IconButton";
import { useShare } from "./useShare";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ShareDialog = ({ open, onOpenChange }: Props) => {
  const {
    platform,
    url,
    copied,
    handleNativeShare,
    handleCopyLink,
    handleShare,
  } = useShare();

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold tracking-tight">
            Share this portfolio
          </DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR or use a quick action below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center mt-2">
          <div className="relative p-1 rounded-2xl bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-purple-600/60 shadow-[0_10px_40px_-15px_rgba(34,211,238,0.5)]">
            <div className="bg-white p-5 rounded-[14px]">
              <QRCodeSVG value={url} size={176} level="M" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="group mt-4 inline-flex items-center gap-2 max-w-full px-3 py-1.5 rounded-full border border-border bg-card/50 hover:bg-card text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy link"
          >
            <span className="truncate max-w-[16rem] sm:max-w-[20rem]">
              {displayUrl}
            </span>
            {copied ? (
              <FaCheck className="h-3 w-3 text-green-500 shrink-0" />
            ) : (
              <FaCopy className="h-3 w-3 shrink-0 opacity-60 group-hover:opacity-100" />
            )}
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <IconButton
            onClick={(e) => handleShare("whatsapp", e)}
            variant="green"
            iconColor="green"
            icon={<FaWhatsapp />}
            label="WhatsApp"
          />

          <IconButton
            onClick={(e) => handleShare("telegram", e)}
            variant="blue"
            iconColor="blue"
            icon={<FaTelegram />}
            label="Telegram"
          />

          {(!platform.isMac || platform.hasWebShare) && (
            <IconButton
              onClick={handleNativeShare}
              icon={<FaShare />}
              label="More"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
