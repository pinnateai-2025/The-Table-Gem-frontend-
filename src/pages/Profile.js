import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register/login");
      return;
    }
    api.get("/auth/profile")
      .then(res => setUser(res.data.user))
      .catch(() => navigate("/register/login"));
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </Layout>
  );
};

export default Profile;