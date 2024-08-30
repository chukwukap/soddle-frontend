import { appConfig } from "../config";
import { KolWithTweets } from "../types/idlTypes";

interface ApiResponse<T> {
  status: string;
  data: T;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();

  if (data.status !== "success") {
    throw new Error("Invalid response format");
  }

  return data.data;
}

export async function fetchKOLs(): Promise<KolWithTweets[]> {
  try {
    return await fetchData<KolWithTweets[]>(`${appConfig.baseUrl}/api/kols`);
  } catch (error) {
    console.error("Error fetching KOLs:", error);
    throw error;
  }
}

export async function fetchRandomKOL(): Promise<KolWithTweets> {
  try {
    return await fetchData<KolWithTweets>(
      `${appConfig.baseUrl}/api/kols/random`
    );
  } catch (error) {
    console.error("Error fetching random KolWithTweets:", error);
    throw error;
  }
}
