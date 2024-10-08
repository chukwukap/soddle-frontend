"use server";

const API_BASE_URL = appConfig.apiBaseUrl;
import {
  APIKOL,
  GameSessionFromApi,
  GameSessionFromApiResponse,
  KOL,
  KolWithTweets,
} from "@/types";
import { appConfig } from "../config";

interface ApiResponse<T> {
  status: string;
  data: T;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${url}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();

  return data as any;
}

export async function fetchKOLs(): Promise<KolWithTweets[]> {
  try {
    const data = await fetchData<KolWithTweets[]>("api/v1/kols");
    return data;
  } catch (error) {
    console.error("Error fetching KOLs:", error);
    throw error;
  }
}

export async function fetchRandomKOL(): Promise<APIKOL> {
  try {
    const randKol = await fetchData<APIKOL>(`api/v1/kols/random`);
    console.log("random KOL", randKol);
    return randKol;
  } catch (error) {
    console.error("Error fetching random APIKOL:", error);
    throw error;
  }
}

export async function fetchGameSessionFromApi({
  publicKey,
}: {
  publicKey: string;
}): Promise<GameSessionFromApi> {
  try {
    const data = await fetchData<GameSessionFromApiResponse>(
      `api/v1/game/${publicKey}`
    );

    return data.data;
  } catch (error) {
    console.error("Error fetching random GameSessionFromApi:", error);
    throw error;
  }
}
