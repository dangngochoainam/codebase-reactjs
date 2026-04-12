import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useAuthDispatch } from "@/core/auth/hooks/useAuthDispatch";
import { AuthActionType } from "@/core/auth/types";
import { MONO } from "@/core/lib/utils/styles";

export default function WelcomeView() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const authDispatch = useAuthDispatch();

  const handleSignOut = async () => {
    try {
      await signOut();
      authDispatch({ type: AuthActionType.SIGN_OUT });
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #07080d 0%, #0c0d19 60%, #080b12 100%)" }}
    >
      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(78,91,224,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-8 left-8 w-10 h-10"
        style={{
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          borderTop: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute top-8 right-8 w-10 h-10"
        style={{
          borderRight: "1px solid rgba(201,168,76,0.3)",
          borderTop: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 left-8 w-10 h-10"
        style={{
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-10 h-10"
        style={{
          borderRight: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-8 max-w-xl w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <div className="h-px w-10" style={{ background: "#c9a84c" }} />
          <span
            style={{
              ...MONO,
              fontSize: "10px",
              letterSpacing: "0.45em",
              color: "#c9a84c",
              textTransform: "uppercase",
            }}
          >
            Feature-based React
          </span>
          <div className="h-px w-10" style={{ background: "#c9a84c" }} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 400,
              color: "#eee9f0",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Welcome to the
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 700,
              color: "#eee9f0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Project
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="flex-1 h-px" style={{ background: "#1e1f30" }} />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: "#c9a84c" }}
          />
          <div className="flex-1 h-px" style={{ background: "#1e1f30" }} />
        </div>

        {/* Actions */}
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={() => navigate("/products")}
              className="flex-1 py-3 px-6 text-[#c9a84c] border border-[#c9a84c] bg-transparent hover:bg-[#c9a84c] hover:text-[#07080d] transition-all duration-200"
              style={{
                ...MONO,
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Products
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 py-3 px-6 text-[#8a8898] border border-[#252638] bg-transparent hover:border-[#8a8898] hover:text-[#eee9f0] transition-all duration-200"
              style={{
                ...MONO,
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <Link
              to="/signin"
              className="flex-1 py-3 px-6 text-center text-[#c9a84c] border border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#07080d] transition-all duration-200"
              style={{
                ...MONO,
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex-1 py-3 px-6 text-center text-[#8a8898] border border-[#252638] hover:border-[#8a8898] hover:text-[#eee9f0] transition-all duration-200"
              style={{
                ...MONO,
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Version tag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: "#484858",
            textTransform: "uppercase",
          }}
        >
          v1.0.0
        </span>
      </div>
    </div>
  );
}
