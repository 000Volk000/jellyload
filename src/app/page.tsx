import { verify } from "@/app/actions/auth";

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
        <form>
          <div>
            <label className="block mb-2 text-purple-500" htmlFor="link">
              Youtube Link
            </label>
            <input
              className="w-full p-2 mb-6 text-purple-700 border-b-2 border-purple-500 outline-none focus:bg-gray-300"
              type="text"
              id="link"
              name="link"
            />
          </div>
          <div>
            <input
              className="w-full bg-purple-700 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-4 rounded"
              type="submit"
              value="Download"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
