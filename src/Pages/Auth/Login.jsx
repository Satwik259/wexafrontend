import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await dispatch(loginUser(data));
      if (res.payload.success) {
        toast.success(res.payload.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
        });
        navigate("/dashboard");
        reset();
      } else {
        toast.error(res.payload.message, {
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
      <div className="flex flex-col  flex-1 max-w-lg p-6 border-2 rounded-md sm:p-20 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm ">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="leroy@jenkins.com"
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
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline "
                >
                  Forgot password?
                </a>
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
                className="w-full px-8 py-3 font-semibold text-white bg-gray-900 rounded-md"
              >
                {isSubmitting ? "Loading..." : "Sign in"}
              </button>
            </div>
            <p className="px-6 text-sm text-center S">
            Dont have an account yet?{" "}
              <Link
                rel="noopener noreferrer"
                to={"/register"}
                className="font-semibold hover:underline text-violet-500"
              >
                Sign up
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

export default Login;
