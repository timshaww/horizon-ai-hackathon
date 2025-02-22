"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import FooterLanding from "@/components/footer/footer-landing";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import LogoMarquee from './componenets/CompanySection';
import SuccessDialog from './componenets/SuccessDialogSection';
import NavbarWaitlist from '@/components/navbar/navbar-landing';
import TestimonialSection from './componenets/TestimonialSection';

import { useToast } from '@/hooks/use-toast';

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

interface FormData {
  fullName: string;
  email: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

const LandingPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!validateName(formData.fullName)) {
      errors.fullName = 'Please enter a valid name (2-50 characters)';
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSubmittedEmail(formData.email);
      setDialogOpen(true);
      setFormData({ fullName: '', email: '' });
      
      toast({
        title: "Welcome to TherapyAI! 🎉",
        description: "Check your email for confirmation and next steps.",
        variant: "default",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support if the issue persists.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <NavbarWaitlist />

      <main className="relative pt-32 md:pt-40 pb-10 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AFD3E2] mb-8"
            >
              <Star className="w-4 h-4 text-[#146C94]" />
              <span className="text-[#146C94] text-sm font-medium">
                Transform Your Mental Health Practice
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-[#146C94]">
                  Stay present in 
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#146C94] via-[#AFD3E2] to-[#146C94]",
                    pacifico.className
                  )}
                >
                  every session
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-lg text-[#146C94] mb-12 leading-relaxed max-w-xl mx-auto">
                Enhance your therapy sessions with AI-powered summaries. Save time on documentation, focus more on your patients, and deliver better care with intelligent session insights.
              </p>
            </motion.div>

            {/* Form Section */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={cn(
                        "w-full px-6 py-4 rounded-xl bg-white border text-[#146C94] placeholder-[#146C94]/60 focus:outline-none focus:ring-2 transition-all duration-200",
                        formErrors.fullName 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-[#AFD3E2] focus:border-[#146C94] focus:ring-[#AFD3E2]"
                      )}
                      disabled={isLoading}
                    />
                    <AnimatePresence>
                      {formErrors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 text-left"
                        >
                          {formErrors.fullName}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your professional email"
                      className={cn(
                        "w-full px-6 py-4 rounded-xl bg-white border text-[#146C94] placeholder-[#146C94]/60 focus:outline-none focus:ring-2 transition-all duration-200",
                        formErrors.email 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                          : "border-[#AFD3E2] focus:border-[#146C94] focus:ring-[#AFD3E2]"
                      )}
                      disabled={isLoading}
                    />
                    <AnimatePresence>
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 text-left"
                        >
                          {formErrors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="group bg-[#AFD3E2] text-[#146C94] px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#146C94] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-[#146C94]/70 text-sm">
                Try TherapyAI free for 14 days. No credit card required. HIPAA compliant.
              </p>
            </motion.div>
          </div>

          {/* Additional Sections */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <LogoMarquee />
          </motion.div>
        </div>

        {/* Content Sections */}
        <section className="space-y-32 mt-32">
          <TestimonialSection />
        </section>
      </main>

      <FooterLanding />
      
      <SuccessDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        email={submittedEmail}
      />
    </div>
  );
};


export default LandingPage;