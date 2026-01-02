"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { DoctorCard } from "./DoctorCard";

type Doctor = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  phoneNumber: string;
  experienceYears: number;
  clerkId: string;
};

export default function CallDoctor() {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("/api/find-all-doctor");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const doctors = await res.json();
        setDoctorData(doctors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, []);
  if (!doctorData.length)
    return <p className="text-center mt-30">Loading...</p>;

  return (
    <div className="flex justify-center mt-2 w-full">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="w-full max-w-7xl"
      >
        <CarouselContent className="-ml-6">
          {doctorData.map((d) => (
            <CarouselItem
              key={d.id}
              className="
            pl-6
            basis-full
            sm:basis-1/2
            lg:basis-1/3
            flex justify-center
          "
            >
              <div className="w-full max-w-3xl h-[450px]">
                <DoctorCard doctor={d} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
