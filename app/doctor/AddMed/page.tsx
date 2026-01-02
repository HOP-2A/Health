"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";
import { Pill } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { BookUser } from "lucide-react";
import { BadgeDollarSign } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { TrendingUpDown } from "lucide-react";
import { ChartGantt } from "lucide-react";
import Footer from "@/app/_components/Footer";

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  category: string;
}

const medicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ageLimit: z.string().min(1, "Age limit is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  imageUrls: z.array(z.string()).optional(),
  category: z.string().min(0, "category is required"),
});

type MedicineForm = z.infer<typeof medicineSchema>;

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const form = useForm<MedicineForm>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      description: "",
      ageLimit: "",
      price: 0,
      stock: 0,
      imageUrls: [""],
      category: "",
    },
  });

  const fetchMedicines = async () => {
    const res = await fetch("/api/add-medicine");
    if (!res.ok) return;
    const data = await res.json();
    setMedicines(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/add-medicine");
        if (!res.ok) throw new Error("Failed to fetch medicines");
        const data = await res.json();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values: MedicineForm) => {
    await fetch("/api/add-medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        ageLimit: values.ageLimit,
        price: values.price,
        stock: values.stock,
        imageUrls: values.imageUrls,
        category: values.category,
      }),
    });
    form.reset();
    await fetchMedicines();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/add-medicine", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await fetchMedicines();
    }
  };

  return (
    <div className="relative min-h-screen  overflow-hidden">
      <DoctorMenuBar />
      <div className="p-8 max-w-4xl mx-auto space-y-8"></div>
      <div className="min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Эмийн Сан
            </h1>
            <p className="text-gray-600">Бүх эмийн мэдээллийг удирдах систем</p>
          </div>
          <Card className="bg-gray-50 shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                шинэ эм нэмэх
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <Pill className="w-4 h-4 text-emerald-600  " />
                          <FormLabel>Нэр</FormLabel>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Medicine name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <BookUser className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Дэлгэрэнгүй мэдээлэл</FormLabel>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Short description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ageLimit"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <CirclePlus className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Насний хязгаар</FormLabel>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="18+" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <BadgeDollarSign className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Үнэ</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Price in USD"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <TrendingUpDown className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Үлдсэн тоо</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Available stock"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <ImagePlus className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Image URL</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            value={field.value?.[0] ?? ""}
                            onChange={(e) => field.onChange([e.target.value])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-1">
                          <ChartGantt className="w-4 h-4 text-emerald-600" />
                          <FormLabel>Ангилал</FormLabel>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="example : Medicine" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="sm:col-span-2 flex justify-end mt-2">
                    <button
                      type="submit"
                      className="group relative flex items-center gap-1
    px-6 py-2
    font-semibold text-[16px]
    text-green-500
    bg-transparent
    rounded-full
    cursor-pointer overflow-hidden
    border-2 border-green-500
    transition-all duration-[600ms]
    ease-[cubic-bezier(0.23,1,0.32,1)]
    hover:bg-green-50
    hover:text-green-700
    hover:rounded-lg
    active:scale-95"
                    >
                      <svg
                        className="absolute left-[-25%] w-5 fill-green-500 z-[9]
      transition-all duration-[800ms]
      ease-[cubic-bezier(0.23,1,0.32,1)]
      group-hover:left-4
      group-hover:fill-green-700"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>

                      <span
                        className="relative z-[1] -translate-x-2
      transition-all duration-[800ms]
      ease-[cubic-bezier(0.23,1,0.32,1)]
      group-hover:translate-x-2"
                      >
                        Эм нэмэх
                      </span>

                      <svg
                        className="absolute right-4 w-5 fill-green-500 z-[9]
      transition-all duration-[800ms]
      ease-[cubic-bezier(0.23,1,0.32,1)]
      group-hover:right-[-25%]
      group-hover:fill-green-700"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>

                      <span
                        className="absolute top-1/2 left-1/2
      w-4 h-4 rounded-full
      bg-green-500
      opacity-0
      -translate-x-1/2 -translate-y-1/2
      transition-all duration-[800ms]
      ease-[cubic-bezier(0.23,1,0.32,1)]
      group-hover:w-[180px]
      group-hover:h-[180px]
      group-hover:opacity-20"
                      />
                    </button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[70vh] overflow-scroll">
            {medicines.map((med) => (
              <Card
                key={med.id}
                className="backdrop-blur-xl bg-white/20 shadow-lg border border-gray-200"
              >
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-800">
                    {med.name}
                  </h2>
                  <p className="text-black-600">{med.description}</p>
                  <div className="mt-2 text-sm text-black-500 space-y-1">
                    <p>насний хязгаар: {med.ageLimit}</p>
                    <p>үнэ: ${med.price}</p>
                    <p>үлдсэн тоо: {med.stock}</p>
                    <p>Ангилал: {med.category}</p>
                  </div>
                  {med.imageUrls.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {med.imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={med.name}
                          className="w-24 h-24 object-cover rounded border border-gray-300"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <button
                    onClick={() => handleDelete(med.id)}
                    className="group relative flex items-center gap-1
             px-6 py-2
             font-semibold text-[16px]
             text-red-500
             bg-transparent
             rounded-full
             cursor-pointer overflow-hidden
             border-2 border-red-500
             transition-all duration-[600ms]
             ease-[cubic-bezier(0.23,1,0.32,1)]
             hover:bg-red-50
             hover:text-[#990000]
             hover:rounded-lg
             active:scale-95"
                  >
                    <svg
                      className="absolute left-[-25%] w-5 fill-red-500 z-[9]
               transition-all duration-[800ms]
               ease-[cubic-bezier(0.23,1,0.32,1)]
               group-hover:left-4
               group-hover:fill-[#990000]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>

                    <span
                      className="relative z-[1] -translate-x-2
               transition-all duration-[800ms]
               ease-[cubic-bezier(0.23,1,0.32,1)]
               group-hover:translate-x-2"
                    >
                      Устгах
                    </span>

                    <svg
                      className="absolute right-4 w-5 fill-red-500 z-[9]
               transition-all duration-[800ms]
               ease-[cubic-bezier(0.23,1,0.32,1)]
               group-hover:right-[-25%]
               group-hover:fill-[#990000]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>

                    <span
                      className="absolute top-1/2 left-1/2
               w-4 h-4 rounded-full
               bg-red-500
               opacity-0
               -translate-x-1/2 -translate-y-1/2
               transition-all duration-[800ms]
               ease-[cubic-bezier(0.23,1,0.32,1)]
               group-hover:w-[180px]
               group-hover:h-[180px]
               group-hover:opacity-20"
                    />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
