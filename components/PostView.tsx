import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Post, formatDate } from "@/lib/content";

const BACK = {
  guides: { href: "/guides", label: "Guides" },
  briefings: { href: "/briefings", label: "Briefings" },
} as const;

export default function PostView({ post }: { post: Post }) {
  const back = BACK[post.kind];
  return (
    <section className="container section">
      <div className="with-sidebar">
        <article className="post">
          <Link href={back.href} className="link story__back">← {back.label}</Link>
          <div className="meta">
            {post.category && <span className="tag">{post.category}</span>}
            <span>By {post.author}</span>
            <span className="dot" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="dot" />
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="post__title">{post.title}</h1>
          {post.description && <p className="post__lead">{post.description}</p>}
          <div className="prose post__body" dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.updated && <p className="muted post__updated">Updated {formatDate(post.updated)}.</p>}
          <p className="muted post__disclaimer">
            For information only. This is not financial advice; do your own research before making
            investment decisions. See our <Link href="/editorial-policy">editorial policy</Link>.
          </p>
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} format="fluid" layoutKey={process.env.NEXT_PUBLIC_AD_LAYOUT_KEY_INFEED} className="ad--infeed" />
        </article>
        <aside className="sidebar">
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} className="ad--sidebar" />
        </aside>
      </div>
    </section>
  );
}
