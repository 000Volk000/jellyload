"use server";

import packageInfo from "@/../package.json";
import { headers } from "next/headers";
const headersList = await headers();

interface User {
  Username: string;
  Pw: string;
}

export async function signin(formData: FormData) {
  const jellyfin_url =
    process.env.JELLYFIN_BASE_URL + "/Users/AuthenticateByName";

  const client = packageInfo.name;
  const device = headersList.get("user-agent") || "Unknown Device";
  const version = packageInfo.version;

  // TODO create UUID
  const authHeader =
    "MediaBrowser Client=" +
    client +
    ", Device=" +
    device +
    ', DeviceId="UUID", Version=' +
    version;

  const user: User = {
    Username: formData.get("username") as string,
    Pw: formData.get("password") as string,
  };

  try {
    const response = await fetch(jellyfin_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
