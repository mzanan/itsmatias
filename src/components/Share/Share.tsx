"use client";

import { useState } from "react";
import { useShare } from "./useShare";
import { QRCodeSVG } from "qrcode.react";
import { FaWhatsapp, FaTelegram, FaCopy, FaCheck, FaShare, FaQrcode } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/Styles/Buttons/IconButton/IconButton";

type ShareProps = {
    isInHero?: boolean;
    label?: string;
    asButton?: boolean;
    className?: string;
};

type ShareContentProps = {
    platform: ReturnType<typeof useShare>["platform"];
    url: string;
    copied: boolean;
    handleNativeShare: () => void;
    handleCopyLink: () => void;
    handleShare: (method: "whatsapp" | "telegram", e?: React.MouseEvent) => void;
};

const ShareContent = ({
    platform,
    url,
    copied,
    handleNativeShare,
    handleCopyLink,
    handleShare,
}: ShareContentProps) => {
    const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    return (
        <>
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
                    <span className="truncate max-w-[16rem] sm:max-w-[20rem]">{displayUrl}</span>
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
        </>
    );
};

export const Share = ({ isInHero = false, label = "Share", asButton = false, className = "" }: ShareProps) => {
    const [isAnimated, setIsAnimated] = useState(true);
    const {
        platform,
        url,
        copied,
        handleNativeShare,
        handleCopyLink,
        handleShare,
    } = useShare();

    const handleClick = () => {
        setIsAnimated(false);
    };

    const pillBase =
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-[1.03]";
    const pillColors = isInHero
        ? "border-cyan-300/60 text-white bg-white/5 hover:bg-cyan-400/15 hover:border-cyan-300"
        : "border-cyan-400/50 text-cyan-200 bg-cyan-400/5 hover:bg-cyan-400/15 hover:border-cyan-300";
    const pillPulse = isAnimated ? "qr-pulse" : "";
    const pillClassName = `${pillBase} ${pillColors} ${pillPulse} ${className}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
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
                    <button type="button" className={pillClassName} onClick={handleClick} aria-label="Share">
                        <FaQrcode className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{label}</span>
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <ShareContent
                    platform={platform}
                    url={url}
                    copied={copied}
                    handleNativeShare={handleNativeShare}
                    handleCopyLink={handleCopyLink}
                    handleShare={handleShare}
                />
            </DialogContent>
        </Dialog>
    );
};

