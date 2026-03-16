import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register/login");
      return;
    }
    api.get("/order/my-orders")
      .then(res => setOrders(res.data))
      .catch(() => navigate("/register/login"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><div className="p-8">Loading orders...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-16 p-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="capitalize text-sm text-gray-500">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-bold mt-2">₹{order.totalAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;