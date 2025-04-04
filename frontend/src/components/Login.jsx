import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
// Import the addUser action from your Redux store
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    farmType: "crop", // Default value
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const loginRes = await axios.post(
        `${BASE_URL}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      
      console.log("Login response:", loginRes.data);
      
      // Store user data in localStorage
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      
      // Dispatch user to Redux store
      dispatch(addUser(loginRes.data.user));
      
      // Navigate to the dashboard
      navigate('/');
    } catch (loginErr) {
      console.error("Login error:", loginErr);
      setErrors({ 
        form: loginErr.response?.data?.message || "Login failed. Please check your credentials." 
      });
    }
    
  };
  
  const handleSignUp = async () => {
    try {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.farmType) {
        setErrors({ form: "All fields are required" });
        return;
      }
      
      // Register the user
      const signupRes = await axios.post(
        `${BASE_URL}/signup`,
        formData,
        { withCredentials: true }
      );
      
      console.log("Signup response:", signupRes.data);
      
      // Store user data in localStorage
      localStorage.setItem('token', signupRes.data.token);
      localStorage.setItem('user', JSON.stringify(signupRes.data.user));
      
      // Dispatch user to Redux store
      dispatch(addUser(signupRes.data.user));
      
      // Navigate to the dashboard
      navigate('/');
    } catch (signupErr) {
      console.error("Signup error:", signupErr);
      setErrors({ 
        form: signupErr.response?.data?.message || "Registration failed. Please try again." 
      });
    }
  };
  
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Farm Type</span>
                  </div>
                  <select
                    name="farmType"
                    value={formData.farmType}
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChange}
                  >
                    <option value="crop">Crop</option>
                    <option value="livestock">Livestock</option>
                    <option value="mixed">Mixed</option>
                    <option value="organic">Organic</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
            </label>
          </div>
          {errors.form && <p className="text-red-500">{errors.form}</p>}
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
