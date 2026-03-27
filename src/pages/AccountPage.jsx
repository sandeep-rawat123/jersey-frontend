import { useState } from "react";

export default function AccountPage({ isAuthenticated, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert(`Login successful for ${emailOrMobile}.`);
    } else {
      alert(`Signup successful for ${emailOrMobile}.`);
    }

    onAuthSuccess?.();
    setEmailOrMobile("");
    setPassword("");
  };

  return (
    <div className="account-page">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {isAuthenticated && <p className="subtitle">You are already signed in.</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email or Mobile Number
            <input
              type="text"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="example@mail.com or +1234567890"
              required
              disabled={isAuthenticated}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isAuthenticated}
            />
          </label>

          {!isLogin && (
            <label>
              Confirm Password
              <input
                type="password"
                placeholder="••••••••"
                required
                disabled={isAuthenticated}
              />
            </label>
          )}

          <button type="submit" className="auth-btn" disabled={isAuthenticated}>
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && (
            <p className="subtitle">Forgot password? <a href="#" onClick={(e) => e.preventDefault()}>Reset here</a></p>
          )}
        </form>

        <button className="toggle-auth" onClick={() => setIsLogin((v) => !v)}>
          {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
}
