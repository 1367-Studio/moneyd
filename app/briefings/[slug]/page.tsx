import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostView from "@/components/PostView";
import { getPost, getPosts } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts("briefings");
  // Next needs at least one param for a static route; "none" simply 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "none" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost("briefings", (await params).slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
      }
    : {};
}

export default async function BriefingPage({ params }: Props) {
  const post = getPost("briefings", (await params).slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
