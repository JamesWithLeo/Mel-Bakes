import { Link } from "react-router-dom";
import Gallary from "../GallerySlideshow/GallerySlideshow";
export default function GuestHome() {
  return (
    <div
      id="mainWrapper"
      className="max-h-screen-lg flex h-screen max-h-[1000px] w-full items-center justify-center"
    >
      <main className="flex max-w-7xl flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <div
          id="welcomeContainer"
          className="flex flex-col justify-between p-4 text-justify md:w-1/2 lg:p-0 lg:pl-8"
        >
          <h1 className="my-2 font-[Lobster] text-2xl text-[#424874] md:text-3xl lg:text-5xl">
            Welcome to&#160;
            <span className="bg-[#424874] px-2 py-0 font-[Lobster] text-white">
              Mel Bakes.
            </span>
          </h1>
          <p className="my-2 font-[Raleway] text-xs text-[#424874] lg:text-sm">
            Every bite tells a story of freshness and flavor, Our deliciously
            baked cupcakes, cakes, and bread are crafted with the finest
            ingredients and a dash of love... Perfect for any occasion, Whether
            you’re celebrating a birthday wedding, holiday, or just indulging
            your sweet tooth, our delightful treats promise to bring joy and
            satisfaction. Discover the perfect blend of taste and quality with
            every order from Mel Bakes, your go-to destination for freshly baked
            goodness for all life's special moments.
          </p>

          <Link
            className="h-max w-max self-center rounded-sm bg-[#424874] px-4 py-2 text-white"
            to={"signin"}
            id="loginButton"
          >
            Taste Now!
          </Link>
        </div>
        <div
          id="gallaryContainer"
          className="flex flex-col items-center justify-between md:w-1/2"
        >
          <Gallary />
        </div>
      </main>
    </div>
  );
}
