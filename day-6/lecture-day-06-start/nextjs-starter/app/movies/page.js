import Link from "next/link";
import { getMovies } from "../../data/movies";
import LikeButton from "./LikeButton";

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-widest text-black/50">
          Studio Ghibli collection
        </p>
        <h1 className="text-4xl font-bold">Movies</h1>
        <p className="mt-3 text-lg text-black/65">
          Explore {movies.length} films, directors, stories, and scores.
        </p>
      </header>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <li className="flex flex-col rounded-xl border border-black/10 p-5" key={movie.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-black/50">{movie.release_date}</p>
                <h2 className="mt-1 text-xl font-semibold">{movie.title}</h2>
              </div>
              <LikeButton />
            </div>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-black/65">
              {movie.description}
            </p>
            <Link className="mt-5 text-sm font-semibold underline" href={`/movies/${movie.id}`}>
              View details
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}