"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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

  const findMedicines = async () => {
    const res = await fetch(`/api/find-order/eUz3kiMTJBGuh89oVvTlr`);
    const meds = await res.json();
    setCartItems(meds);
  };
  useEffect(() => {
    const findMedicines = async () => {
      const res = await fetch(`/api/find-order/eUz3kiMTJBGuh89oVvTlr`);
      const meds = await res.json();
      setCartItems(meds);
    };
    findMedicines();
  }, []);
  const deleteMed = async (orderItemId: string) => {
    await fetch(`/api/delete-orderItem/${orderItemId}`, {
      method: "DELETE",
    });
    findMedicines();
  };
  return (
    <div className="flex justify-center mt-20 px-4 min-h-[80vh] relative">
      <div className="w-full max-w-3xl relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-300 mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          Таны эмийн сагс
        </h2>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mt-20"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-6 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40"
              >
                <ShoppingCart
                  size={60}
                  className="text-green-600 opacity-80 animate-pulse-fast"
                />
              </motion.div>

              <p className="mt-6 text-xl font-semibold text-gray-300">
                Таны сагс хоосон байна
              </p>

              <p className="text-gray-50 max-w-sm mt-2">
                Эм эсвэл эрүүл мэндийн бүтээгдэхүүнийг энд жагсаасан байдлаар
                харахын тулд нэмнэ үү.
              </p>

              <button
                className="mt-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-300 transition-all duration-300"
                onClick={() => router.push("/search")}
              >
                Эмнүүдийг үзэх
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-6 bg-white/80 backdrop-blur-2xl
               border border-white/50 shadow-2xl rounded-3xl
               p-6 min-h-[140px] hover:shadow-3xl transition-all"
                >
                  <img
                    src={item.medicine.imageUrls[0]}
                    alt={item.medicine.name}
                    className="w-28 h-28 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-2xl text-gray-800">
                      {item.medicine.name}
                    </h3>

                    <p className="text-base text-gray-500 mt-1 line-clamp-2">
                      {item.medicine.description}
                    </p>

                    <div className="flex items-center gap-8 mt-4 text-base text-gray-700">
                      <span>
                        Тоо хэмжээ: <b>{item.quantity}</b>
                      </span>
                      <span className="font-semibold text-lg">
                        {item.price}₮
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 transition"
                    onClick={() => deleteMed(item.id)}
                  >
                    <Trash2 size={26} className="text-red-500" />
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
