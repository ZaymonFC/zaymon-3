import { useState, useCallback, useRef, useEffect } from "react";

interface UseCopyToClipboardProps {
  copyText: string;
  copiedText: string;
  getText: () => string;
  duration?: number;
}

export function useCopyToClipboard({
  copyText,
  copiedText,
  getText,
  duration = 500,
}: UseCopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copy = useCallback(() => {
    const text = getText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, duration);
  }, [getText, duration]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const buttonText = isCopied ? copiedText : copyText;

  return { copy, buttonText, isCopied };
}
