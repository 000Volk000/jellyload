"use server";

import packageInfo from "@/../package.json";
import { headers, cookies } from "next/headers";
import { randomUUID } from "crypto";

interface User {
  Username: string;
  Pw: string;
}

export async function signin(_: any, form_data: FormData) {
  const headers_list = await headers();
  const cookies_storage = await cookies();

  const jellyfin_url =
    process.env.JELLYFIN_BASE_URL + "/Users/AuthenticateByName";

  const client = packageInfo.name;
  const device = headers_list.get("user-agent") || "Unknown Device";
  let device_id;
  if (cookies_storage.has("jellyfin_device_id")) {
    device_id = cookies_storage.get("jellyfin_device_id")?.value;
  } else {
    device_id = randomUUID();
    cookies_storage.set("jellyfin_device_id", device_id);
  }
  const version = packageInfo.version;

  const authHeader = `MediaBrowser Client=${client}, Device=${device}, DeviceId=${device_id}, Version=${version}`;

  const user: User = {
    Username: form_data.get("username") as string,
    Pw: form_data.get("password") as string,
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
      return {
        error: `Username or Password is incorrect\nHTTP status: ${response.status}`,
      };
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
