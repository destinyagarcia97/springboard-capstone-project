"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function fetchFavorites() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to view favorites.");
      }

      const response = await fetch(
        "http://localhost:5000/api/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load favorites");
      }

      setFavorites(data.favorites);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(providerId) {
    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/favorites/${providerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove favorite");
      }

      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (favorite) => favorite.provider?._id !== providerId
        )
      );

      setMessage("Favorite removed.");
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <main style={styles.main}>
      <nav style={styles.navbar}>
        <Link href="/" style={styles.logo}>
          CareCompass
        </Link>

        <Link href="/" style={styles.homeLink}>
          Back to Home
        </Link>
      </nav>

      <section style={styles.section}>
        <h1 style={styles.heading}>My Favorites</h1>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        {loading && <p style={styles.status}>Loading favorites...</p>}

        {!loading && !error && favorites.length === 0 && (
          <p style={styles.status}>You have no saved favorites yet.</p>
        )}

        <div style={styles.grid}>
          {favorites.map((favorite) => {
            const provider = favorite.provider;

            if (!provider) {
              return null;
            }

            return (
              <article style={styles.card} key={favorite._id}>
                <h2 style={styles.providerName}>{provider.name}</h2>

                <p style={styles.category}>{provider.category}</p>

                <p>{provider.description}</p>

                <div style={styles.details}>
                  <p>
                    <strong>Location:</strong> {provider.address},{" "}
                    {provider.city}, {provider.state} {provider.zipCode}
                  </p>

                  <p>
                    <strong>Phone:</strong> {provider.phone}
                  </p>

                  <p>
                    <strong>Medicaid:</strong>{" "}
                    {provider.acceptsMedicaid
                      ? "Accepted"
                      : "Not accepted"}
                  </p>

                  <p>
                    <strong>Medicare:</strong>{" "}
                    {provider.acceptsMedicare
                      ? "Accepted"
                      : "Not accepted"}
                  </p>
                </div>

                {provider.services?.length > 0 && (
                  <div>
                    <strong>Services:</strong>

                    <ul style={styles.list}>
                      {provider.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeFavorite(provider._id)}
                >
                  Remove Favorite
                </button>
              </article>
            );
          })}
        </div>
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

  homeLink: {
    color: "#1d4ed8",
    fontWeight: "bold",
    textDecoration: "none",
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  heading: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#1d4ed8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "24px",
  },

  card: {
    padding: "24px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },

  providerName: {
    marginBottom: "8px",
    color: "#1d4ed8",
  },

  category: {
    marginBottom: "14px",
    color: "#475569",
    fontWeight: "bold",
  },

  details: {
    margin: "18px 0",
    lineHeight: "1.7",
  },

  list: {
    marginTop: "8px",
    paddingLeft: "20px",
  },

  removeButton: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  success: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#15803d",
    fontWeight: "bold",
  },

  error: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#dc2626",
    fontWeight: "bold",
  },

  status: {
    textAlign: "center",
  },
};