export default function DescribeUrIllness() {
  return (
    <div className="flex justify-center mt-10">
      <form className="bg-gradient-to-br from-green-500 to-green-700 flex flex-col items-center text-white shadow-2xl border border-green-700 rounded-2xl p-10 w-full max-w-3xl animate-slideUp">
        <h2 className="text-4xl font-extrabold mb-6 text-white tracking-tight">
          Describe Your Illness
        </h2>

        <label className="block mb-2 text-green-100 font-medium w-full">
          Please provide a detailed description of your symptoms:
        </label>

        <textarea
          rows={6}
          placeholder="Describe your illness here..."
          className="w-full p-4 border border-green-300 bg-white/80 text-gray-700 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300
                     shadow-sm resize-none"
        ></textarea>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-br from-green-400 to-green-600  text-white font-semibold py-3 rounded-xl
                     shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                     hover:bg-green-300 hover:shadow-[0_6px_18px_rgba(0,128,0,0.35)]
                     active:scale-[0.98]
                     transition-all duration-300 text-lg tracking-wide"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
