"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      await signInWithEmailAndPassword(
        auth,
        String(form.get("email")),
        String(form.get("password")),
      );
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const messages: Record<string, string> = {
          "auth/invalid-credential": "The email or password is incorrect.",
          "auth/user-not-found": "No Firebase Authentication user exists for this email.",
          "auth/wrong-password": "The password is incorrect.",
          "auth/operation-not-allowed": "Email/Password sign-in is not enabled in Firebase.",
          "auth/network-request-failed": "Unable to connect to Firebase. Check your internet connection.",
          "auth/too-many-requests": "Too many login attempts. Please try again later.",
        };
        window.alert(messages[error.code] ?? `Firebase login failed: ${error.code}`);
        return;
      }
      window.alert("Unable to log in.");
    }
  }

  return (
    <main className="login-page">
      <header className="login-header"><span className="brand">float</span></header>
      <section className="login-panel">
        <form className="login-card" onSubmit={login}>
          <div className="login-mark">float</div>
          <input aria-label="Email" name="email" required type="email" placeholder="EMAIL" />
          <input aria-label="Password" name="password" required type="password" placeholder="PASSWORD" />
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
