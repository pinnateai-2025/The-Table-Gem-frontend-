import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";

const Auth = ({ type }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(type === "login");

  /* =========================
     REDIRECT IF LOGGED IN
  ========================== */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  /* =========================
     DETECT LOGIN / SIGNUP
  ========================== */

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

  /* =========================
     VALIDATIONS
  ========================== */

  const validateEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    const regex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!regex.test(value)) {
      setPasswordError(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  /* =========================
     SUBMIT
  ========================== */

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      if (isLogin) {

        const res = await api.post("/auth/login", {
          email,
          password
        });

        const token = res.data.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        navigate("/");

      } else {

        await api.post("/auth/register", {
          name,
          email,
          password
        });

        const loginRes = await api.post("/auth/login", {
          email,
          password
        });

        const token = loginRes.data.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        navigate("/");

      }

    } catch (err) {

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

          {/* NAME */}
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

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div>

            <label className="block mb-1 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                className={`border rounded-lg w-full p-2.5 pr-10 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
                value={password}
                onChange={validatePassword}
                required
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            {passwordError && (
              <p className="text-red-600 text-sm mt-1">
                {passwordError}
              </p>
            )}

          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (

            <div>

              <label className="block mb-1 font-medium">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border border-gray-300 rounded-lg w-full p-2.5 pr-10"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>

          )}

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={passwordError || emailError}
            className="w-full bg-[rgba(13,64,23,1)] text-white py-2 rounded-lg hover:bg-[#2a4a2a] disabled:opacity-50"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        {/* SWITCH FORM */}

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