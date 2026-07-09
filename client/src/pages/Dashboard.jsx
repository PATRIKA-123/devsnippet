import { useState } from "react";
import { Plus, LogOut, Search } from "lucide-react";
import { useSnippets } from "../hooks/useSnippets";
import SnippetCard from "../components/snippet/SnippetCard";
import SnippetForm from "../components/snippet/SnippetForm";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const { data: snippets, isLoading } = useSnippets({
    search: search || undefined,
    language: languageFilter || undefined,
  });

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Navbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Hi, {user?.name} 👋</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <Plus size={18} /> New Snippet
          </button>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
        >
          <option value="">All languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : snippets?.length === 0 ? (
        <p className="text-gray-400">No snippets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets?.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      )}

      {showForm && <SnippetForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Dashboard;