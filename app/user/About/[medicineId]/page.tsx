"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import MenuBar from "@/app/_components/MenuBar";
import Footer from "@/app/_components/Footer";
import MedCard from "@/app/_components/MedCard";
import { useProvider } from "@/providers/AuthProvidor";

type Medicine = {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  category: string;
};

export default function MedicineDetail() {
  const { medicineId } = useParams<{ medicineId: string }>();
  const router = useRouter();
  const { user } = useProvider();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [relatedMedicines, setRelatedMedicines] = useState<Medicine[]>([]);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!medicineId) return;
    fetch(`/api/getMedicineByid/${medicineId}`)
      .then((res) => res.json())
      .then(setMedicine)
      .catch(console.error);
  }, [medicineId]);

  useEffect(() => {
    if (!medicine?.category) return;
    fetch(`/api/getMedicinesByCategory/${medicine.category}`)
      .then((res) => res.json())
      .then((data: Medicine[]) => {
        setRelatedMedicines(data.filter((m) => m.id !== medicine.id));
      })
      .catch(console.error);
  }, [medicine]);

  useEffect(() => {
    if (!user || !medicine) return;
    fetch(`/api/liked-med?userId=${user.clerkId}`)
      .then((res) => res.json())
      .then((likes: { medicine: { id: string } }[]) => {
        setLiked(likes.some((l) => l.medicine.id === medicine.id));
      })
      .catch(console.error);
  }, [user, medicine]);

  const toggleLike = async () => {
    if (!user || !medicine) return;

    try {
      if (liked) {
        const res = await fetch(`/api/liked-med?medicineId=${medicine.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.clerkId }),
        });

        if (res.ok) {
          setLiked(false);
        }
      } else {
        const res = await fetch(`/api/liked-med`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.clerkId,
            medicineId: medicine.id,
          }),
        });

        if (res.ok) {
          setLiked(true);
        }
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  const addToCart = async () => {
    if (!user || !medicine) return;
    const res = await fetch("/api/create-orderItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        medicineId: medicine.id,
        quantity,
        price: quantity * medicine.price,
      }),
    });
    if (res.ok) {
      toast.success("Амжилттай сагсанд нэмлээ!");
      router.push("/user/drugCart");
    }
  };

  if (!medicine) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative min-h-screen ">
      <MenuBar />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform duration-300">
            <img
              src={medicine.imageUrls[0]}
              alt={medicine.name}
              className="h-[500px] w-[400px] object-contain"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full backdrop-blur-sm bg-green-50/40 rounded-3xl p-10 shadow-2xl flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-5 relative">
              <button
                onClick={toggleLike}
                className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 bg-gray-200 hover:bg-gray-300 hover:scale-110 transition-all shadow-md"
              >
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    className="w-7 h-7 animate-heart"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="white"
                    fill="none"
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                )}
              </button>
              <span className="text-sm bg-blue-200 text-blue-700 px-3 py-1 rounded-full">
                {medicine.category}
              </span>
              <span className="text-sm bg-red-200 text-red-600 px-3 py-1 rounded-full">
                {medicine.ageLimit}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {medicine.name}
            </h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              {medicine.description}
            </p>
            <p className="text-3xl font-bold text-green-900 mb-4">
              ₮{medicine.price}
            </p>
            <p
              className={`mb-8 font-medium ${
                medicine.stock > 0 ? "text-green-700" : "text-red-500"
              }`}
            >
              {medicine.stock > 0
                ? `Тоо ширхэг: (${medicine.stock} available)`
                : "Out of stock"}
            </p>

            <div className="flex items-center mt-2 w-36 border border-white/30 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl">
              <button
                className="w-12 h-10 bg-white/20 text-xl text-white hover:bg-white/30 transition"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="w-12 h-10 flex items-center justify-center bg-white/10 text-white">
                {quantity}
              </span>
              <button
                className="w-12 h-10 bg-white/20 text-xl text-white hover:bg-white/30 transition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="w-full mt-5 py-3 rounded-xl text-lg font-semibold bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg active:scale-95 transition-all duration-200"
              onClick={addToCart}
            >
              Сагсанд нэмэх
            </button>
          </div>
        </div>

        <div className="mt-10 md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ижил төрлийн эмүүд
          </h2>

          {relatedMedicines.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedMedicines.map((med) => (
                <MedCard
                  key={med.id}
                  med={{ ...med, expiryDate: "" }}
                  isLiked={false}
                  onLikeChange={() => {}}
                  userId={user?.id || ""}
                  userClerckId={user?.clerkId || ""}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m0 0l-6 6m6-6H5"
                />
              </svg>
              <p className="text-gray-500 text-center text-lg">
                Энэ төрлийн эм одоогоор байхгүй байна.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
