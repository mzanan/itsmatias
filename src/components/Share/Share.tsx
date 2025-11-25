"use client";

import { useShare } from "./useShare";
import { QRCodeSVG } from "qrcode.react";
import { FaWhatsapp, FaTelegram, FaTwitter, FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaShare } from "react-icons/fa";
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


    if (asButton) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-6 group bg-transparent"
                    >
                        {label}
                        <FaShare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-white p-4 rounded-lg mb-4">
                            <QRCodeSVG value={url} size={160} level="M" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            Scan to open on mobile
                        </p>
                    </div>

                    {(!platform.isMac || platform.hasWebShare) && (
                        <div className="mb-6">
                            <Button
                                onClick={handleNativeShare}
                                className="w-full"
                                size="lg"
                                disabled={!platform.hasWebShare}
                            >
                                Share via apps
                                <FaShare className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-foreground">
                            Link to share
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={url}
                                readOnly
                                className="flex-1 px-4 py-2 border-2 border-primary/40 rounded-md bg-input text-foreground text-sm"
                            />
                            <Button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2"
                            >
                                {copied ? (
                                    <>
                                        <FaCheck className="h-4 w-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <FaCopy className="h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center">
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
                            onClick={(e) => handleShare("twitter", e)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors">
                                <FaTwitter className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-medium">X</span>
                        </button>

                        <button
                            onClick={(e) => handleShare("linkedin", e)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors">
                                <FaLinkedin className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-medium">LinkedIn</span>
                        </button>

                        <button
                            onClick={(e) => handleShare("email", e)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                <FaEnvelope className="h-6 w-6 text-red-500" />
                            </div>
                            <span className="text-xs font-medium">Email</span>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={buttonClassName}>
                    {label}
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center mb-6">
                    <div className="bg-white p-4 rounded-lg mb-4">
                        <QRCodeSVG value={url} size={160} level="M" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                        Scan to open on mobile
                    </p>
                </div>

                {(!platform.isMac || platform.hasWebShare) && (
                    <div className="mb-6">
                        <Button
                            onClick={handleNativeShare}
                            className="w-full"
                            size="lg"
                            disabled={!platform.hasWebShare}
                        >
                            Share via apps
                            <FaShare className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-foreground">
                        Link to share
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="flex-1 px-4 py-2 border-2 border-primary/40 rounded-md bg-input text-foreground text-sm"
                        />
                        <Button
                            onClick={handleCopyLink}
                            className="flex items-center gap-2"
                        >
                            {copied ? (
                                <>
                                    <FaCheck className="h-4 w-4" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <FaCopy className="h-4 w-4" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center">
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
                        onClick={(e) => handleShare("twitter", e)}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors">
                            <FaTwitter className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium">X</span>
                    </button>

                    <button
                        onClick={(e) => handleShare("linkedin", e)}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors">
                            <FaLinkedin className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium">LinkedIn</span>
                    </button>

                    <button
                        onClick={(e) => handleShare("email", e)}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                            <FaEnvelope className="h-6 w-6 text-red-500" />
                        </div>
                        <span className="text-xs font-medium">Email</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

