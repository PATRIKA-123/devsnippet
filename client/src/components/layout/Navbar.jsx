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
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900 sticky top-0 z-40">
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <Code2 size={22} className="text-blue-400" />
        DevSnippets
      </div>

      <button
        onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
        className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-full text-sm transition shadow-sm shadow-black/10 w-64"
      >
        <Search size={16} />
        <span>Search snippets...</span>
        <kbd className="ml-auto text-xs bg-gray-700 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold">
            {user?.name?.[0]?.toUpperCase() || <User size={16} />}
          </div>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1">
            <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
              {user?.name}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;