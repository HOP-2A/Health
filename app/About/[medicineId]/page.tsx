"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MenuBar from "../../_components/MenuBar";
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
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const params = useParams();
  const medicineId = params.medicineId;

  useEffect(() => {
    if (!medicineId) return;

    const fetchMed = async () => {
      try {
        const res = await fetch(`/api/getMedicineByid/${medicineId}`);
        const data = await res.json();
        setMedicine(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMed();
  }, [medicineId]);

  if (!medicine) return <p>Loading medicine...</p>;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MenuBar />
      <div className="flex items-center justify-center min-h-screen gap-8 bg-green-800 p-4">
        {/* Medicine Image */}
        <img
          className="h-150] w-[150] object-cover rounded"
          src={medicine.imageUrls[0]}
          alt={medicine.name}
        />

        {/* Medicine Details */}
        <div className="text-white max-w-md">
          <h1 className="text-2xl font-bold mb-2">{medicine.name}</h1>
          <p className="mb-1">{medicine.description}</p>
          <p className="mb-1">Price: {medicine.price}</p>
          <p className="mb-1">Stock: {medicine.stock}</p>
          <p className="mb-1">Category: {medicine.category}</p>
        </div>
      </div>
    </div>
  );
}
