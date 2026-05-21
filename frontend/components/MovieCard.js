import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.tmdb_id}`}>
      <div className="border rounded-lg p-2 hover:scale-105 transition h-full">
        {movie.poster_url ? (
          <img className="w-full aspect-[2/3] object-cover rounded" src={movie.poster_url} alt={movie.title} />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
            {movie.title}
          </div>
        )}

        <p className="text-sm mt-2 line-clamp-2">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}