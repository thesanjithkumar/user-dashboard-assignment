"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`/api/orders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link
          href="/shop"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Order New Items
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded bg-white shadow">
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="font-bold">Order #{order.id}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  order.status === "PENDING" ? "bg-yellow-200" : "bg-gray-200"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right font-bold">
              Total: ${order.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
