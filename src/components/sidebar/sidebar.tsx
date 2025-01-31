// import Image from "next/image";
// import logoutPic from "../../../public/logout.svg";

import { MainSidebarData } from "./sidebar-data";
import SidebarItem from "./sidebar-item";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import { useRouter } from "next/router";

const AppSidebar = ({ children, variant }: any) => {

  const router = useRouter();
  const { pathname } = router;

  const sidebarItems = MainSidebarData;
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    // <div className="shadow bg-base-200 drawer drawer-mobile h-screen">
    //   <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

    //   <div className="flex flex-col drawer-content">
    //     <div className="w-full navbar bg-base-300 fixed md:static z-10">
    //       <div className="flex-none lg:hidden">
    //         <label
    //           htmlFor="my-drawer-2"
    //           className="btn btn-square btn-ghost drawer-button lg:hidden"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             className="inline-block w-6 h-6 stroke-current"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             ></path>
    //           </svg>
    //         </label>
    //       </div>
    //       <button className="w-full flex justify-end items-center py-3 px-6 text-gray-600 cursor-pointer focus:outline-none">
    //         <div className={`flex justify-end items-center h-8 w-8`}>
    //           {/* <Image
    //             src={logoutPic}
    //             alt="Picture of the author"
    //             height={20}
    //             width={20}
    //             layout="intrinsic"
    //           /> */}
    //         </div>
    //       </button>
    //     </div>
    //     <div className="flex flex-col px-4 pt-20 md:p-6 drawer-content">
    //       {children}
    //     </div>
    //   </div>
    //   <div className="drawer-side">
    //     <label
    //       htmlFor="my-drawer-2"
    //       className="drawer-overlay text-black"
    //     ></label>

    //     <ul className="menu py-4 overflow-y-auto w-72 bg-base-100 text-base-content side-bar__color">
    //       <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
    //         <div className="flex justify-center items-center">
    //           <p className={`text-4xl py-4 text-white`}>Admin</p>
    //         </div>
    //         <hr />
    //       </div>

    //       <label className="text-xs m-3 text-white">Dashboard Menu</label>
    //       {sidebarItems.map((item, index) => {
    //         return (
    //           <SidebarItem
    //             key={`item-${index}`}
    //             title={item.title}
    //             child={item.child}
    //           />
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </div>
    // <div className="drawer">
    //   <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content">
    //     <label className="btn btn-primary drawer-button">Open drawer</label>
    //   </div>
    //   <div className="drawer-side">
    //     <label aria-label="close sidebar" className="drawer-overlay"></label>
    //     <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    //       <li><a>Sidebar Item 1</a></li>
    //       <li><a>Sidebar Item 2</a></li>
    //     </ul>
    //   </div>
    // </div>

    <Sidebar className="!border-0 !z-20">
      {/* <SidebarContent /> */}

      {variant === "default" &&
        <ul className="menu py-4 overflow-y-auto  side-bar__color h-full">
          <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
            <div className="flex justify-center items-center">
              <p className="text-xl py-4 text-white">Admin</p>
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
      }

      {variant === "rounded" &&
        <ul className="menu py-4 overflow-y-auto bg-white h-full px-2 z-20">
          <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
            <div className="flex justify-center items-center">
              <p className={`font-bold text-xl py-4 text-[#2b2b2b]`}>🍛 Foodmap!</p>
            </div>
            <hr />
          </div>
          <label className="text-xs m-3 text-white">Dashboard Menu</label>
          {sidebarItems.map((item, index) => {
            return (
              // <SidebarItem
              //   key={`item-${index}`}
              //   title={item.title}
              //   child={item.child}
              // />

              <div
                key={`item-${index}`}
                className="">
                <button className="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer bg-white hover:text-gray-700 focus:outline-none">
                  <span className="flex items-center">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>

                    <span className="mx-4 font-medium text-left">{item.title}</span>
                  </span>
                </button>
                  {item.child.map((item, index) => {
                    return (
                      <div
                        key={`sub-item-${index}`}
                        className="flex gap-y-2">
                        <div className="ml-8 h-auto border-l-2 border-[#c23531]"></div>
                        <Link
                          href={item.path}
                          className={`h-full w-full my-1 ml-4 py-2 px-6 block text-sm  hover:text-white hover:cursor-pointer rounded-2xl 
                            ${item.path === pathname
                              ? "bg-[#c23531] text-white"
                              : "bg-white hover:bg-gray-300"
                            }`}
                        >
                          {item.title}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </ul>
      }
    </Sidebar>
  );
};

export default AppSidebar;
