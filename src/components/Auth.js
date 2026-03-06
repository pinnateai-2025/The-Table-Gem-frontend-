import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Auth = ({ type }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(type === "login");

  useEffect(() => {
    setIsLogin(location.pathname.includes("/login"));
  }, [location.pathname]);

  const toggleForm = () => {
    if (isLogin) {
      navigate("/register/signup");
    } else {
      navigate("/register/login");
    }
  };

  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol."
      );
    } else {
      setPasswordError("");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {

    if (isLogin) {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      // store token if backend sends one
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/");

    } else {

      // Register user
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      // Auto login
      const loginRes = await api.post("/auth/login", {
        email,
        password
      });

      // Save token
      if (loginRes.data.token) {
        localStorage.setItem("token", loginRes.data.token);
      }

      // Redirect to home
      navigate("/");

    }

  } catch (err) {

    console.log(err.response);

    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );

  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">
                Full Name
              </label>

              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full p-2.5"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">
              Your Email
            </label>

            <input
              type="email"
              className={`border rounded-lg w-full p-2.5 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="name@gmail.com"
              value={email}
              onChange={validateEmail}
              required
            />

            {emailError && (
              <p className="text-red-600 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              className={`border rounded-lg w-full p-2.5 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              value={password}
              onChange={validatePassword}
              required
            />

            {passwordError && (
              <p className="text-red-600 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[rgba(13,64,23,1)] text-white py-2 rounded-lg hover:bg-[#2a4a2a]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          {" "}

          <button
            onClick={toggleForm}
            className="text-[rgba(13,64,23,1)] font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </p>

      </div>

    </div>
  );
};

export default Auth;