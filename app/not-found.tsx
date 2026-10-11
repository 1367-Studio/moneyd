import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section">
      <div className="prose">
        <span className="label">404</span>
        <h1>This drop dried up.</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist, or the story has rolled out of today&apos;s
          feed. Fresh headlines land every morning.
        </p>
      </div>
      <Link href="/" className="btn btn--primary">Back to today&apos;s drops</Link>
    </section>
  );
}
