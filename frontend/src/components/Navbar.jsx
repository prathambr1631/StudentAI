import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";


function Navbar({ student }) {

  const navigate = useNavigate();


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    }

  };


  // =========================
  // STUDENT DISPLAY DATA
  // =========================

  const studentName =
    student?.name || "Student";

  const studentCourse =
    student?.course || "BTech AIML";

  const avatarLetter =
    studentName
      .charAt(0)
      .toUpperCase();


  return (

    <nav className="navbar">


      {/* =========================
          LOGO
      ========================= */}

      <div
        className="logo"
        onClick={() =>
          navigate("/dashboard")
        }
        style={{
          cursor: "pointer",
        }}
      >

        <div className="logo-icon">
          S
        </div>

        <span>
          StudentAI
        </span>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="nav-links">


        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/academic-data"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Academic Data
        </NavLink>


        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Analytics
        </NavLink>


      </div>


      {/* =========================
          PROFILE
      ========================= */}

      <div className="profile">


        <div className="profile-info">

          <strong>
            {studentName}
          </strong>

          <span>
            {studentCourse}
          </span>

        </div>


        <div className="avatar">

          {avatarLetter}

        </div>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>


      </div>


    </nav>

  );
}


export default Navbar;