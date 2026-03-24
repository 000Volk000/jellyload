"use client";

import { useActionState } from "react";
import { download } from "@/app/actions/download";

export function DownloadForm() {
  const [state, action, pending] = useActionState(download, undefined);

  return (
    <form action={action}>
      <div>
        <label className="block mb-2 text-purple-500" htmlFor="link">
          Youtube Link
        </label>
        <input
          className="w-full p-2 mb-6 text-purple-700 border-b-2 border-purple-500 outline-none focus:bg-gray-300"
          type="text"
          id="link"
          name="link"
          required
        />
      </div>
      <div>
        <input
          className={`w-full bg-purple-700 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-4 rounded ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
          type="submit"
          value={pending ? "Downloading..." : "Download"}
          disabled={pending}
        />
      </div>
      {!pending && state?.message && (
        <div
          className={`w-full text-white font-bold py-2 px-4 rounded text-center ${state.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          <p className="whitespace-pre-line">{state.message}</p>
        </div>
      )}
    </form>
  );
}
