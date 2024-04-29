/**
 * Renders the Home page component.
 * @returns {JSX.Element} The rendered Home page component.
 */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 h-[44vh] text-white px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex justify-center items-end gap-4 md:gap-4 md:text-5xl text-3xl">
          Get Me a Coffee{" "}
          <span>
            <Image src={"/coffee.gif"} alt="Coffee" width={88} height={88} />
          </span>
        </div>
        <p className="text-center font-semibold text-sm md:text-lg md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <p className="text-center font-semibold text-sm md:text-lg md:text-left">
          A place where your fans can buy you a Coffee. Unleash the power of
          your fans and get your projects funded.
        </p>
        <div>
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-15"></div>

      <div className=" text-white container mx-auto pb-32 px-10 pt-16">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your Fans can buy you a Coffee
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-slate-400 rounded-full p-2 text-black"
              height={88}
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available to support you{" "}
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-slate-400 rounded-full p-2 text-black"
              height={88}
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">
            Your fans are willing to contribute financially{" "}
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className=" bg-slate-400 rounded-full p-2 text-black"
              height={88}
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">
              Your fans are ready to collaborate with you{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-15"></div>

      <div className=" text-white container mx-auto pb-32 px-10 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn More About Us
        </h2>
        <div className="w-[90%] h-[25vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
        <iframe
         className="w-full h-full"
          src="https://www.youtube.com/embed/5utdT0ksIws?si=EFcbdhYahmSBsFRB"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        </div>
      </div>
    </>
  );
}
