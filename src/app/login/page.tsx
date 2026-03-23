export default function Home() {
  return (
    <div className="flex h-screen bg-purple-700">
      <div className="w-full max-w-xs m-auto bg-purple-100 rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" src="logo.svg" />
        </header>
        <form>
          <div>
            <label className="block mb-2 text-purple-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-purple-700 border-b-2 border-purple-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
            />
          </div>
          <div>
            <label className="block mb-2 text-purple-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-purple-700 border-b-2 border-purple-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
            />
          </div>
          <div>
            <input
              className="w-full bg-purple-700 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Sign In"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
