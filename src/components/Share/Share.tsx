"use client";

import { useState } from "react";
import { useShare } from "./useShare";
import { QRCodeSVG } from "qrcode.react";
import { FaWhatsapp, FaTelegram, FaCopy, FaCheck, FaShare } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
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
    return (
        <>
            <DialogHeader className="text-center">
                <DialogTitle className="text-center">Share</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                    <QRCodeSVG value={url} size={160} level="M" />
                </div>
            </div>

            <div className="flex justify-center">
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

                <IconButton
                    onClick={handleCopyLink}
                    icon={copied ? <FaCheck /> : <FaCopy />}
                    label="Copy link"
                />

                {(!platform.isMac || platform.hasWebShare) && (
                    <IconButton
                        onClick={handleNativeShare}
                        icon={<FaShare />}
                        label="More options"
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

    const baseClasses = "text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105";
    const colorClass = isInHero ? "text-white" : "text-muted-foreground";
    const shinyClass = isAnimated ? "shiny-text" : "";
    const buttonClassName = `${baseClasses} ${colorClass} ${shinyClass} ${className}`;

    const handleClick = () => {
        setIsAnimated(false);
    };

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
                        <FaShare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                ) : (
                    <button className={buttonClassName} onClick={handleClick}>
                        {label}
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

