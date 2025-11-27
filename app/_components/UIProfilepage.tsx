import { UserRound, Mail, Phone, Calendar, Edit, LogOut } from "lucide-react";

export default function UIProfilePage() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+976 9911-2233",
    joined: "2023-06-12",
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#D8FFF1] via-[#E9FFF8] to-[#C8FDE8] flex justify-center items-center p-6">
      <div className="w-full max-w-5xl h-[88vh] bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden animate-fadeIn flex">
        <div className="w-1/3 bg-gradient-to-br from-green-500 to-blue-600  relative text-white flex flex-col items-center p-10 justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-3 bg-white/20 backdrop-blur-xl rounded-full shadow-2xl border border-white/40">
              <UserRound size={90} className="text-white drop-shadow-xl" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-wide drop-shadow">
              {user.name}
            </h2>

            <p className="mt-2 text-white/80 text-sm font-light drop-shadow">
              Member since {user.joined}
            </p>

            <div className="mt-10 w-full space-y-5 text-left px-2">
              <p className="text-white/90 flex items-center gap-3 text-sm">
                <Mail size={20} className="opacity-90" /> {user.email}
              </p>
              <p className="text-white/90 flex items-center gap-3 text-sm">
                <Phone size={20} className="opacity-90" /> {user.phone}
              </p>
              <p className="text-white/90 flex items-center gap-3 text-sm">
                <Calendar size={20} className="opacity-90" /> Joined:{" "}
                {user.joined}
              </p>
            </div>
          </div>
        </div>

        <div className="w-2/3 p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-semibold text-green-700 mb-8 tracking-tight">
              Profile Details
            </h3>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  You can edit your personal details, contact information and
                  update your account settings anytime. Keeping your profile up
                  to date ensures a better medical assistance experience.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-gray-800">
                  Health Preferences
                </h4>
                <p className="text-gray-600 mt-2">
                  (Coming soon) Add allergies, preferred pharmacies, and your
                  medical history to receive more relevant suggestions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 shadow-xl hover:shadow-green-300 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
              <Edit size={22} />
              Edit Profile
            </button>

            <button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 shadow-xl hover:shadow-red-300 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
              <LogOut size={22} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
