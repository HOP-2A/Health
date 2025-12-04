import { Search } from "lucide-react";

export default function SearchPageInput() {
  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-gray-300  mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          Search for Medicines
        </h2>
        <div
          className="relative group 
          backdrop-blur-xl bg-white/40 border border-white/60 
          shadow-[0_0_20px_rgba(0,255,120,0.15)]
          hover:shadow-[0_0_30px_rgba(0,255,120,0.3)]
          rounded-2xl p-5 transition-all duration-500"
        >
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600 group-hover:text-green-700 transition-colors duration-300"
            size={30}
          />

          <input
            type="text"
            placeholder="Search medicines, drugs, symptoms..."
            className="
              pl-14 pr-4 py-3 w-full 
              bg-transparent text-gray-800 placeholder-gray-500 text-lg
              focus:outline-none 
              group-hover:placeholder-gray-400 
              transition-all duration-300
            "
          />
        </div>

        <button
          className="
            mt-6 w-full py-3 text-lg font-semibold rounded-xl
            bg-gradient-to-br from-green-500 to-green-700 text-white
            shadow-[0_4px_12px_rgba(0,150,80,0.35)]
            hover:shadow-[0_0_20px_rgba(0,255,120,0.5)]
            hover:scale-[1.02] active:scale-[0.97]
            transition-all duration-300
          "
        >
          Search
        </button>
      </div>
    </div>
  );
}
