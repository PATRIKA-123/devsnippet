import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, LogOut, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useSnippets } from "../hooks/useSnippets";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { data: snippets } = useSnippets();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalSnippets = snippets?.length || 0;
  const favoritesCount = snippets?.filter((s) => s.isFavorite).length || 0;
  const publicCount = snippets?.filter((s) => s.isPublic).length || 0;
  const languageCounts = snippets?.reduce((acc, s) => {
    acc[s.language] = (acc[s.language] || 0) + 1;
    return acc;
  }, {});
  const topLanguages = Object.entries(languageCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
            {user?.name?.[0]?.toUpperCase() || <User size={28} />}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
              <Mail size={14} /> {user?.email}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalSnippets}</p>
          <p className="text-gray-400 text-xs mt-1">Total Snippets</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{favoritesCount}</p>
          <p className="text-gray-400 text-xs mt-1">Favorites</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{publicCount}</p>
          <p className="text-gray-400 text-xs mt-1">Public</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Code2 size={18} className="text-blue-400" /> Top Languages
        </h3>
        {topLanguages.length === 0 ? (
          <p className="text-gray-500 text-sm">No snippets yet.</p>
        ) : (
          <div className="space-y-2">
            {topLanguages.map(([lang, count]) => (
              <div key={lang} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm uppercase">{lang}</span>
                <span className="text-gray-500 text-xs">{count} snippet{count !== 1 ? "s" : ""}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium"
      >
        <LogOut size={16} /> Log out
      </button>
    </div>
  );
}

export default Profile;