import { LEETCODE_USERNAME } from "@/data/constants";

export async function GET() {
  const username = LEETCODE_USERNAME;

  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
    );

    if (!res.ok) {
      return Response.json({ error: "LeetCode API failed" }, { status: 502 });
    }

    const data = await res.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("LeetCode fetch error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
