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
            className="mx-auto  rounded-full "
            width={250}
            height={250}
            unoptimized
            priority 
          />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
        Welcome to Your Khaata!
      </h2>

          <p className="text-gray-600 font-serif mt-4">
            Manage your business transactions effortlessly. Select an account on the left to get started.
          </p>

          <p className="text-gray-600 mt-2 font-serif">
            Keep track of your credits and debits with ease, and enjoy seamless bookkeeping.
          </p>
        </div>
      </section>
    </>
  );
};

export default DefaultPage;
