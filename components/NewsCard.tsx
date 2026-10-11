import Link from "next/link";
import { Article, articlePath, timeAgo } from "@/lib/news";

export default function NewsCard({ article, variant = "default" }: { article: Article; variant?: "default" | "lead" | "compact" }) {
  return (
    <Link className={`card card--${variant}`} href={articlePath(article)}>
      {variant !== "compact" && (
        <div className="card__media">
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
          ) : (
            <div className="card__fallback">
              <span>{article.source.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
      )}
      <div className="card__body">
        <div className="meta">
          <span className="tag">{article.category}</span>
          <span>{article.source}</span>
          <span className="dot" />
          <time dateTime={new Date(article.datetime * 1000).toISOString()}>{timeAgo(article.datetime)}</time>
        </div>
        <h3 className="card__title">{article.headline}</h3>
        {variant !== "compact" && article.summary && <p className="card__summary">{article.summary}</p>}
        <span className="card__cta">
          Read story <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
