"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/app/utils/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/app/utils/firebaseErrors";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/config";

// Password Strength Component
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthText = (strength: number): string => {
    if (password.length === 0) return '';
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = (strength: number): string => {
    if (password.length === 0) return 'bg-[#AFD3E2]';
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-orange-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    if (strength === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const strength = calculateStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="mt-1">
      <div className="flex h-1 w-full space-x-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-full w-1/5 rounded-full transition-colors duration-300 ${
              index < strength + 1 ? strengthColor : 'bg-[#AFD3E2]/30'
            }`}
          />
        ))}
      </div>
      {password.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <div className={`h-2 w-2 rounded-full ${strengthColor}`} />
          <span className="text-[#146C94]/70">
            Password Strength: <span className="text-[#146C94]">{strengthText}</span>
          </span>
        </div>
      )}
      {password.length > 0 && (
        <ul className="mt-2 text-xs space-y-1 text-[#146C94]/70">
          <li className={password.length >= 8 ? "text-green-500" : ""}>
            • Minimum 8 characters
          </li>
          <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
            • At least one uppercase letter
          </li>
          <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
            • At least one lowercase letter
          </li>
          <li className={/\d/.test(password) ? "text-green-500" : ""}>
            • At least one number
          </li>
          <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-500" : ""}>
            • At least one special character
          </li>
        </ul>
      )}
    </div>
  );
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: formData.role,
      });
      switch (formData.role) {
        case "patient":
          router.push("/patients");
          break;
        case "therapist":
          router.push("/therapists");
          break;
        default:
          router.push("/");
          break;
    } 
  }
    catch (error) {
      console.error("Error during sign up:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Section - Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        {/* Logo container */}
        <div className="flex justify-center lg:justify-start w-full">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo/therapyAI-black.png" 
              alt="therapyAI Logo" 
              width={100} 
              height={100} 
              className="max-h-10 w-auto"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-[#146C94]">Create an account</h1>
                <p className="text-balance text-sm text-[#146C94]/70">
                  Enter your details below to create your account
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full cursor-not-allowed opacity-60 border-[#AFD3E2]" disabled>
                    <Image
                      src="/images/icons/google.png"
                      alt="Google icon"
                      width={20}
                      height={20}
                      className="mr-2 h-5 w-5"
                    />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full cursor-not-allowed opacity-60 border-[#AFD3E2]" disabled>
                    <Image
                      src="/images/icons/apple.png"
                      alt="Apple icon"
                      width={20}
                      height={20}
                      className="mr-2 h-5 w-5"
                    />
                    Apple
                  </Button>
                </div>

                <div className="relative text-center text-sm">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#AFD3E2]"></div>
                  </div>
                  <div className="relative flex justify-center text-[#146C94]/70">
                    <span className="bg-white px-2">Or continue with email</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-[#146C94]">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="border-[#AFD3E2] focus:border-[#146C94] text-[#146C94]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName" className="text-[#146C94]">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="border-[#AFD3E2] focus:border-[#146C94] text-[#146C94]"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[#146C94]">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                    className="border-[#AFD3E2] focus:border-[#146C94] text-[#146C94] placeholder:text-[#146C94]/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[#146C94]">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="border-[#AFD3E2] focus:border-[#146C94] text-[#146C94] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-[#146C94]/70 hover:text-[#146C94]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <PasswordStrength password={formData.password} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-[#146C94]">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="border-[#AFD3E2] focus:border-[#146C94] text-[#146C94] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-[#146C94]/70 hover:text-[#146C94]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#AFD3E2] text-[#146C94] hover:bg-[#146C94] hover:text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </div>

              <div className="text-center text-sm text-[#146C94]/70">
                Already have an account?{" "}
                <Link 
                  href="/signin" 
                  className="text-[#146C94] underline underline-offset-4 hover:text-[#146C94]/80"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Image with Text Overlay */}
      <div className="relative hidden lg:block bg-gradient-to-br from-[#146C94] to-[#AFD3E2]">
        <div className="absolute inset-0 bg-[#146C94]/50">
          <Image
            src="/images/mockup/1.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
        </div>
        
        {/* Welcome Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-16">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Join Our Community of Patients
            </h1>
            <p className="text-[#F6F1F1] text-lg">
              Create an account to start receiving better mental healthcare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;