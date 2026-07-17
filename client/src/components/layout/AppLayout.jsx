import { useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchModal from "../shared/SearchModal";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const goNewSnippet = useCallback(() => {
    navigate("/dashboard");
    document.dispatchEvent(new CustomEvent("open-new-snippet"));
  }, [navigate]);

  useKeyboardShortcuts({ onSearch: openSearch, onNewSnippet: goNewSnippet });

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Navbar onSearchClick={openSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default AppLayout;