"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import MedCardAi from "./MedCardAi";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/providers/route";

type CallDrugAiProps = {
  category: string;
};

interface Medicine {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
}

interface LikedItem {
  medicine: {
    id: string;
  };
}

export default function CallDrugAi({ category }: CallDrugAiProps) {
  const [medData, setMedData] = useState<Medicine[]>([]);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const { user: clerkUser } = useUser();

  const { loading, user } = useAuth(clerkUser?.id ?? "");

  useEffect(() => {
    if (!loading) {
      const fetchAll = async () => {
        const medsRes = await fetch("/api/add-medicine");
        const meds = await medsRes.json();
        setMedData(meds);
        if (user) {
          const likeRes = await fetch(`/api/liked-med?userId=${user.clerkId}`);
          const likes = await likeRes.json();

          setLikedItems(likes.map((l: LikedItem) => l.medicine.id));
        }
      };
      fetchAll();
    }
  }, [user, loading]);
  if (!medData.length) return <p className="text-center mt-30">Loading...</p>;

  return (
    <div className="flex justify-center mt-20">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="w-220"
      >
        <CarouselContent>
          {medData.map((m) => (
            <CarouselItem
              key={m.id}
              className="basis-full md:basis-1/3 flex justify-center"
            >
              <div className="p-4 w-full">
                <MedCardAi
                  med={m}
                  userId={user?.id || ""}
                  userClerckId={user?.clerkId || ""}
                  isLiked={likedItems.includes(m.id)}
                  onLikeChange={(id: string, liked: boolean) => {
                    setLikedItems((prev) =>
                      liked ? [...prev, id] : prev.filter((item) => item !== id)
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
