import { NextResponse } from "next/server";

interface KOL {
  id: string;
  name: string;
  age: number;
  country: string;
  pfp: string;
  accountCreation: number;
  followers: number;
  ecosystem: string;
  tweets: string[];
}

interface ApiResponse {
  status: string;
  data: KOL;
}

export const revalidate = 30;
export async function GET() {
  try {
    const response = await fetch("https://silky-eyes.pipeops.app/kols/random");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching random KOL:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch random KOL" },
      { status: 500 }
    );
  }
}
