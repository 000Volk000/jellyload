"use server";

import packageInfo from "@/../package.json";
import { headers, cookies } from "next/headers";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

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

    cookies_storage.set("jellyfin_access_token", data.AccessToken);
  } catch (_) {
    return {
      error: "Internal server error",
    };
  }

  redirect("/");
}

export async function verify() {
  const cookies_storage = await cookies();
  if (!cookies_storage.has("jellyfin_access_token")) redirect("/signin");

  const headers_list = await headers();
  const jellyfin_url = process.env.JELLYFIN_BASE_URL + "/Users/Me";

  const token = cookies_storage.get("jellyfin_access_token")?.value;
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

  const authHeader = `MediaBrowser Token=${token}, Client=${client}, Device=${device}, DeviceId=${device_id}, Version=${version}`;

  try {
    const response = await fetch(jellyfin_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    if (!response.ok) redirect("/signin");

    const data = await response.json();
    const allowed_users = (process.env.ALLOWED_USERS || "").split(",");

    if (!allowed_users.includes(data.Name)) redirect("/signin");
  } catch (_) {
    redirect("/signin");
  }
}
