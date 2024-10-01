import Link from "next/link";

const EmailVerification = () => {
  return (
    <section className='h-screen w-full grid bg-[url("/login-bg.png")] place-items-center bg-contain  lg:bg-cover bg-no-repeat'>
      <form className="card h-96 lg:h-auto  w-full lg:w-[40%] lg:px-5 lg:py-10 gap-y-4 bg-sanLightBlue dark:bg-slate-900 shadow-lg flex flex-col">
        <h4 className="lg:text-3xl text-2xl text-center text-black dark:text-white font-black pb-5  text-nowrap">
          Forgot Password
        </h4>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text capitalize text-lg">Email Address</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
           className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
          />
        </div>
        <div className="mt-4">
          <Link href="/otp-verification" className="btn w-full bg-sanBlue text-white">
            Continue
          </Link>
        </div>
      </form>
    </section>
  );
};
export default EmailVerification;
