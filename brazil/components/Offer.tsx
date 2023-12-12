import Image from "next/image";
import React from "react";
import { BsBrowserChrome } from "react-icons/bs";
import { BsBrush } from "react-icons/bs";
import { BsBullseye } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { BsColumnsGap } from "react-icons/bs";

const Offer = () => {
  return (
    <div className="m-4 text-white">
      <div className="flex justify-center items-center ">
        <div className="flex gap-3 flex-col w-[690px]">
          <h1 className="text-4xl text-sky-400 text-center">Brazil weather </h1>
          <p className="md:text-xl text-base pb-4 text-center">
            Data visualition of the weather in Brazil.
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-rows-2 ">
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsBrowserChrome /> Web Design
            </h1>
          </div>
          <p>
            Craft visually appealing and user-friendly websites that leave a
            lasting impression on your audience. Our design experts will bring
            your digital vision to life.
          </p>
        </li>
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsCodeSlash /> Web Development
            </h1>
          </div>

          <p>
            Create robust and dynamic websites and web applications with our
            expert development services. We turn your ideas into functional and
            user-friendly online solutions.
          </p>
        </li>
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsBrush /> UI/UX Design
            </h1>
          </div>
          <p>
            Elevate the user experience and interface of your digital products
            with our design expertise. We create intuitive, engaging, and
            visually stunning user interfaces
          </p>
        </li>
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsColumnsGap /> CMS Development
            </h1>
          </div>
          <p>
            Explore a variety of website solutions with our CMS development
            services. From WordPress to Webflow and beyond, we create stunning
            website solutions to leave a lasting impression on your audience.
          </p>
        </li>
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsBullseye /> SEO
            </h1>
          </div>
          <p>
            Boost your online visibility and drive organic traffic to your
            website with our SEO services. We optimize your site to rank higher
            in search engine results.
          </p>
        </li>
        <li className="flex flex-col justify-center items-center border border-slate-700 rounded-lg bg-opacity-40 hover:bg-opacity-90 backdrop-blur-sm bg-slate-800 p-2">
          <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="flex flex-row justify-center items-center gap-2">
              <BsCalendarWeek /> Consulting
            </h1>
          </div>
          <p>
            Our experienced consultants provide in-depth analysis, strategic
            planning, and actionable recommendations to help you achieve your
            digital objectives. We work closely with you to improve every aspect
            of your online presence.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Offer;
