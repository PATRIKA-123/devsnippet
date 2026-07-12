import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicSnippet from "./pages/PublicSnippet";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import RecentlyUsed from "./pages/RecentlyUsed";
import AppLayout from "./components/layout/AppLayout";
import useAuthStore from "./store/authStore";

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share/:shareId" element={<PublicSnippet />} />

        {/* Protected routes — all nested under AppLayout (Navbar + Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="recent" element={<RecentlyUsed />} />
          {/* Future nested routes will go here, e.g.: */}
          {/* <Route path="collections/:id" element={<CollectionView />} /> */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;