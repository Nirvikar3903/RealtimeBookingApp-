import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { User as UserIcon, Mail, Lock, Calendar, Phone, Loader2, Save } from "lucide-react";
import { useUpdateProfileMutation } from "../store/api/eventApi.js";
import useAuth from "../hooks/useAuth.js";
import { setCredentials } from "../store/slices/authSlice.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import PageTransition from "../components/PageTransition.jsx";

// Validation schema for profile form
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number (must be 10-15 digits, e.g., +12345678900)"),
  birthdate: z.string().min(1, "Birthdate is required").refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date < new Date();
  }, { message: "Birthdate must be a valid date in the past" }),
  password: z.string().transform((val) => val === "" ? undefined : val).optional(),
}).refine((data) => {
  if (data.password !== undefined && data.password.length < 6) {
    return false;
  }
  return true;
}, {
  message: "Password must be at least 6 characters",
  path: ["password"]
});

const Profile = () => {
  const { user, token } = useAuth();
  const dispatch = useDispatch();

  // RTK Query endpoint
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthdate: "",
      password: "",
    },
  });

  // Populate form values when user details load
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      if (user.birthdate) {
        const dateStr = typeof user.birthdate === "string"
          ? user.birthdate
          : new Date(user.birthdate).toISOString();
        setValue("birthdate", dateStr.split("T")[0]);
      } else {
        setValue("birthdate", "");
      }
    }
  }, [user, setValue]);

  // Handle profile form submit
  const onSubmit = async (data) => {
    try {
      const submitData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthdate: data.birthdate,
      };
      if (data.password) {
        submitData.password = data.password;
      }

      const result = await updateProfile(submitData).unwrap();
      
      // Update Redux state with all properties returned from backend
      dispatch(
        setCredentials({
          user: {
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone,
            birthdate: result.user.birthdate,
          },
          token, // Preserve active token
        })
      );
      
      toast.success("Profile updated successfully!");
      setValue("password", ""); // Clear password input
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || "Failed to update profile");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12 select-none">
        
        {/* Header Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
            My Profile
          </h1>
          <p className="text-slate-400 mt-1.5 text-sm">
            Manage your personal details and secure credentials here.
          </p>
        </div>

        {/* Focused Card Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            <CardHeader className="p-0 mb-8 text-left">
              <CardTitle className="text-xl font-bold text-slate-100 uppercase tracking-wide">
                Account Information
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-1">
                Keep your details updated to receive notifications and tickets
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-0 space-y-6">
                
                {/* 2-Column Grid for Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name")}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
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

                  {/* Phone Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="+12345678900"
                        {...register("phone")}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-xs text-red-400 font-medium">{errors.phone.message}</span>
                    )}
                  </div>

                  {/* Birthdate Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      Birthdate
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        type="date"
                        {...register("birthdate")}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                      />
                    </div>
                    {errors.birthdate && (
                      <span className="text-xs text-red-400 font-medium">{errors.birthdate.message}</span>
                    )}
                  </div>

                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      New Password
                    </label>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wide font-bold">Optional</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Leave blank to keep same"
                      {...register("password")}
                      className="w-full bg-[#0f1422] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                  {errors.password && (
                    <span className="text-xs text-red-400 font-medium">{errors.password.message}</span>
                  )}
                </div>

              </CardContent>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-slate-950 font-black h-11 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer border-none flex items-center justify-center gap-2 rounded-xl"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Updates...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;

