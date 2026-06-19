import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";
import PageTransition from "../../components/PageTransition.jsx";

// Form validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/events");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid email or password");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center relative overflow-hidden px-4 py-12">
        {/* Blurred gradient blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />

        <Card className="bg-white/5 border-white/10 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl relative z-10">
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-0 space-y-4">
              {/* Email input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
                )}
              </div>

              {/* Password input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                {errors.password && (
                  <span className="text-xs text-red-400 font-medium">{errors.password.message}</span>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-0 mt-6 flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-slate-950 font-black h-11 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer border-none"
              >
                {isLoggingIn ? (
                  "Signing In..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-400">
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-cyan-400 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Login;
