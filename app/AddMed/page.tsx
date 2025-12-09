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

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  expiryDate: string;
}

const medicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ageLimit: z.string().min(1, "Age limit is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  imageUrls: z.string().optional(),
  expiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
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
      imageUrls: "",
      expiryDate: "",
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
        imageUrls: values.imageUrls
          ? values.imageUrls.split(",").map((u) => u.trim())
          : [],
        expiryDate: new Date(values.expiryDate).toISOString(),
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
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-green-700">
        Medicines Inventory
      </h1>

      <Card className="bg-gray-50 shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Add New Medicine
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
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                    <FormLabel>Age Limit</FormLabel>
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
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <FormLabel>Image URLs</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/image1.jpg,..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
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
          <Card key={med.id} className="shadow-lg border border-gray-200">
            <CardContent>
              <h2 className="text-xl font-bold text-gray-800">{med.name}</h2>
              <p className="text-gray-600">{med.description}</p>
              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p>Age Limit: {med.ageLimit}</p>
                <p>Price: ${med.price}</p>
                <p>Stock: {med.stock}</p>
                <p>Expiry: {new Date(med.expiryDate).toLocaleDateString()}</p>
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
              <Button variant="secondary" onClick={() => handleDelete(med.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
