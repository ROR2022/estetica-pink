"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { dataLinks } from "@/components/data/dataUser";
import { FaGithub, FaLinkedin, FaFileAlt, FaHackerrank } from "react-icons/fa";
//importatemos los iconos de facebook, instagram, y ubicacion de react-icons
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { dataAvatares } from "../SignUp/SignUp";
import { DataUser } from "@/redux/userSlice";
import { useLocalStorage } from "usehooks-ts";
import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

const objIcons: any = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  ubicacion: <FaMapMarkerAlt />,
  tiktok: <FaTiktok />,
};

const navigationInit = [
  { name: "Servicios", href: "/servicios", current: false },
  { name: "Catalogo", href: "/casos", current: false },
  { name: "Contacto", href: "/contacto", current: false },
  { name: "Login", href: "/signin", current: false },
  { name: "Logout", href: "/logout", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const PinkNavbar = () => {
  const [navigation, setNavigation] = useState(navigationInit);
  const user = useSelector((state: any) => state.user);
  const [storedUser, setStoredUser] = useLocalStorage<DataUser>("userEsteticaPink", user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storedUser && user.email === "") {
      dispatch(setUser(storedUser));
    }
  }, [dispatch, storedUser, user.email]);

  useEffect(() => {
    if (user.email !== "") {
      const tempNavigation = navigationInit.filter(
        (item) => item.name !== "Login"
      );
      //console.log("tempNavigation:", tempNavigation);
      setNavigation(tempNavigation);
    } else {
      const tempNavigation = navigationInit.filter(
        (item) => item.name !== "Logout"
      );
      //console.log("tempNavigation:", tempNavigation);
      setNavigation(tempNavigation);
    }
  }, [user.email]);

  useEffect(() => {
    if (user.email !== "" && user.email !== storedUser.email) {
      setStoredUser(user);
    }
  }, [user, setStoredUser, storedUser]);
  useEffect(() => {}, [navigation]);

  const handleLogout = () => {
    //dispatch(logout());
  };

  useEffect(() => {
    //console.log("user:", user);
  }, [user]);

  const handleNavigation = (name: string) => {
    const newNavigation = navigation.map((item) => {
      if (item.name === name) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    setNavigation(newNavigation);
  };

  const handleClearNavigation = () => {
    const newNavigation = navigation.map((item) => {
      item.current = false;
      return item;
    });
    setNavigation(newNavigation);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton 
            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    onClick={() => handleNavigation(item.name)}
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div className="flex flex-shrink-0 items-center">
              <Link href={"/"} onClick={handleClearNavigation}>
                <h3 className="text-white text-2xl font-bold">
                  {user.username ? user.username : "Estetica Pink"}
                </h3>
              </Link>
            </div>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt="icon"
                    src={
                      user.avatar
                        ? dataAvatares.find((el) => el.title === user.avatar)
                            ?.url || "logoPink1.jpg"
                        : "/logoPink1.jpg"
                    }
                    className=" rounded-full"
                    width={42}
                    height={30}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {dataLinks.map((item, index) => (
                  <MenuItem key={item.name}>
                    <a
                      href={item.link}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      <div className="flex gap-2 items-center">
                        <span>{objIcons[item.icon]}</span>
                        <span>{item.name}</span>
                      </div>
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              onClick={() => handleNavigation(item.name)}
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default PinkNavbar;
