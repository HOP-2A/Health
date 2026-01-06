"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useClerk, UserProfile, useUser } from "@clerk/nextjs";
import {
  Mail,
  Phone,
  Edit,
  LogOut,
  User,
  Heart,
  ShoppingBag,
  Calendar,
  Award,
  Settings,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Medicine = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  ageLimit: number;
  category: string;
};

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function UIProfilePage() {
  const router = useRouter();
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const { signOut } = useClerk();
  const date = new Date("Tue Jan 08 2026 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [openProfile, setOpenProfile] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);
  const { user, setUser } = useProvider();
  const { user: clerkUser } = useUser();

  const Logout = async () => {
    setUser(null);
  };

  const completelyLogout = async (p0: { redirectUrl: string }) => {
    signOut();
    Logout();
    router.push("/");
  };

  useEffect(() => {
    if (!user) return;

    const fetchLikes = async () => {
      if (!clerkUser?.id) return;

      const res = await fetch(`/api/liked-med?userId=${clerkUser.id}`);

      if (!res.ok) {
        console.error("Failed to fetch likes:", res.status);
        return;
      }

      const data = await res.json();
      setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine));
    };

    const getOrder = async () => {
      const res = await fetch(`/api/find-order/${user.id}`);
      const datas = await res.json();
      setOrderItems(datas.items.map((d: { medicine: Medicine }) => d.medicine));
    };

    getOrder();
    fetchLikes();
  }, [user]);
  console.log(user);
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-green-600 via-green-300 to-green-600">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="px-6 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                {clerkUser?.imageUrl ? (
                  <img
                    src={clerkUser.imageUrl}
                    alt={user?.username}
                    className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover bg-white"
                  />
                ) : (
                  <div className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl bg-white flex items-center justify-center">
                    <User className="w-16 h-16 text-green-600" />
                  </div>
                )}

                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {user?.username}
                    </h1>
                    <p className="text-green-600 font-medium text-sm md:text-base mb-3 flex items-center justify-center md:justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      Бүртгүүлсэн: {formatted}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Идэвхтэй хэрэглэгч
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button
                      onClick={() => setOpenProfile(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Засах
                    </button>
                    <button
                      onClick={() => completelyLogout({ redirectUrl: "/user" })}
                      className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Гарах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-6 h-6 text-green-600 mr-2" />
                Хувийн мэдээлэл
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      И-мэйл
                    </p>
                    <p className="text-gray-900 font-semibold text-sm truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Утас
                    </p>
                    <p className="text-gray-900 font-semibold">8888-8888</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
                  <User className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Хэрэглэгчийн нэр
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {user?.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="w-6 h-6 text-green-600 mr-2" />
                Статистик
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 font-medium">
                      Таалагдсан
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    {likedItems.length}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Захиалга</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    {orderItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-red-500 rounded-full mr-3"></div>
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                Таалагдсан эмнүүд
                <span className="ml-3 text-lg text-gray-500">
                  ({likedItems.length})
                </span>
              </h3>

              {likedItems.length > 0 ? (
                <Carousel
                  opts={{ loop: true }}
                  plugins={[autoplayy.current]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {likedItems.map((med, i) => (
                      <CarouselItem
                        key={i}
                        className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100">
                          <div className="aspect-square bg-white rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                            <img
                              src={med.imageUrls[0]}
                              alt={med.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-bold text-lg text-gray-900 line-clamp-2">
                              {med.name}
                            </h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-600">
                                {med.price.toLocaleString()}₮
                              </span>
                              <Heart className="w-5 h-5 text-red-500 fill-current" />
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Таалагдсан эм байхгүй байна</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
                <ShoppingBag className="w-6 h-6 text-green-600 mr-2" />
                Захиалсан эмнүүд
                <span className="ml-3 text-lg text-gray-500">
                  ({orderItems.length})
                </span>
              </h3>

              {orderItems.length > 0 ? (
                <Carousel
                  opts={{ loop: true }}
                  plugins={[autoplay.current]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {orderItems.map((med, i) => (
                      <CarouselItem
                        key={i}
                        className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-green-100">
                          <div className="aspect-square bg-white rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                            <img
                              src={med.imageUrls[0]}
                              alt={med.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-bold text-lg text-gray-900 line-clamp-2">
                              {med.name}
                            </h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-600">
                                {med.price.toLocaleString()}₮
                              </span>
                              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Захиалсан
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Захиалга байхгүй байна</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              ✕
            </button>
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
}
