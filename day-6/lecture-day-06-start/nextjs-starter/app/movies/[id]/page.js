// ⌨️ โครงว่าง — เติมสดในบล็อก 1.4 (dynamic route)
// TODO: MovieDetail รับ { params } เป็น prop (ไม่มี useParams แล้ว)
//       ⚠️ Next.js 15: params เป็น Promise — ต้องประกาศ component เป็น async แล้ว await ก่อนอ่านค่า
//       แสดง "หนังเรื่อง #<id>" ตาม URL เช่น /movies/42
//
// ⚠️ บรรทัด export ข้างล่างเป็นแค่ตัวกันพัง (page.js ที่ไม่มี default export ทำให้ build ไม่ผ่าน)
//    ลบทิ้งแล้วพิมพ์ของจริงแทนตอนถึงบล็อก 1.4

import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovie } from "../../../data/movies";

export default async function MovieDetail({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link className="text-sm underline" href="/movies">
        Back to movies
      </Link>
      <article className="mt-8 space-y-5">
        <p className="text-sm uppercase tracking-widest text-black/60">
          {movie.release_date} · {movie.running_time} min
        </p>
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-lg leading-8 text-black/70">{movie.description}</p>
        <dl className="grid gap-3 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-black/50">Director</dt>
            <dd className="font-medium">{movie.director}</dd>
          </div>
          <div>
            <dt className="text-sm text-black/50">Producer</dt>
            <dd className="font-medium">{movie.producer}</dd>
          </div>
          <div>
            <dt className="text-sm text-black/50">Rotten Tomatoes</dt>
            <dd className="font-medium">{movie.rt_score}%</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
