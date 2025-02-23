"use client";

import React from "react";
import Link from "next/link";
import NavbarLanding from "@/components/navbar/navbar-landing";
import FooterDashboard from "@/components/footer/footer-landing";
import { Button } from "@/components/ui/button";

const PatientsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLanding />
      
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#146C94]">
              For Patients
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-[#146C94]/70">
              Discover a new way to take control of your mental health with TherapyAI. Our platform empowers you to manage your wellness journey with ease—from scheduling sessions to reviewing session insights.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Benefits Section */}
            <div className="max-w-md text-left">
              <h2 className="text-2xl font-semibold text-[#146C94]">
                Your Wellness, Simplified
              </h2>
              <ul className="mt-4 list-disc space-y-3 text-lg text-[#146C94]">
                <li>
                  <strong>Upcoming Appointments:</strong> Keep track of your future sessions at a glance.
                </li>
                <li>
                  <strong>Past Session Insights:</strong> Revisit personalized session recaps to monitor your progress.
                </li>
                <li>
                  <strong>Curated Journaling Prompts:</strong> Receive customized journaling prompts based on your session insights.
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup-patient">
                  <Button className="bg-[#146C94] text-white hover:bg-[#0f4c70]">
                    Start Your Wellness Journey
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Section */}
            <div className="max-w-md">
              <img
                src="/images/mockup/patient-dashboard.png" 
                alt="Patient Dashboard Preview" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>

      <FooterDashboard />
    </div>
  );
};

export default PatientsPage;