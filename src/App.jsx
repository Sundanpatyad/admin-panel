import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Leave from "./pages/Leave";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

function AppContent() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/" &&
    !location.pathname.match(/^\/(candidates|employees|attendance|leaves)$/)
  ) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthPage ? (
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/candidates" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/candidates"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <EmployeeAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves"
              element={
                <ProtectedRoute>
                  <Leave />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
