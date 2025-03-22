"use client";
import { useSession } from "next-auth/react";
import { LoginForm } from "@/components/login-form";
import Home from "./Home";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main>
      {session && (
        <div>
          <Home/>          
        </div>
      )}
      {!session && (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      )}
    </main>
  );
}
