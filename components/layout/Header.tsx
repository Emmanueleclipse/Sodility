"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// COMPONENTS
import { Button, DropDown, SearchInput } from "@/components/shared";
import { P1, SubH1 } from "../typography";
// Icons
import { FaAngleDown } from "react-icons/fa";

// ASSETS
import userPlaceholder from "@/assets/index/avatar.png";
import logo from "@/assets/logo.png";

// ==========================================
// HEADER LAYOUT COMPONENT ==================
// ==========================================
export default function Header() {
  const pathname = usePathname();
  const connectedUser =
    pathname === "/supporter"
      ? true
      : pathname === "/creator-creator"
      ? true
      : false;

  const userType =
    pathname === "/supporter"
      ? "supporter"
      : pathname.includes("/creator")
      ? "creator"
      : "public";

  return (
    <header className="py-7 border-b border-b-appGray-400">
      <div className="md:w-[90%] mx-auto  px-6 flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
          <a href="/#">
            <Image src={logo} alt="logo" />
          </a>
          <SearchInput />
        </div>

        {/* navigation  */}
        {userType === "public" && (
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <Navigation />
            <Button
              variant="primary"
              className="py-3"
              action={() => {}}
              type="button"
            >
              Get Started
            </Button>
          </div>
        )}
        {userType === "supporter" && connectedUser ? (
          <SupporterNavigation />
        ) : userType === "creator" && connectedUser ? (
          <CreatorNavigation />
        ) : userType !== "public" && !connectedUser ? (
          <Button action={() => {}}>ConnectDash</Button>
        ): null}
      </div>
    </header>
  );
}

// EXTENDED COMPONENTS ======================
const Navigation = () => {
  const pathname = usePathname();

  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    { name: "Home", link: "/", active: pathname === "/", hasDropDown: false },
    {
      name: "Explore",
      link: "/explore",
      active: pathname === "/explore/*",
      hasDropDown: true,
      dropDown: {
        left: [
          {
            name: "Writers & Journalists",
            link: "/explore/writers-and-journalists",
          },
          { name: "Gaming Creators", link: "/explore/gaming-creators" },
          { name: "Non-Profits", link: "/explore/non-profits" },
          { name: "Local Businesses", link: "/explore/local-business" },
          {
            name: "Tutorials & Education",
            link: "/explore/tutorials-and-education",
          },
        ],
        right: [
          { name: "Podcasters", link: "/explore/podcasters" },
          { name: "Video Creators", link: "/explore/video-creators" },
          { name: "Musicians", link: "/explore/musicians" },
          { name: "Visual Artists", link: "/explore/visual-artist" },
          { name: "Communities", link: "/explore/communities" },
        ],
      },
    },
    {
      name: "About",
      link: "/about",
      active: pathname === "/about",
      hasDropDown: false,
    },
    {
      name: "Login",
      link: "/login",
      active: pathname === "/login",
      hasDropDown: false,
    },
  ];

  // RETURN ==============================================================
  return (
    <nav className="flex gap-10">
      {navList.map(navItem => (
        <div key={navItem.name} className="flex">
          {navItem.hasDropDown ? (
            <div
              onClick={() => setDropDownActive(!dropDownActive)}
              className={`text-sm cursor-pointer relative`}
            >
              <div
                className={`${
                  dropDownActive
                    ? "text-black font-semibold hover:text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm  flex gap-1 items-center`}
              >
                <SubH1>{navItem.name}</SubH1>
                {navItem.hasDropDown && (
                  <FaAngleDown
                    className={`${
                      dropDownActive && "rotate-180"
                    } transition duration-300`}
                  />
                )}
              </div>
              {dropDownActive && navItem.hasDropDown && (
                <DropDown
                  parentPositionAndPadding="top-10 left-[-100%] p-5"
                  arrowPosition="-top-2 left-20"
                >
                  <ul className="py-2 pt-5 bg-white relative flex justify-between">
                    <div>
                      {navItem.dropDown!.left.map(dropDownItem => (
                        <Link
                          key={dropDownItem.name}
                          href={dropDownItem.link}
                          onClick={() => setDropDownActive(!dropDownActive)}
                          className={`${
                            navItem.active
                              ? "text-primary"
                              : "text-[#393e49] hover:text-primary"
                          } text-sm`}
                        >
                          <li className="px-4 py-2 ">{dropDownItem.name}</li>
                        </Link>
                      ))}
                    </div>
                    <div>
                      {navItem.dropDown!.right.map(dropDownItem => (
                        <Link
                          key={dropDownItem.name}
                          href={dropDownItem.link}
                          onClick={() => setDropDownActive(!dropDownActive)}
                          className={`${
                            navItem.active
                              ? "text-primary"
                              : "text-[#393e49] hover:text-primary"
                          } text-sm`}
                        >
                          <li className="px-4 py-2 ">{dropDownItem.name}</li>
                        </Link>
                      ))}
                    </div>
                  </ul>
                </DropDown>
              )}
            </div>
          ) : (
            <Link
              key={navItem.name}
              href={navItem.link}
              onClick={() => setDropDownActive(false)}
              className={`${
                navItem.active
                  ? "text-primary font-semibold"
                  : "text-[#393e49] hover:text-primary"
              } text-sm`}
            >
              <SubH1>{navItem.name}</SubH1>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

const SupporterNavigation = () => {
  const pathname = usePathname();
  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    {
      name: "Dashboard",
      link: "/supporter",
      active: pathname === "/supporter",
    },
    {
      name: "My Page Settings",
      link: "/",
      active: pathname === "/page-settings",
    },
    {
      name: "My Profile",
      link: "/",
      active: pathname === "/profile",
    },
    {
      name: "Settings",
      link: "/",
      active: pathname === "/settings",
    },
    {
      name: "Help & FAQ",
      link: "/",
      active: pathname === "/faq",
    },
    {
      name: "Log Out",
      link: "/",
      active: pathname === "/log-out",
    },
  ];

  // RETURN   ==================================================
  return (
    <nav
      className="flex gap-2 items-center cursor-pointer relative"
      onClick={() => setDropDownActive(!dropDownActive)}
    >
      <P1>JohnDoe</P1>
      <div className="">
        <Image
          src={userPlaceholder}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div>
        <FaAngleDown
          className={`${
            dropDownActive && "rotate-180"
          } transition duration-300`}
        />
      </div>
      {/* dropDown navigation  */}
      {dropDownActive && (
        <DropDown
          parentPositionAndPadding="top-16 right-0 !w-48 p-3"
          arrowPosition="-top-2 right-7"
        >
          <ul className="py-2 pt-5 bg-white relative flex flex-col justify-between">
            {navList.map(navItem => (
              <Link
                key={navItem.name}
                href={navItem.link}
                onClick={() => setDropDownActive(!dropDownActive)}
                className={`${
                  navItem.active
                    ? "text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm`}
              >
                <li className="px-4 py-2 ">{navItem.name}</li>
              </Link>
            ))}
          </ul>
        </DropDown>
      )}
    </nav>
  );
};

const CreatorNavigation = () => {
  const pathname = usePathname();
  const [dropDownActive, setDropDownActive] = useState(false);

  const navList = [
    {
      name: "Dashboard",
      link: "/creator-creator",
      active: pathname === "/creator-creator",
    },
    {
      name: "Add Post",
      link: "/",
      active: pathname === "/add post",
    },
    {
      name: "My Page",
      link: "/",
      active: pathname === "/page-settings",
    },
    {
      name: "Creator Settings",
      link: "/",
      active: pathname === "/settings",
    },
    {
      name: "My Profile",
      link: "/",
      active: pathname === "/profile",
    },
    {
      name: "Help & FAQ",
      link: "/",
      active: pathname === "/faq",
    },
    {
      name: "Log Out",
      link: "/",
      active: pathname === "/log-out",
    },
  ];

  // RETURN   ==================================================
  return (
    <nav
      className="flex gap-2 items-center cursor-pointer relative"
      onClick={() => setDropDownActive(!dropDownActive)}
    >
      <P1>JohnDoe</P1>
      <div className="">
        <Image
          src={userPlaceholder}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div>
        <FaAngleDown
          className={`${
            dropDownActive && "rotate-180"
          } transition duration-300`}
        />
      </div>
      {/* dropDown navigation  */}
      {dropDownActive && (
        <DropDown
          parentPositionAndPadding="top-16 right-0 !w-48 p-3"
          arrowPosition="-top-2 right-7"
        >
          <ul className="py-2 pt-5 bg-white relative flex flex-col justify-between">
            {navList.map(navItem => (
              <Link
                key={navItem.name}
                href={navItem.link}
                onClick={() => setDropDownActive(!dropDownActive)}
                className={`${
                  navItem.active
                    ? "text-primary"
                    : "text-[#393e49] hover:text-primary"
                } text-sm`}
              >
                <li className="px-4 py-2 ">{navItem.name}</li>
              </Link>
            ))}
          </ul>
        </DropDown>
      )}
    </nav>
  );
};
