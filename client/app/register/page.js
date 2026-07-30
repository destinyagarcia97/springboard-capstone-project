"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
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
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage("Registration successful!");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create an Account</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

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
            minLength="6"
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.link}>
            Login
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

  success: {
    marginTop: "16px",
    textAlign: "center",
    color: "#15803d",
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