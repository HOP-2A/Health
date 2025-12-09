"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  category: string;
  price: number;
  stock: number;
  imageUrls: string[];
}

export default function DescribeUrIllness({ category }) {
  const [medData, setMedData] = useState<Medicine[]>([]);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/add-medicine");
        if (!res.ok) throw new Error("Failed to fetch medicines");
        const data = await res.json();
        setMedData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!medData.length) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex justify-center">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="w-full max-w-5xl"
      >
        <CarouselContent>
          {medData.map((m) => (
            <CarouselItem
              key={m.id}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <div className="p-2 w-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src={m.imageUrls[0]}
                      alt={m.name}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <span className="text-lg font-semibold">{m.name}</span>
                    <span className="text-sm text-gray-500">
                      ₹{m.price} | Stock: {m.stock}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
