import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      setError("Invalid email or password.");

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <div className="logo-icon">S</div>
          <span>StudentAI</span>
        </div>


        <div className="auth-heading">
          <h1>Welcome back</h1>

          <p>
            Sign in to view your performance dashboard.
          </p>
        </div>


        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>


        <p className="auth-switch">

          Don't have an account?{" "}

          <Link to="/signup">
            Create account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;