import { verify } from "@/app/actions/auth";
import { DownloadForm } from "./download_form";

export default async function Home() {
  await verify();

  return (
    <div className="flex h-screen bg-purple-700">
      <div className="w-full max-w-sm m-auto bg-purple-100 rounded p-5">
        <header className="text-center">
          <img className="w-20 mx-auto mb-2" src="logo.svg" />
          <h1 className="block text-2xl font-bold text-purple-700 mb-5">
            Download Music
          </h1>
        </header>
        <DownloadForm />
      </div>
    </div>
  );
}
