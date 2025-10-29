import { NextResponse } from "next/server";
import { getRandomContent } from "@/lib/content";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sectionType: string }> }
) {
  const { sectionType } = await params;

  if (
    sectionType !== "projects" &&
    sectionType !== "specialities" &&
    sectionType !== "thoughts"
  ) {
    return NextResponse.json(
      { error: "Invalid section type" },
      { status: 400 }
    );
  }

  const content = getRandomContent(
    sectionType as "projects" | "specialities" | "thoughts"
  );

  if (!content) {
    return NextResponse.json({ error: "No content found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
