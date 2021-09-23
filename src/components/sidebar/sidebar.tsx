import Image from "next/image";
import logoutPic from "../../../public/logout.svg";

import { MainSidebarData } from "./sidebar-data";
import SidebarItem from "./sidebar-item";

const Sidebar = ({ children }: any) => {
  const sidebarItems = MainSidebarData;
  return (
    <div className="shadow bg-base-200 drawer drawer-mobile h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="flex flex-col drawer-content">
        <div className="w-full navbar bg-base-300 fixed md:static z-10">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <button className="w-full flex justify-end items-center py-3 px-6 text-gray-600 cursor-pointer focus:outline-none">
            <div className={`flex justify-end items-center h-8 w-8`}>
              <Image
                src={logoutPic}
                alt="Picture of the author"
                height={20}
                width={20}
                layout="intrinsic"
              />
            </div>
          </button>
        </div>
        <div className="flex flex-col px-4 pt-20 md:p-6 drawer-content">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay text-black"
        ></label>

        <ul className="menu py-4 overflow-y-auto w-72 bg-base-100 text-base-content side-bar__color">
          <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
            <div className="flex justify-center items-center">
              <p className={`text-4xl py-4 text-white`}>Admin</p>
            </div>
            <hr />
          </div>

          <label className="text-xs m-3 text-white">Dashboard Menu</label>
          {sidebarItems.map((item, index) => {
            return (
              <SidebarItem
                key={`item-${index}`}
                title={item.title}
                child={item.child}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
