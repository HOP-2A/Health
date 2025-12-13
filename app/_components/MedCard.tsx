"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
type medicine = {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  expiryDate: string;
};
type Order = {
  id: string;
  userId: string;
  totalPrice: number;
  status: string;
  discountApplied: boolean;
  createdAt: Date;
};

export default function MedCard({ med }: { med: medicine }) {
  const [price, setPrice] = useState<number>(0);
  const [orderItem, setOrderItem] = useState({
    orderId: "",
    medicineId: med.id,
    quantity: 1,
    price: 0,
  });

  const addToCart = async () => {
    setOrderItem((prev) => {
      return { orderId: "", medicineId: med.id, quantity: 1, price: 0 };
    });
    const res = await fetch("/api/create-orderItem", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: "eUz3kiMTJBGuh89oVvTlr",
        totalPrice: price,
        medicineId: orderItem.medicineId,
        quantity: orderItem.quantity,
        price: orderItem.price,
      }),
    });
  };
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
            className="w-[400px] h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <h2 className="text-[18px] font-semibold text-white mt-2">
          {med.name}
        </h2>

        <span className="text-[22px] font-bold text-[#80FF9F] mt-1">
          {med.price}₮
        </span>

        <div className="mt-3 text-white/80 font-medium text-[15px]">
          тоо ширхэг:{med.stock}
        </div>

        <div className="flex items-center w-36 mt-2 border border-white/30 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl">
          <button
            className="w-12 h-10 bg-white/20 text-xl text-white"
            onClick={() => {
              setPrice(orderItem.quantity * med.price);
              setOrderItem((prev) => {
                return { ...prev, quantity: orderItem.quantity - 1 };
              });
              setOrderItem((prev) => {
                return { ...prev, price: orderItem.quantity * med.price };
              });
            }}
          >
            -
          </button>
          <button className="w-12 h-10 bg-white/20 text-xl text-white">
            {orderItem.quantity}
          </button>
          <div className="flex-1 text-center text-[16px] font-medium text-white"></div>
          <button
            className="w-12 h-10 bg-white/20 text-xl text-white"
            onClick={() => {
              setPrice(orderItem.quantity * med.price);
              setOrderItem((prev) => {
                return { ...prev, quantity: orderItem.quantity + 1 };
              });
              setOrderItem((prev) => {
                return { ...prev, price: orderItem.quantity * med.price };
              });
            }}
          >
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
          onClick={() => addToCart()}
        >
          Сагсанд нэмэх
        </button>
      </CardContent>
    </Card>
  );
}
