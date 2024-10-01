import Login from "@/components/login/LoginForm";
import RegisterForm from "@/components/register/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className={`lg:flex items-center justify-center w-full  `}>
      <div
        className={`lg:w-full bg-[url("/login-bg.png")]  w-full flex flex-col h-screen  justify-center items-center  bg-cover bg-no-repeat  `}
      >
        <div className="rounded-md h-96 lg:h-auto  w-full lg:w-[30%] lg:px-20 lg:py-10 px-5 bg-sanLightBlue py-5 flex flex-col justify-center lg:justify-start items-center">
          <div className="flex flex-col justify-center items-center  my-2 ">
            <h1 className="lg:text-4xl text-3xl font-bold pb-5 lg:pb-10">
              Sign Up
            </h1>
            <p className="text-lg text-black">
              Enter your email to sign up for this app
            </p>
          </div>
          <RegisterForm />
          <div className="flex justify-between items-center gap-2 mt-5">
            <div className="bg-white h-0.5 w-20" />
            <p className=" text-md text-gray-500">or continue with</p>
            <div className="bg-white h-0.5 w-20" />
          </div>

          <div className="flex justify-center w-full">
            <button
              // disabled={loading}
              className="px-5 py-3 w-full flex justify-between items-center md:w-full text-black font-bold text-lg bg-gray-200 rounded-md mt-5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_10_554)">
                  <path
                    d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1991 19.9314C12.9526 19.9314 15.2642 19.0455 16.9526 17.5175L13.7345 15.0814C12.8733 15.6682 11.7175 16.0779 10.1991 16.0779C7.5023 16.0779 5.2134 14.3395 4.39747 11.9367L4.27787 11.9466L1.12991 14.3273L1.08875 14.4392C2.76576 17.6946 6.21048 19.9314 10.1991 19.9314Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.3976 11.9367C4.18231 11.3166 4.05771 10.6522 4.05771 9.96571C4.05771 9.27915 4.18231 8.61479 4.38627 7.99472L4.38057 7.86266L1.19316 5.44373L1.08888 5.4922C0.397698 6.84311 0.00109863 8.36014 0.00109863 9.96571C0.00109863 11.5713 0.397698 13.0882 1.08888 14.4391L4.3976 11.9367Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1991 3.85336C12.1141 3.85336 13.4058 4.66168 14.1424 5.33718L17.0205 2.59107C15.2529 0.985496 12.9526 0 10.1991 0C6.21048 0 2.76576 2.23672 1.08875 5.49214L4.38614 7.99466C5.2134 5.59183 7.5023 3.85336 10.1991 3.85336Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10_554">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p>Google</p>
              <div></div>
            </button>
           
          </div>
          <div className="text-center flex items-end gap-2 text-lg lg:mt-5">
            <div>
              <p className=" text-md text-Hwhite text-gray-500">
                By clicking the
                <Link href="/" className="font-bold text-black font-bold px-1 ">
                  Login
                </Link>
                button, you <br />{" "}
                <span className="font-bold text-black font-bold px-1 cursor-pointer ">
                  {" "}
                  <Link target="_blank" href="#">
                    agree to our Terms & Conditions
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="text-center flex flex-col gap-2 text-lg my-2">
          <div>
            <p className=" text-md text-Hwhite">
            Sign Up
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
