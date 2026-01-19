"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Transform cart to order items
    const items = cart.map((p) => ({ productId: p.id, quantity: 1 }));

    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ userId: Number(userId), items, total }),
    });

    router.push("/dashboard");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{p.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">${p.price}</span>
              <button
                onClick={() => addToCart(p)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg flex justify-between items-center max-w-4xl mx-auto">
          <span className="font-bold text-xl">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0)}
          </span>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded font-bold"
          >
            Checkout ({cart.length})
          </button>
        </div>
      )}
    </div>
  );
}
