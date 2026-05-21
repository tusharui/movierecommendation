import { apiGet } from "../../../lib/api";

export default async function MovieDetails({ params }) {
  const { id } = await params;

  const [movie, genreRecs] = await Promise.all([
    apiGet(`/movie/id/${id}`),
    apiGet("/recommend/genre", { tmdb_id: id, limit: 12 }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{movie.title}</h1>

      <div className="flex gap-6 mt-4">
        {movie.poster_url && (
          <img className="w-64" src={movie.poster_url} alt={movie.title} />
        )}

        <div>
          <p>{movie.overview}</p>
          <p className="mt-2 text-gray-500">
            Release: {movie.release_date}
          </p>
          <p>Genres: {movie.genres?.map(g => g.name).join(", ")}</p>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-bold">Recommendations</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genreRecs.map((rec) => (
          <a
            key={rec.tmdb_id}
            href={`/movie/${rec.tmdb_id}`}
            className="block"
          >
            {rec.poster_url ? (
              <img
                className="w-full rounded"
                src={rec.poster_url}
                alt={rec.title}
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                {rec.title}
              </div>
            )}
            <p className="mt-1 text-sm font-medium truncate">{rec.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}