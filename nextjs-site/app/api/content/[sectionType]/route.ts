import { NextResponse } from "next/server";
import { getRandomContent } from "@/lib/content";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sectionType: string }> }
) {
  const { sectionType } = await params;

  if (
    sectionType !== "projects" &&
    sectionType !== "activities" &&
    sectionType !== "thoughts"
  ) {
    return NextResponse.json(
      { error: "Invalid section type" },
      { status: 400 }
    );
  }

  const content = getRandomContent(
    sectionType as "projects" | "activities" | "thoughts"
  );

  if (!content) {
    return NextResponse.json({ error: "No content found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
