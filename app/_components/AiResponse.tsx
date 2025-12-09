import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import CallDrug from "./CallDrugAi";

export default async function AiResponse() {
  //  const user = currentUser();
  //create
  const response = await prisma.illness.findMany({
    where: {
      //    userId: user.id,
      userId: "z0ZtxjexP4fUwKW9r877X",
    },
  });
  //delete
  const delte = await prisma.illness.deleteMany({
    where: {
      userId: "z0ZtxjexP4fUwKW9r877X",
    },
  });

  let loading = false;

  if (!response.length) loading = true;

  return (
    <div className="flex justify-center w-full px-4 h-195">
      <form
        className="
          w-full max-w-4xl
          bg-[url('/your-image.jpg')] bg-cover bg-center
          backdrop-blur-xl
          border border-green-300 rounded-3xl shadow-[0_4px_20px_rgba(0,200,100,0.25)]
          flex flex-col items-center p-10 text-gray-800
          transition-all duration-300
        "
      >
        <h2 className="text-4xl font-extrabold mb-6 text-gray-300 tracking-tight">
          Ai Response
        </h2>
        <label className="block mb-2 text-gray-400 font-semibold w-full text-lg">
          AI Response:
        </label>
        <div className="bg-gray-400 h-41 border border-white p-5 rounded-2xl w-200">
          {response.map((r, i) => {
            return (
              <div key={r.id}>
                <div>болоx магадгуй өвчин: {r.name}</div>{" "}
                <div>дэлгэрэл: {r.details}</div>
              </div>
            );
          })}
          <div className="w-220 h-100 mt-30 pr-23">
            {loading === false ? (
              <CallDrug category={r.category} />
            ) : (
              <div className="text-gray-200 font-semibold text-xl md:text-2xl lg:text-4xl p-6  bg-red-500/20 rounded-2xl shadow-lg border border-red-400 flex items-center justify-center ml-100">
                Үргэлжлүүлэхийн тулд өвчний тайлбараа бичнэ үү
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
