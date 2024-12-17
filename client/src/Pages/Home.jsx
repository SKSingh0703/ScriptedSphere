export default function Home() {
    return (
      <div className="">
        <div className="relative h-[70vh] m-3 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('../../public/home.avif')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto relative z-10 text-white h-full flex flex-col justify-center px-4">
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm w-max">
              Destination
            </span>
            <h2 className="text-4xl font-bold mt-4">
              Exploring the Wonders of Hiking
            </h2>
            <p className="mt-2 text-sm">
              An iconic landmark, this post unveils the secrets that make this
              destination a travelers paradise.
            </p>
            <div className="flex items-center mt-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="w-10 h-10 rounded-full border-2 border-white" // Rounded image with a border
              />
              <div className="ml-3">
                <p>Theodore Reginald</p>
                <p className="text-sm opacity-75">24 Jan 2024 • 10 mins read</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1>Blog</h1>
        </div>
      </div>
    );
  }
  