import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import logo from "../../../assets/images/logoremove.png";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin, warmAdminApi } from "../../../api/authApi";
import toast from "react-hot-toast";
import bgImage from "../../../assets/images/bk3.jpg";



const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginInProgress = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    void warmAdminApi();
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (loginInProgress.current) return;
    loginInProgress.current = true;
    setLoading(true);

    try {
      const data = await loginAdmin(userName, password);

      if (data.success && data.token) {
        // Store token & user info
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user || { userName }));
        localStorage.setItem("adminLoginAt", String(Date.now()));

        toast.success("Admin Login Successful");

        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed ❌");
    } finally {
      loginInProgress.current = false;
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center bg-cover bg-center px-4 py-8 text-gray-800"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-slate-950/20" />
      <section aria-labelledby="admin-login-title" className="relative w-full max-w-[480px] rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-8">
        <img src={logo} alt="TechnovaHub — Empowering Minds" className="mx-auto mb-6 h-28 w-56 object-contain" />

        <h1 id="admin-login-title" className="text-2xl font-bold text-center text-slate-900">Admin Login</h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-600">Sign in to manage the TechnovaHub dashboard</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5" aria-busy={loading}>
          {/* Username */}
          <div className="relative">
            <label htmlFor="admin-username" className="sr-only">Username</label>
            <AiOutlineUser aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={21} />
            <input
              id="admin-username"
              name="username"
              autoComplete="username"
              type="text"
              value={userName}
             onChange={(e) => setUserName(e.target.value.toLowerCase())}
              placeholder="Enter admin username"
              className="block h-14 w-full rounded-xl border border-gray-300 bg-white/95 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 placeholder:opacity-100 transition-colors focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <AiOutlineLock aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={21} />
            <input
              id="admin-password"
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="block h-14 w-full rounded-xl border border-gray-300 bg-white/95 pl-12 pr-14 text-gray-800 placeholder:text-gray-500 placeholder:opacity-100 transition-colors focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls="admin-password"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-1 my-auto flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {showPassword ? <AiOutlineEyeInvisible aria-hidden="true" size={21} /> : <AiOutlineEye aria-hidden="true" size={21} />}
            </button>
          </div>

          {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 font-semibold text-white shadow-lg shadow-blue-600/15 transition-colors hover:from-blue-700 hover:to-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 rounded text-sm font-medium text-blue-700! hover:text-blue-900! hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
            <span aria-hidden="true">←</span> Back to website
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
