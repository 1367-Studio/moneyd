import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostView from "@/components/PostView";
import { getPost, getPosts } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("guides").map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost("guides", (await params).slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
      }
    : {};
}

export default async function GuidePage({ params }: Props) {
  const post = getPost("guides", (await params).slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
