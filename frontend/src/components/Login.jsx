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
    email: "try.siddhant1@gmail.com",
    password: "Sid@123",
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
      window.dispatchEvent(new Event('authChanged'));
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
  

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
          
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
              onClick={handleLogin}
            >
             Login
            </button>
          </div>

         <p className="m-auto cursor-pointer py-2">
  New User?{" "}
  <Link to="/signup" className="text-blue-500 underline">
    Signup Here
  </Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
