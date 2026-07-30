"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login to CareCompass</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.bottomText}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={styles.link}>
            Register
          </Link>
        </p>

        <Link href="/" style={styles.homeLink}>
          Return home
        </Link>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#f4f7f9",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    padding: "35px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0, 0, 0, 0.1)",
  },

  heading: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#1d4ed8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "16px",
  },

  button: {
    padding: "13px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    marginTop: "16px",
    textAlign: "center",
    color: "#dc2626",
  },

  bottomText: {
    marginTop: "22px",
    textAlign: "center",
  },

  link: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  homeLink: {
    display: "block",
    marginTop: "14px",
    textAlign: "center",
    color: "#475569",
  },
};