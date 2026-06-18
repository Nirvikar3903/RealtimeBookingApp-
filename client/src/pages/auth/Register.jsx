import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { toast } from "sonner";
import { User, Mail, Lock, UserPlus } from "lucide-react";

// Form validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const { register: registerUser, isRegistering } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Registration successful! Please sign in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md w-full max-w-md mx-auto my-12">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-black text-slate-100">Create Account</CardTitle>
        <CardDescription className="text-slate-400">
          Get started with SortMyScene today
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Name input */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>
            )}
          </div>

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
            disabled={isRegistering}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold h-11 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            {isRegistering ? (
              "Registering..."
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </>
            )}
          </Button>

          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-cyan-400 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
