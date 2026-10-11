import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Called every morning by Vercel Cron (see vercel.json).
// Vercel automatically sends `Authorization: Bearer $CRON_SECRET`.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("news");
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString() });
}
