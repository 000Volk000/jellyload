"use server";

import { verify } from "@/app/actions/auth";
import { YtDlp } from "ytdlp-nodejs";

export async function download(_: any, form_data: FormData) {
  await verify();

  const link = form_data.get("link") as string;

  try {
    const ytdlp = new YtDlp({
      binaryPath: process.env.YTDLP_BIN as string,
    });
    await ytdlp.downloadFFmpeg();

    await ytdlp
      .download(link)
      .addOption("paths", process.env.MUSIC_DIRECTORY as string)
      .addOption("output", "%(title)s.%(ext)s")
      .extractAudio()
      .audioQuality("0")
      .audioFormat("best")
      .addOption("embedMetadata", true)
      .addOption("embedThumbnail", true)
      .addOption("convertThumbnails", "jpg")
      .addArgs("--ppa", "ThumbnailsConvertor+ffmpeg:-vf crop=ih:ih")
      .run();

    return { message: "Download Completed", type: "success" };
  } catch (e) {
    return { message: "Download Error\n\n" + e, type: "error" };
  }
}
