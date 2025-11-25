"use client";

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

type ShareProps = {
    isInHero?: boolean;
    label?: string;
    asButton?: boolean;
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

            <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-4 rounded-lg mb-4">
                    <QRCodeSVG value={url} size={160} level="M" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    Scan to open on mobile
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={(e) => handleShare("whatsapp", e)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                >
                    <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <FaWhatsapp className="h-6 w-6 text-green-500" />
                    </div>
                    <span className="text-xs font-medium">WhatsApp</span>
                </button>

                <button
                    onClick={(e) => handleShare("telegram", e)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                >
                    <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <FaTelegram className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium">Telegram</span>
                </button>

                <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {copied ? (
                            <FaCheck className="h-6 w-6 text-primary" />
                        ) : (
                            <FaCopy className="h-6 w-6 text-primary" />
                        )}
                    </div>
                    <span className="text-xs font-medium">Copy link</span>
                </button>

                {(!platform.isMac || platform.hasWebShare) && (
                    <button
                        onClick={handleNativeShare}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <FaShare className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xs font-medium">More options</span>
                    </button>
                )}
            </div>
        </>
    );
};

export const Share = ({ isInHero = false, label = "Share", asButton = false }: ShareProps) => {
    const {
        platform,
        url,
        copied,
        handleNativeShare,
        handleCopyLink,
        handleShare,
    } = useShare();

    const buttonClassName = `text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${isInHero ? "text-white" : "text-muted-foreground"
        }`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {asButton ? (
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-6 group bg-transparent"
                    >
                        {label}
                        <FaShare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                ) : (
                    <button className={buttonClassName}>
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

