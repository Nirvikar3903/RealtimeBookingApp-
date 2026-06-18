import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";

// Form validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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
      toast.success("Successfully logged in!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || "Invalid email or password");
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md w-full max-w-md mx-auto my-12">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-black text-slate-100">Welcome Back</CardTitle>
        <CardDescription className="text-slate-400">
          Enter your details to sign in and book your tickets
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-400 font-medium">{errors.password.message}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold h-11 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
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
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-cyan-400 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
