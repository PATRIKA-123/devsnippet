import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSnippets } from "../../hooks/useSnippets";

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { data: snippets } = useSnippets({ search: query || undefined });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-start justify-center pt-24 z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
              <Search size={18} className="text-gray-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search snippets by title, tag, or code..."
                className="flex-1 bg-transparent text-white outline-none"
              />
              <button onClick={onClose} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {!query ? (
                <p className="text-gray-500 text-sm px-4 py-6 text-center">
                  Start typing to search your snippets
                </p>
              ) : snippets?.length === 0 ? (
                <p className="text-gray-500 text-sm px-4 py-6 text-center">No results found</p>
              ) : (
                snippets?.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => {
                      onClose();
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 transition flex flex-col gap-0.5"
                  >
                    <span className="text-white text-sm font-medium">{s.title}</span>
                    <span className="text-gray-500 text-xs uppercase">{s.language}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;