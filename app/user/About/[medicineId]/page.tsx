"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuBar from "../../../_components/MenuBar";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "@/app/_components/Footer";

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
  const { user, isLoaded } = useUser();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [relatedMedicines, setRelatedMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    if (!medicine || !medicine.category) return;

    const fetchMedicineCategory = async () => {
      const res = await fetch(
        `/api/getMedicinesByCategory/${medicine.category}`
      );
      const data = await res.json();
      const others = data.filter((m: Medicine) => m.id !== medicine.id);
      setRelatedMedicines(others);
    };

    fetchMedicineCategory();
  }, [medicine]);

  useEffect(() => {
    if (!medicineId) return;
    const fetchMedicine = async () => {
      const res = await fetch(`/api/getMedicineByid/${medicineId}`);
      const data = await res.json();
      setMedicine(data);
    };
    fetchMedicine();
  }, [medicineId]);

  useEffect(() => {
    if (!isLoaded || !user || !medicine) return;

    fetch(`/api/liked-med?userId=${user.id}`)
      .then((res) => res.json())
      .then((likes: { medicine: { id: string } }[]) => {
        const isLiked = likes.some((l) => l.medicine.id === medicine.id);
        setLiked(isLiked);
      })
      .catch(console.error);
  }, [isLoaded, user, medicine]);

  const toggleLike = async () => {
    if (!user || !medicine) {
      console.error("User or Medicine not found");
      return;
    }

    try {
      if (liked) {
        await fetch(`/api/liked-med?medicineId=${medicine.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
      } else {
        await fetch(`/api/liked-med`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ medicineId: medicine.id, userId: user.id }),
        });
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
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
    <div
      className="relative min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

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
                className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 bg-gray-200 backdrop-blur-md hover:bg-gray-300 hover:scale-110 transition-all shadow-md"
              >
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    className="w-7 h-7 animate-heart"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
                5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                6.86-8.55 11.54L12 21.35z"
                    />
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
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
                  5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
                  3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                  6.86-8.55 11.54L12 21.35z"
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

            <p className="text-3xl font-bold text-green-300 mb-4">
              ₮{medicine.price}
            </p>

            {medicine.stock > 0 ? (
              <p className="text-green-200 font-medium mb-8">
                Тоо ширхэг: ({medicine.stock} available)
              </p>
            ) : (
              <p className="text-red-500 font-medium mb-8">Out of stock</p>
            )}

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
              onClick={() => addToCart()}
            >
              Сагсанд нэмэх
            </button>
          </div>
        </div>

        {relatedMedicines.length > 0 && (
          <div className="mt-10 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-50 mb-4">
              Ижил төрлийн эмүүд
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedMedicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  <Link href={`/user/About/${med.id}`}>
                    <div>
                      <img
                        src={med.imageUrls[0]}
                        alt={med.name}
                        className="h-32 w-full object-contain mb-2"
                      />
                      <h3 className="font-semibold">{med.name}</h3>
                      <p className="text-green-600 font-bold">₮{med.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
