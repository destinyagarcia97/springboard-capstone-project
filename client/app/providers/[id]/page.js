"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProviderDetailsPage() {
  const params = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProvider() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/providers/${params.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load provider");
        }

        setProvider(data.provider);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProvider();
    }
  }, [params.id]);

  if (loading) {
    return <main style={styles.center}>Loading provider...</main>;
  }

  if (error) {
    return (
      <main style={styles.center}>
        <p style={styles.error}>{error}</p>
        <Link href="/" style={styles.link}>
          Return home
        </Link>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <nav style={styles.navbar}>
        <Link href="/" style={styles.logo}>
          CareCompass
        </Link>

        <Link href="/" style={styles.link}>
          Back to Home
        </Link>
      </nav>

      <section style={styles.section}>
        <article style={styles.card}>
          <h1 style={styles.heading}>{provider.name}</h1>

          <p style={styles.category}>{provider.category}</p>

          <p style={styles.description}>{provider.description}</p>

          <div style={styles.details}>
            <p>
              <strong>Address:</strong> {provider.address}, {provider.city},{" "}
              {provider.state} {provider.zipCode}
            </p>

            <p>
              <strong>Phone:</strong> {provider.phone}
            </p>

            <p>
              <strong>Medicaid:</strong>{" "}
              {provider.acceptsMedicaid ? "Accepted" : "Not accepted"}
            </p>

            <p>
              <strong>Medicare:</strong>{" "}
              {provider.acceptsMedicare ? "Accepted" : "Not accepted"}
            </p>

            {provider.languages?.length > 0 && (
              <p>
                <strong>Languages:</strong> {provider.languages.join(", ")}
              </p>
            )}
          </div>

          {provider.services?.length > 0 && (
            <div style={styles.listSection}>
              <h2>Services</h2>

              <ul style={styles.list}>
                {provider.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          )}

          {provider.website && (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
            >
              Visit Website
            </a>
          )}
        </article>
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#f4f7f9",
    color: "#1f2937",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 30px",
    background: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },

  logo: {
    color: "#1d4ed8",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none",
  },

  link: {
    color: "#1d4ed8",
    fontWeight: "bold",
    textDecoration: "none",
  },

  section: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "50px 20px",
  },

  card: {
    padding: "35px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 5px 18px rgba(0, 0, 0, 0.1)",
  },

  heading: {
    marginBottom: "10px",
    color: "#1d4ed8",
  },

  category: {
    marginBottom: "20px",
    color: "#475569",
    fontWeight: "bold",
  },

  description: {
    fontSize: "17px",
    lineHeight: "1.7",
  },

  details: {
    margin: "25px 0",
    lineHeight: "1.9",
  },

  listSection: {
    marginBottom: "25px",
  },

  list: {
    marginTop: "10px",
    paddingLeft: "22px",
    lineHeight: "1.8",
  },

  button: {
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    background: "#f4f7f9",
  },

  error: {
    color: "#dc2626",
    fontWeight: "bold",
  },
};