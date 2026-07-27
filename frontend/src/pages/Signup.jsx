import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // 1. Create user in Firebase Authentication
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // 2. Store student information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        course: "BTech AIML",
        semester: 3,
        createdAt: serverTimestamp(),
      });

      // 3. Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.message);

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
          <h1>Create your account</h1>
          <p>
            Start tracking and improving your academic performance.
          </p>
        </div>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
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
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}

          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;