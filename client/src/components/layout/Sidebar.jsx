import { NavLink } from "react-router-dom";
import { LayoutGrid, Star, Clock, FolderOpen, Plus } from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition duration-200 ${
      isActive
        ? "bg-blue-600/25 text-blue-300 ring-1 ring-blue-500/30"
        : "text-gray-400 hover:bg-gray-800 hover:text-white hover:ring-1 hover:ring-blue-500/20"
    }`;

  return (
    <aside className="w-56 border-r border-gray-800 bg-gray-900 p-4 flex flex-col gap-1 overflow-y-auto h-full">
      <NavLink to="/dashboard" end className={linkClass}>
        <LayoutGrid size={16} /> All Snippets
      </NavLink>
      <NavLink to="/dashboard/favorites" className={linkClass}>
        <Star size={16} /> Favorites
      </NavLink>
      <NavLink to="/dashboard/recent" className={linkClass}>
        <Clock size={16} /> Recently Used
      </NavLink>

      <div className="mt-6 mb-2 flex items-center justify-between px-3">
        <span className="text-xs uppercase text-gray-500 font-semibold">Collections</span>
        <button className="text-gray-500 hover:text-white transition-colors duration-200">
          <Plus size={14} />
        </button>
      </div>

      {/* Collections list will render here once the feature is built */}
      <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/60 px-3 py-3 text-xs text-gray-500">
        No collections yet
      </div>
    </aside>
  );
}

export default Sidebar;