import { Card, CardContent } from "@/components/ui/card";

type Doctor = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  phoneNumber: string;
  experienceYears: number;
  clerkId: string;
};

type DoctorCardProps = {
  doctor: Doctor;
};

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-3xl border border-white/20 shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:via-white/20 hover:to-white/10 transition-all duration-300 h-full">
      <CardContent className="p-6 relative flex flex-col">
        <div className="w-full overflow-hidden rounded-2xl shadow-md mb-4">
          <img
            src={doctor.profilePic}
            alt={doctor.username}
            className="w-full aspect-[4/3] object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-100 line-clamp-2">
          {doctor.username}
        </h2>

        <p className="mt-1 text-gray-300 text-sm">{doctor.email}</p>

        <p className="mt-1 text-gray-300 text-sm">
          phonenumber: {doctor.phoneNumber}
        </p>

        <span className="inline-block text-lg font-semibold text-amber-50 mt-4 bg-amber-900/20 px-4 py-1 rounded-full shadow-sm">
          {doctor.experienceYears} years experience
        </span>
      </CardContent>
    </Card>
  );
};
