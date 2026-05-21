import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {movies?.map((m) => (
        <MovieCard key={m.tmdb_id} movie={m} />
      ))}
    </div>
  );
}