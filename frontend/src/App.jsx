import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AcademicData from "./pages/AcademicData";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* DEFAULT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ACADEMIC DATA */}

        <Route
          path="/academic-data"
          element={
            <ProtectedRoute>
              <AcademicData />
            </ProtectedRoute>
          }
        />


        {/* ML ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />


        {/* UNKNOWN ROUTES */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;