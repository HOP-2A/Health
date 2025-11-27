import { Search } from "lucide-react";

export default function SearchPageInput() {
  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center tracking-tight">
          Search for Medicines
        </h2>

        <div className="relative backdrop-blur-xl bg-white/60 border border-white/50 shadow-xl rounded-2xl p-4 transition-all duration-300 focus-within:shadow-green-300">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600"
            size={24}
          />

          <input
            type="text"
            placeholder="Search medicines, drugs, symptoms..."
            className="pl-14 pr-4 py-3 w-full bg-transparent text-gray-700 placeholder-gray-400 text-lg focus:outline-none"
          />
        </div>

        <button className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-300 transition-all duration-300 text-lg">
          Search
        </button>
      </div>
    </div>
  );
}
