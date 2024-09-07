"use client";
import LoginForm from "@/components/loginForm";
// import Image from "next/image";

export default function Login() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <LoginForm
        onLogin={() => {
          alert("Logged in");
        }}
      />
    </main>
  );
}
