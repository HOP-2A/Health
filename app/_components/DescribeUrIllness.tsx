export default function DescribeUrIllness() {
  return (
    <div className="flex justify-center items-center min-h-[90vh] p-5">
      <form className="backdrop-blur-lg bg-white/70 shadow-2xl border border-white/40 rounded-2xl p-10 w-full max-w-3xl animate-slideUp">
        <h2 className="text-4xl font-extrabold mb-6 text-green-700 tracking-tight">
          Describe Your Illness
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">
          Please provide a detailed description of your symptoms:
        </label>

        <textarea
          rows={6}
          placeholder="Describe your illness here..."
          className="w-full p-4 border border-green-200 bg-white/60 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 shadow-sm text-gray-700 resize-none"
        ></textarea>

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-300 transition-all duration-300 text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
