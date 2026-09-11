export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return new Response(`Chat ${slug} — coming soon`, { status: 200 });
}
