"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import MedCard from "./MedCard";

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
}

export default function DescribeUrIllness() {
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
    <div className="flex justify-center mt-20">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="w-500 "
      >
        <CarouselContent>
          {medData.map((m) => (
            <CarouselItem
              key={m.id}
              className="md:basis-1/2 lg:basis-1/5 flex justify-center"
            >
              <div className="p-4 w-full">
                <MedCard med={m} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
