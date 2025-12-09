"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import MedCard from "./MedCard";
import { useUser } from "@clerk/nextjs";

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
}

export default function CallDrug() {
  const [medData, setMedData] = useState<Medicine[]>([]);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchAll = async () => {
      const medsRes = await fetch("/api/add-medicine");
      const meds = await medsRes.json();
      setMedData(meds);

      if (user) {
        const likeRes = await fetch(`/api/liked-med?userId=${user.id}`);
        const likes = await likeRes.json();

        setLikedItems(likes.map((like: any) => like.medicine.id));
      }
    };

    fetchAll();
  }, [user]);

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
                <MedCard
                  med={m}
                  isLiked={likedItems.some((med) => med.id === m.id)}
                  userId={user?.id}
                  onLikeChange={(id: string, liked: boolean) => {
                    setLikedItems((prev) =>
                      liked ? [...prev, id] : prev.filter((like) => like !== id)
                    );
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
