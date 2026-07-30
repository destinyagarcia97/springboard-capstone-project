"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const [providers, setProviders] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function fetchProviders(searchCity = city, searchCategory = category) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchCity) {
        params.append("city", searchCity);
      }

      if (searchCategory) {
        params.append("category", searchCategory);
      }

      const url = `${API_URL}/api/providers${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load providers");
      }

      setProviders(data.providers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(Boolean(token));
    fetchProviders("", "");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetchProviders();
  }

  function clearFilters() {
    setCity("");
    setCategory("");
    fetchProviders("", "");
  }

  async function addFavorite(providerId) {
    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in before saving favorites.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/favorites/${providerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save favorite");
      }

      setMessage("Provider saved to favorites.");
    } catch (error) {
      setError(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMessage("You have been logged out.");
  }

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          CareCompass
        </Link>

        <div className={styles.navLinks}>
          {isLoggedIn ? (
            <>
              <Link href="/favorites">My Favorites</Link>

              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <section className={styles.hero}>
        <h1>CareCompass</h1>

        <p>
          Find healthcare and community support providers that match your needs.
        </p>
      </section>

      <section className={styles.searchSection}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search by city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          <input
            type="text"
            placeholder="Search by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <button type="submit">Search</button>

          <button
            type="button"
            className={styles.clearButton}
            onClick={clearFilters}
          >
            Clear
          </button>
        </form>
      </section>

      <section className={styles.providerSection}>
        <h2>Available Providers</h2>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p className={styles.status}>Loading providers...</p>}

        {!loading && !error && providers.length === 0 && (
          <p className={styles.status}>No providers found.</p>
        )}

        <div className={styles.providerGrid}>
          {providers.map((provider) => (
            <article className={styles.card} key={provider._id}>
              <h3>{provider.name}</h3>

              <p className={styles.category}>{provider.category}</p>

              <p>{provider.description}</p>

              <div className={styles.details}>
                <p>
                  <strong>Location:</strong> {provider.address},{" "}
                  {provider.city}, {provider.state} {provider.zipCode}
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
              </div>

              {provider.services?.length > 0 && (
                <div className={styles.listSection}>
                  <strong>Services:</strong>

                  <ul>
                    {provider.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}

              {provider.languages?.length > 0 && (
                <p>
                  <strong>Languages:</strong>{" "}
                  {provider.languages.join(", ")}
                </p>
              )}

              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  Visit Website
                </a>
              )}

              <Link
                href={`/providers/${provider._id}`}
                className={styles.detailsButton}
              >
                View Details
              </Link>

              <button
                type="button"
                className={styles.favoriteButton}
                onClick={() => addFavorite(provider._id)}
              >
                Save to Favorites
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}