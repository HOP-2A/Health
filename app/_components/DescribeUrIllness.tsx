export default function DescribeUrIllness() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-green-50">
      <form className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Describe Your Illness
        </h2>
        <label className="block text-gray-700 mb-3 font-medium">
          Please provide a detailed description of your symptoms:
        </label>
        <textarea
          rows={6}
          placeholder="Describe your illness here..."
          className="w-full p-4 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 mb-6 resize-none shadow-sm"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 shadow-lg transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
