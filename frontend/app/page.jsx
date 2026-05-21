"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("trending");

  useEffect(() => {
    loadHome();
  }, [category]);

  async function loadHome() {
    const data = await apiGet("/home", {
      category,
      limit: 24,
    });
    setMovies(data);
  }

  async function searchMovies(q) {
    if (!q) return loadHome();

    const data = await apiGet("/tmdb/search", {
      query: q,
    });

    if (data?.results) {
      setMovies(
        data.results.map(m => ({
          tmdb_id: m.id,
          title: m.title,
          poster_url: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : null,
        }))
      );
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🎬 Movie Recommender</h1>

      <input
        className="border p-2 mt-3 w-full"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchMovies(e.target.value);
        }}
      />

      <div className="mt-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="trending">Trending</option>
          <option value="popular">Popular</option>
          <option value="top_rated">Top Rated</option>
          <option value="now_playing">Now Playing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <MovieGrid movies={movies} />
    </div>
  );
}