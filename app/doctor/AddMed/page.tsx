"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
    await fetch("/api/add-medicine", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchMedicines();
  };

  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488330890490-c291ecf62571?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DoctorMenuBar />
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-green-700">
          эмийн сан
        </h1>

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
                      <FormLabel>Нэр</FormLabel>
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
                      <FormLabel>дэлгэрэнгүй мэдээлэл</FormLabel>
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
                      <FormLabel>насний хязгаар</FormLabel>
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
                      <FormLabel>үнэ</FormLabel>
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
                      <FormLabel>үлдсэн тоо</FormLabel>
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
                      <FormLabel>Image URL</FormLabel>
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
                      <FormLabel>Ангилал</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="example : drug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="sm:col-span-2 flex justify-end mt-2">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add Medicine
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {medicines.map((med) => (
            <Card
              key={med.id}
              className="backdrop-blur-xl bg-white/20 shadow-lg border border-gray-200"
            >
              <CardContent>
                <h2 className="text-xl font-bold text-gray-800">{med.name}</h2>
                <p className="text-gray-400">{med.description}</p>
                <div className="mt-2 text-sm text-gray-100 space-y-1">
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
                <Button
                  variant="secondary"
                  onClick={() => handleDelete(med.id)}
                >
                  Устгах
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
