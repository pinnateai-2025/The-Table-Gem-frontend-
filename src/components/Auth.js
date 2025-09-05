import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    alert(`${isLogin ? "Login" : "Signup"} successful`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 max-[425px]:w-[380px] max-[425px]:p-6 max-[375px]:w-[330px] max-[375px]:p-4 max-[320px]:w-[300px] max-[320px]:p-2">
        <h2 className="text-2xl font-bold text-center mb-6 max-[425px]:mb-4 max-[375px]:mb-2 max-[425px]:text-[20px]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-inherit border border-gray-300 text-[gray-900] rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`bg-inherit border text-gray-900 rounded-lg block w-full p-2.5 ${emailError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                }`}
              placeholder="name@gmail.com"
              value={email}
              onChange={validateEmail}
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`bg-inherit border ${passwordError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                } text-gray-900 rounded-lg block w-full p-2.5`}
              required
              value={password}
              onChange={validatePassword}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[rgba(13,64,23,1)] text-white py-2 rounded-lg hover:bg-[#2a4a2a] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
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


