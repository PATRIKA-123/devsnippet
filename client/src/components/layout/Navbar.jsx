import { useState, useEffect } from "react";
import { Moon, Sun, Code2 } from "lucide-react";

function Navbar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <Code2 size={20} className="text-blue-400" />
        DevSnippets
      </div>
      <button onClick={() => setDark(!dark)} className="text-gray-400 hover:text-white">
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}

export default Navbar;
