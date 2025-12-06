import { Card, CardContent } from "@/components/ui/card";

export default function MedCard({ med }) {
  return (
    <Card
      className="
        backdrop-blur-xl bg-white/20 
        rounded-2xl border border-white/30
        shadow-md hover:shadow-xl 
        hover:bg-white/30 transition-all duration-300
      "
    >
      <CardContent className="p-5 relative">
        <div className="w-full">
          <img
            src={med.imageUrls[0]}
            alt={med.name}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <button
          className="
            absolute top-4 right-4
            w-11 h-11 flex items-center justify-center
            rounded-full border border-white/40
            bg-white/30 backdrop-blur-md
            hover:bg-white/50 transition
            shadow-md
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <h2 className="text-[18px] font-semibold text-white mt-2">
          {med.name}
        </h2>

        <span className="text-[22px] font-bold text-[#80FF9F] mt-1">
          {med.price.toLocaleString()}₮
        </span>

        <div className="mt-3 text-white/80 font-medium text-[15px]">Box:</div>

        <div className="flex items-center w-36 mt-2 border border-white/30 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl">
          <button className="w-12 h-10 bg-white/20 text-xl text-white">
            −
          </button>
          <div className="flex-1 text-center text-[16px] font-medium text-white">
            1
          </div>
          <button className="w-12 h-10 bg-white/20 text-xl text-white">
            +
          </button>
        </div>

        <button
          type="submit"
          className="
            w-full mt-5 py-3 rounded-xl text-lg font-semibold
            bg-green-500 text-white shadow-md
            hover:bg-green-600 hover:shadow-lg
            active:scale-95 transition-all duration-200
          "
        >
          Submit
        </button>
      </CardContent>
    </Card>
  );
}
