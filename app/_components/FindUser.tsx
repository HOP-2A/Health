import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

type user = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
};

export default function FindUser() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  useEffect(() => {
    const findUsers = async () => {
      const res = await fetch("/api/find-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          input: input,
        }),
      });
      const user: user[] = await res.json();
      setUsers(user);
    };

    findUsers();
  }, [input]);

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-gray-300  mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          xүн хайх
        </h2>
        <div
          className="relative group 
          backdrop-blur-xl bg-white/40 border border-white/60 
          shadow-[0_0_20px_rgba(0,255,120,0.15)]
          hover:shadow-[0_0_30px_rgba(0,255,120,0.3)]
          rounded-2xl p-5 transition-all duration-500"
        >
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600 group-hover:text-green-700 transition-colors duration-300"
            size={30}
          />

          <input
            type="text"
            onChange={(e) => handleInputValue(e)}
            placeholder="Энд бичээд xүнээ хайгаарай..."
            className="
              pl-14 pr-4 py-3 w-full 
              bg-transparent text-gray-800 placeholder-gray-800 text-lg
              focus:outline-none 
              group-hover:placeholder-gray-400 
              transition-all duration-300
            "
          />
        </div>
      </div>
    </div>
  );
}
