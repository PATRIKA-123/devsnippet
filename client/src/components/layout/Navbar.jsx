import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Search, LogOut, User } from "lucide-react";
import useAuthStore from "../../store/authStore";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-gray-900/60 backdrop-blur-md sticky top-0 z-40 shadow-lg shadow-black/20 transition-all">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
        <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
          <Code2 size={20} className="text-blue-400" />
        </div>
        <span>DevSnippets</span>
      </div>

      {/* Glass Search Bar */}
      <button
        onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
        className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 px-3.5 py-1.5 rounded-full text-sm transition-all shadow-inner w-64 backdrop-blur-sm group"
      >
        <Search size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
        <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Search snippets...</span>
        <kbd className="ml-auto text-[10px] font-semibold bg-white/10 text-gray-300 border border-white/10 px-1.5 py-0.5 rounded shadow-sm">
          ⌘K
        </kbd>
      </button>

      {/* User Menu Trigger */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 border border-white/20 flex items-center justify-center text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
            {user?.name?.[0]?.toUpperCase() || <User size={16} />}
          </div>
        </button>

        {/* Glass Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-3 w-52 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-2.5 text-xs font-semibold text-gray-400 border-b border-white/10 truncate">
              {user?.name || "User"}
            </div>
            
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/dashboard/profile");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/10 flex items-center gap-2.5 transition-colors"
            >
              <User size={15} className="text-gray-400" /> View Profile
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2.5 transition-colors border-t border-white/5"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;