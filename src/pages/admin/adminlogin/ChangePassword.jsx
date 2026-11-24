import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../../assets/images/logoremove.png";
import bgImage from "../../../assets/images/bk3.jpg";
import { changeAdminPassword, warmAdminApi } from "../../../api/authApi";

const initialFields = { userName: "", currentPassword: "", newPassword: "", confirmPassword: "" };
const passwordFields = [
  ["currentPassword", "Current Password", "current-password"],
  ["newPassword", "New Password", "new-password"],
  ["confirmPassword", "Confirm New Password", "new-password"],
];

export default function ChangePassword() {
  const [fields, setFields] = useState(initialFields);
  const [visible, setVisible] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inProgress = useRef(false);
  const navigate = useNavigate();

  useEffect(() => { void warmAdminApi(); }, []);

  const update = (key, value) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inProgress.current) return;
    if (Object.values(fields).some((value) => value.length === 0)) {
      setError("All fields are required.");
      return;
    }
    if (fields.newPassword !== fields.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (new TextEncoder().encode(fields.newPassword).length > 72) {
      setError("New password must be no more than 72 UTF-8 bytes.");
      return;
    }

    inProgress.current = true;
    setLoading(true);
    setError("");
    try {
      const result = await changeAdminPassword(fields.userName, fields.currentPassword, fields.newPassword, fields.confirmPassword);
      setSuccess(result.message || "Password updated successfully. Redirecting to login…");
      toast.success("Password updated successfully");
      ["adminToken", "adminUser", "adminLoginAt"].forEach((key) => localStorage.removeItem(key));
      setFields(initialFields);
      window.setTimeout(() => navigate("/adminlogin", { replace: true }), 1400);
    } catch (err) {
      const message = err.message || "Unable to update password. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      inProgress.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen min-h-[100svh] items-center justify-center bg-cover bg-center px-4 py-8 text-gray-800" style={{ backgroundImage: `url(${bgImage})` }}>
      <div aria-hidden="true" className="absolute inset-0 bg-slate-950/20" />
      <section aria-labelledby="change-password-title" className="relative w-full max-w-[480px] rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-8">
        <img src={logo} alt="TechnovaHub — Empowering Minds" className="mx-auto mb-5 h-24 w-52 object-contain sm:h-28 sm:w-56" />
        <h1 id="change-password-title" className="text-center text-2xl font-bold text-slate-900">Change Password</h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-600">Verify your current credentials to set a new password.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-busy={loading}>
          <div className="relative">
            <label htmlFor="change-username" className="sr-only">Username</label>
            <AiOutlineUser aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={21} />
            <input id="change-username" name="userName" autoComplete="username" type="text" value={fields.userName} onChange={(e) => update("userName", e.target.value)} placeholder="Enter admin username" required className="block h-14 w-full rounded-xl border border-gray-300 bg-white/95 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15" />
          </div>
          {passwordFields.map(([key, label, autoComplete]) => (
            <div className="relative" key={key}>
              <label htmlFor={`change-${key}`} className="sr-only">{label}</label>
              <AiOutlineLock aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={21} />
              <input id={`change-${key}`} name={key} autoComplete={autoComplete} type={visible[key] ? "text" : "password"} value={fields[key]} onChange={(e) => update(key, e.target.value)} placeholder={label} required className="block h-14 w-full rounded-xl border border-gray-300 bg-white/95 pl-12 pr-14 text-gray-800 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15" />
              <button type="button" aria-label={`${visible[key] ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={Boolean(visible[key])} aria-controls={`change-${key}`} onClick={() => setVisible((previous) => ({ ...previous, [key]: !previous[key] }))} className="absolute inset-y-0 right-1 my-auto flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                {visible[key] ? <AiOutlineEyeInvisible aria-hidden="true" size={21} /> : <AiOutlineEye aria-hidden="true" size={21} />}
              </button>
            </div>
          ))}
          <p className="text-xs text-slate-500">Tip: a longer, unique password is harder to guess.</p>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {success && <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}
          <button type="submit" disabled={loading} className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 font-semibold text-white shadow-lg shadow-blue-600/15 transition-colors hover:from-blue-700 hover:to-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60">
            {loading && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {loading ? "Updating password…" : "Update Password"}
          </button>
        </form>
        <div className="mt-5 text-center">
          <Link to="/adminlogin" className="rounded text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">← Back to Login</Link>
        </div>
      </section>
    </main>
  );
}
