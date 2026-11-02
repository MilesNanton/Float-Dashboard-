"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const stats = [
  "Total floats created",
  "Total essay floats",
  "Total book floats",
  "Total anything floats",
];

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/");
      return;
    }
    setCheckingAuth(false);
  }), [router]);

  if (checkingAuth) return null;

  return (
    <main className="floats-page">
      <section className="floats-shell">
        <header className="floats-header">float</header>
        <div className="floats-content">
          <nav className="floats-tabs" aria-label="Dashboard sections">
            <button className="selected" type="button">All floats</button>
            <button type="button">Universities</button>
            <button type="button">Students</button>
          </nav>
          <section className="float-stats">
            {stats.map((label) => (
              <article key={label}>
                <p>{label}</p>
                <strong>3,495</strong>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
