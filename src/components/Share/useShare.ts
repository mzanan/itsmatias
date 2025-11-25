import { useState, useMemo, useCallback, useRef } from "react";

type Platform = {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isMac: boolean;
  isWindows: boolean;
  hasWebShare: boolean;
};

export const useShare = () => {
  const [copied, setCopied] = useState(false);
  const isSharingRef = useRef(false);

  const platform: Platform = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        isMac: false,
        isWindows: false,
        hasWebShare: false,
      };
    }

    const ua = navigator.userAgent;
    const platformStr = navigator.platform;

    return {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      isIOS: /iPhone|iPad|iPod/i.test(ua),
      isAndroid: /Android/i.test(ua),
      isMac: /Mac|MacIntel|MacPPC|Mac68K/i.test(platformStr),
      isWindows: /Win|Windows|Win32|WinCE/i.test(platformStr),
      hasWebShare: typeof navigator.share !== "undefined",
    };
  }, []);

  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const title = useMemo(() => {
    if (typeof document === "undefined") return "";
    return document.title;
  }, []);

  const shareLinks = useMemo(
    () => ({
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    }),
    [url, title]
  );

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator === "undefined" || typeof navigator.share === "undefined") {
      return;
    }

    if (isSharingRef.current) {
      return;
    }

    isSharingRef.current = true;

    try {
      await navigator.share({
        title,
        url,
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError" && (error as Error).name !== "InvalidStateError") {
        console.error("Error sharing:", error);
      }
    } finally {
      isSharingRef.current = false;
    }
  }, [title, url]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [url]);

  const handleShare = useCallback(
    (method: keyof typeof shareLinks, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      window.open(shareLinks[method], "_blank", "noopener,noreferrer");
    },
    [shareLinks]
  );

  return {
    platform,
    url,
    title,
    shareLinks,
    copied,
    handleNativeShare,
    handleCopyLink,
    handleShare,
  };
};

