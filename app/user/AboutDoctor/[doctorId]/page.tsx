"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuBar from "@/app/_components/MenuBar";
import Footer from "@/app/_components/Footer";
import { Mail, Phone, Award, GraduationCap } from "lucide-react";

type doctor = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  phoneNumber: string;
  experienceYears: number;
  clerkId: string;
};

export default function DoctorDetail() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<doctor | null>(null);

  useEffect(() => {
    if (!doctorId) return;
    fetch(`/api/getDoctorByid/${doctorId}`)
      .then((res) => res.json())
      .then(setDoctor)
      .catch(console.error);
  }, [doctorId]);

  if (!doctor)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Ачааллаж байна...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <MenuBar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-green-500 via-green-300 to-green-500">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="px-6 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-green-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src={doctor.profilePic || "/default-avatar.png"}
                  alt={doctor.username}
                  className="relative w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {doctor.username}
                    </h1>
                    <p className="text-indigo-600 font-semibold text-lg md:text-xl mb-3">
                      {doctor.experienceYears >= 10
                        ? "Ахлах мэргэжилтэн эмч"
                        : doctor.experienceYears >= 5
                        ? "Туршлагатай эмч"
                        : "Эмч"}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Идэвхтэй
                      </span>
                      <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        Баталгаажсан
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-8 bg-indigo-600 rounded-full mr-3"></div>
                Танилцуулга
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>
                  Эмч {doctor.username} нь {doctor.experienceYears} жилийн
                  туршлагатай мэргэжлийн эмч юм.
                  {doctor.experienceYears >= 10 &&
                    " Олон жилийн ажлын туршлагаараа өвчтөнүүдэд чанартай, найдвартай үйлчилгээ үзүүлж ирсэн."}
                </p>
                <p>
                  Өвчтөнүүдэд анхааралтай хандаж, тодорхой тайлбар өгөх, зөв
                  оношлогоо, эмчилгээ хийдгээрээ алдартай. Эрүүл мэндийн
                  асуудлаар зөвлөгөө авах, үзлэгт хамрагдах шаардлагатай бол
                  холбоо барина уу.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-purple-600 rounded-full mr-3"></div>
                Үзүүлэх үйлчилгээ
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Үзлэг, оношлогоо
                    </h3>
                    <p className="text-sm text-gray-600">
                      Өвчний үед танилгаа, дэлгэрэнгүй оношилгоо хийх,
                      шаардлагатай шинжилгээ зааварчлах
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Эм зааварчилгаа
                    </h3>
                    <p className="text-sm text-gray-600">
                      Зөв эм, эмчилгээний арга зааварчлах, эмийн хэрэглээний
                      зөвлөгөө өгөх
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all">
                  <div className="w-3 h-3 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Урьдчилан сэргийлэх
                    </h3>
                    <p className="text-sm text-gray-600">
                      Эрүүл мэндийн зөвлөгөө, хяналт, урьдчилан сэргийлэх арга
                      хэмжээ
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:shadow-md transition-all">
                  <div className="w-3 h-3 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Дагаж үзэх үйлчилгээ
                    </h3>
                    <p className="text-sm text-gray-600">
                      Эмчилгээний дараах хяналт, үр дүнгийн үнэлгээ, сэргээн
                      засах
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-6 h-6 text-indigo-600 mr-2" />
                Холбоо барих
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Утасны дугаар
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {doctor.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      И-мэйл хаяг
                    </p>
                    <p className="text-gray-900 font-semibold text-sm break-all">
                      {doctor.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
                Мэргэжлийн ур чадвар
              </h3>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                  <Award className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Анагаах ухааны доктор
                  </span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {doctor.experienceYears}+ жилийн туршлага
                  </span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Баталгаажсан мэргэжилтэн
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
