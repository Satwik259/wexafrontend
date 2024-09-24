import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../utils/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await dispatch(registerUser(data));
      if (res.payload.success) {
        reset();
        toast.success(res.payload.data, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
        });
        navigate("/login");
      } else {
        toast.info(res.payload.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 max-w-2xl border-2 rounded-md sm:p-20 ">
        <div className="mb-4 text-center">
          <h1 className="my-2 text-4xl font-bold">Register</h1>
          <p className="text-sm ">create an account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 w">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  User name
                </label>
              </div>
              <input
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-md "
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="xxxxxx@email.com"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md "
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full px-8 py-3 font-semibold text-white bg-gray-900 rounded-md ${
                  isSubmitting ? "cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </div>
            <p className="px-6 text-sm text-center S">
              Already have an account?{" "}
              <Link
                rel="noopener noreferrer"
                to={"/login"}
                className="font-semibold hover:underline text-violet-500"
              >
                Sign in
              </Link>
              .
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
