import { useEffect } from "react";

export function useKeyboardShortcuts({ onSearch, onNewSnippet }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearch?.();
      }

      if (modKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        onNewSnippet?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch, onNewSnippet]);
}