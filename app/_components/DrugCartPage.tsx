"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProvider } from "@/providers/AuthProvidor";

type orderItem = {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: number;
  medicine: {
    id: string;
    name: string;
    description: string;
    ageLimit: number;
    price: number;
    stock: number;
    imageUrls: string[];
  };
};

export default function DrugCartPage() {
  const [cartItems, setCartItems] = useState<orderItem[]>([]);
  const router = useRouter();
  const { user } = useProvider();

  const findMedicines = async () => {
    const res = await fetch(`/api/find-order/${user?.id}`);
    const response = await res.json();
    setCartItems(response.items);
  };

  useEffect(() => {
    if (!user) return;

    const findMedicines = async () => {
      const res = await fetch(`/api/find-order/${user?.id}`);
      const response = await res.json();
      setCartItems(response.items);
    };

    findMedicines();
  }, [user]);

  const totalP = cartItems.reduce((sum, item) => sum + item.price, 0);

  const deleteMed = async (orderItemId: string) => {
    await fetch(`/api/delete-orderItem/${orderItemId}`, { method: "DELETE" });
    findMedicines();
  };

  return (
    <div className="min-h-screen  px-4 pt-28 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
            Таны сагс
          </h1>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Нийт дүн</p>
              <p className="text-3xl font-bold text-green-600">
                {totalP.toLocaleString()}₮
              </p>
            </div>

            <button
              className="
                flex items-center gap-2
                bg-gradient-to-br from-green-500 to-emerald-700
                text-white font-semibold
                px-6 py-3 rounded-xl
                shadow-[0_8px_20px_rgba(0,120,80,0.35)]
                hover:shadow-[0_12px_30px_rgba(0,120,80,0.5)]
                hover:scale-105 active:scale-95
                transition-all
              "
              onClick={() => router.push("/user/search")}
            >
              Захиалах
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mt-24"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-2xl"
              >
                <ShoppingCart size={64} className="text-green-600" />
              </motion.div>

              <h2 className="mt-8 text-2xl font-semibold text-gray-700">
                Таны сагс хоосон байна
              </h2>

              <p className="mt-2 text-gray-500 max-w-md">
                Эм болон эрүүл мэндийн бүтээгдэхүүн нэмснээр энд харагдана.
              </p>

              <button
                onClick={() => router.push("/user/search")}
                className="
                  mt-8 px-8 py-3 rounded-xl
                  bg-green-600 text-white font-semibold
                  shadow-lg hover:bg-green-700
                  hover:shadow-green-300
                  transition-all
                "
              >
                Эм хайх
              </button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="
    flex flex-col sm:flex-row gap-4
    bg-white/80 backdrop-blur-2xl
    border border-white/60
    rounded-3xl p-4
    shadow-[0_10px_28px_rgba(0,120,80,0.22)]
    hover:shadow-[0_14px_36px_rgba(0,120,80,0.32)]
    transition-all
  "
                >
                  <img
                    src={item.medicine.imageUrls[0]}
                    alt={item.medicine.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                      {item.medicine.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {item.medicine.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-5 mt-3 text-sm text-gray-700">
                      <span>
                        Тоо: <b>{item.quantity}</b>
                      </span>
                      <span className="text-base font-semibold text-green-600">
                        {item.price.toLocaleString()}₮
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteMed(item.id)}
                    className="
      self-start sm:self-center
      p-3 rounded-xl
      bg-red-50 hover:bg-red-100
      transition
    "
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
