import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.tmdb_id}`}>
      <div className="border rounded-lg p-2 hover:scale-105 transition">
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} />
        ) : (
          <div>No Image</div>
        )}

        <p className="text-sm mt-2 line-clamp-2">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}