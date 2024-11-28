import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    const base64Payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    return decodedPayload;
  };

  const handleLoginSuccess = (response) => {
    console.log("Google Login Successful", response);
    const decodedUser = decodeJWT(response.credential);
    const user = {
      name: decodedUser.name,
      email: decodedUser.email,
      picture: decodedUser.picture,
    };
    setUser(user);
    navigate("/dashboard");
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed", error);
  };

  const handleGuestLogin = () => {
    // Simulate guest user data
    const guestUser = {
      name: "Guest User",
      email: "guest@example.com",
      picture: "https://via.placeholder.com/150",
    };
    setUser(guestUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }}>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-300">
          <div className="text-center">
            <GiShoppingBag className="mx-auto h-16 w-16 text-emerald-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to Fresh Picks
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to start your fresh shopping experience
            </p>
          </div>
          <div className="mt-8">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              useOneTap
              render={({ onClick }) => (
                <button
                  onClick={onClick}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaGoogle className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
                  </span>
                  Sign in with Google
                </button>
              )}
            />
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGuestLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300"
              >
                Guest Login
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            By signing in, you agree to our{" "}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
