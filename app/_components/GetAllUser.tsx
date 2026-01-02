"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Heart,
  ShoppingCart,
  Activity,
  Package,
  User,
} from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  illnesses: {
    id: string;
    name: string;
  }[];
  likes: {
    id: string;
    medicine: {
      id: string;
      name: string;
      price: number;
    };
  }[];
  orders: {
    id: string;
    totalPrice: number;
    status: string;
    items: {
      id: string;
      quantity: number;
      medicine: {
        id: string;
        name: string;
        price: number;
      };
    }[];
  }[];
};

export default function GetAllUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/get-all-user");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      delivered: "bg-emerald-500",
      pending: "bg-amber-500",
      processing: "bg-blue-500",
      cancelled: "bg-red-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 px-6 pt-10 py-12">
        <div className="">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold text-white mb-7 drop-shadow-lg">
              Хэрэглэгчийн удирдлага
            </h2>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 border border-white/30">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                Нийт хэрэглэгч: {users.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div
                key={user.id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                <div className="relative rounded-2xl shadow-xl overflow-hidden border border-grey-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1487017931017-0e0d9e02bb0c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    }}
                  ></div>

                  <div className="absolute inset-0 bg-white/30"></div>

                  <div className="relative p-6 space-y-4 -mt-8">
                    <div className="flex items-start gap-4 p-4">
                      <div className="w-16 h-16 mt-1 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                        <User className="w-8 h-8 text-emerald-500" />
                      </div>

                      <div className="flex-1 mt-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <button className="mt-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition-colors">
                        Дэлгэрэнгүй
                      </button>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                      {[
                        {
                          icon: Activity,
                          count: user.illnesses.length,
                          label: "Illnesses",
                          bg: "bg-blue-50",
                          border: "border-blue-200",
                          text: "text-blue-700",
                          iconColor: "text-blue-600",
                        },
                        {
                          icon: ShoppingCart,
                          count: user.orders.length,
                          label: "Orders",
                          bg: "bg-emerald-50",
                          border: "border-emerald-200",
                          text: "text-emerald-700",
                          iconColor: "text-emerald-600",
                        },
                        {
                          icon: Heart,
                          count: user.likes.length,
                          label: "Likes",
                          bg: "bg-pink-50",
                          border: "border-pink-200",
                          text: "text-pink-700",
                          iconColor: "text-pink-600",
                        },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${item.bg} border ${item.border}`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                            <span
                              className={`text-xs font-semibold ${item.text}`}
                            >
                              {item.count} {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-5">
                      {user.illnesses.length > 0 && (
                        <div className="space-y-2 p-4 rounded-lg border border-blue-200 shadow-sm bg-white">
                          <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Эрүүл мэндийн нөхцөл байдал
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {user.illnesses.map((illness) => (
                              <span
                                key={illness.id}
                                className="px-3 py-1 rounded-lg bg-blue-50 text-xs font-medium text-blue-700 border border-blue-200"
                              >
                                {illness.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {user.likes.length > 0 && (
                        <div className="space-y-2 p-4 rounded-lg border border-pink-200 shadow-sm bg-white">
                          <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Таалагдсан эмүүд
                          </p>
                          <div className="space-y-2">
                            {user.likes.map((like) => (
                              <div
                                key={like.id}
                                className="flex justify-between items-center p-2.5 rounded-lg bg-pink-50 border border-pink-200"
                              >
                                <span className="text-sm font-semibold text-gray-700">
                                  {like.medicine.name}
                                </span>
                                <span className="text-sm font-bold text-pink-600">
                                  ₮{like.medicine.price.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {user.orders.length > 0 && (
                        <div className="space-y-2 p-4 rounded-lg border border-gray-200 shadow-sm bg-white">
                          <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Захиалга
                          </p>
                          <div className="space-y-2">
                            {user.orders.map((order) => (
                              <div
                                key={order.id}
                                className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2"
                              >
                                <div className="flex justify-between items-center">
                                  <span
                                    className={`px-3 py-1 rounded-full ${getStatusColor(
                                      order.status
                                    )} text-white text-xs font-bold uppercase`}
                                  >
                                    {order.status}
                                  </span>
                                  <span className="text-lg font-bold text-gray-800">
                                    ₮{order.totalPrice.toLocaleString()}
                                  </span>
                                </div>
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex justify-between items-center text-xs bg-white p-2 rounded"
                                  >
                                    <span className="font-medium text-gray-700">
                                      {item.medicine.name}
                                      <span className="text-emerald-600 font-bold">
                                        × {item.quantity}
                                      </span>
                                    </span>
                                    <span className="font-semibold text-gray-600">
                                      ₮{item.medicine.price.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {user.illnesses.length === 0 &&
                      user.likes.length === 0 &&
                      user.orders.length === 0 && (
                        <div className="text-center py-6">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                            <Activity className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-400 font-medium">
                            Одоогоор үйл ажиллагаа алга
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
