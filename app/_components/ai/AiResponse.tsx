import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CallDrugAi from "./CallDrugAi";

import { Illness } from "@prisma/client";

export default async function AiResponse() {
  const session = await auth();
  const userId = session.userId;

  const response: Illness[] = await prisma.illness.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
    where: {
      userId: "test",
    },
  });

  const delte = await prisma.illness.deleteMany({
    where: {
      userId: "test",
    },
  });

  const isLoading = response.length === 0 || !response[0]?.category;

  return (
    <div className="flex justify-center w-full  h-250">
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
                {r.name === "overloaded" || r.name === "error" ? (
                  <div className="flex h-full w-full items-center gap-6 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-pink-50 p-8 shadow-md">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl font-bold">
                      !
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="text-2xl font-semibold text-red-800">
                        {r.name}
                      </div>
                      <div className="mt-2 text-base text-red-700 leading-relaxed max-w-xl">
                        {r.details}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <div>болоx магадгуй өвчин: {r.name}</div>
                    <div>дэлгэрэл: {r.details}</div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="w-220 h-100 mt-25 pr-23">
            {isLoading ? (
              <div className="w-full max-w-md my-6 p-4 ml-10 text-left text-lg font-medium text-green-800 bg-green-100 rounded-xl shadow-md border border-green-200 hover:bg-green-200 transition-all duration-200 mt-20">
                Үргэлжлүүлэхийн тулд өвчний тайлбараа бичнэ үү
              </div>
            ) : (
              <div>
                <div className="text-5xl text-amber-50 mt-10">
                  medicines that may help:
                </div>
                <CallDrugAi category={response[0].category} />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
