'use client'
import Logo from "@/assets/logoKhaata.png";
import Image from 'next/image';

const DefaultPage = () => {
  return (
    <>
      <section className="flex items-center w-[100%] h-screen justify-center ">
        <div className="text-center bg-white h-full px-5 pt-14">
          <Image
            alt="YourKhaata.co"
            src={Logo}
            className="mx-auto h-52 rounded-full w-auto mix-blend-multiply"
          />
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome to YourKhaata.co
          </h2>

          <p className="text-gray-500 mt-4">
            Manage your business transactions effortlessly. Select an account on the left to get started.
          </p>

          <p className="text-gray-400 mt-2">
            Keep track of your credits and debits with ease, and enjoy seamless bookkeeping.
          </p>
        </div>
      </section>
    </>
  );
};

export default DefaultPage;
