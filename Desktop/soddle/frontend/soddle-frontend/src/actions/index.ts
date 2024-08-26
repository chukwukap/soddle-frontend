import { KOL } from "@/lib/types/idl-types";

export async function fetchKOLs(): Promise<KOL[]> {
  try {
    const response = await fetch("/api/kols");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "success" || !Array.isArray(data.data)) {
      throw new Error("Invalid response format");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching KOLs:", error);
    throw error;
  }
}
