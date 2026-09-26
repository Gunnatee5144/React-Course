import fallbackMovies from "./movies.json";

const API_URL = "https://ghibliapi.vercel.app/films";

async function requestMovies(path = "") {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Ghibli API returned ${response.status}`);
    }

    return response.json();
  } catch {
    return path ? null : fallbackMovies;
  }
}

export function getMovies() {
  return requestMovies();
}

export async function getMovie(id) {
  const movie = await requestMovies(`/${id}`);

  if (movie) {
    return movie;
  }

  return fallbackMovies.find((item) => item.id === id) ?? null;
}