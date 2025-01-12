import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { useAuth } from "@/hooks/Auth";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

export function DashboardNavbar() {
  const { account, signout, search, setSearch } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileCardRef = useRef(null);
  let photoLink = account.photoLink || "https://res.cloudinary.com/dqdt57lxl/image/upload/v1733091929/jhl718s0eucpxdyqpzqh.png";
  const nav = useNavigate()
  const toggleProfile = () => {
    setIsProfileOpen((prevState) => !prevState);
    console.log("Profile open state:", !isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && profileCardRef.current && !profileCardRef.current.contains(e.target)) {
        setIsProfileOpen(false);
        console.log("Clicked outside, closing profile card");
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen, profileCardRef]);

  const ProfileCard = () => {
    const variants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    return (
      <motion.div
        ref={profileCardRef}
        className="absolute text-blue-gray-800 top-14 md:right-14 z-50 flex flex-col justify-start items-start gap-4 w-96 p-4 rounded-2xl bg-white shadow-md shadow-blue-gray-500/80"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-16 h-16 rounded-full bg-gray-300 border-blue-gray-600 border overflow-hidden">
            <img src={photoLink} className="w-16 h-16 rounded-full object-cover" alt={`${account.firstName}'s profile photo`} />
          </div>
          <div className="flex flex-col items-start gap-1">
            {account.role !== "admin" ? account.firstName + " " + account.lastName : account.name}
            <Typography variant="small" color="blue-gray" className="font-normal">
              {account.email}
            </Typography>
          </div>
        </div>
        <Button
          variant={"text"}
          color={"blue-gray"}
          className="flex items-center gap-4 px-4 capitalize"
          fullWidth
          onClick={() => {
            signout();
            nav("/auth/sign-in")
          }}
        >
          <LogOut className="rotate-180" strokeWidth={3} />
          <Typography color="inherit" className="font-medium capitalize">
            Logout
          </Typography>
        </Button>
      </motion.div>
    );
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl relative transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input name="search" type="text" onChange={(e) => setSearch(e.target.value)} label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-7 w-7 text-blue-gray-500" />
          </IconButton>
          <Button
            onClick={toggleProfile}
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
          >
            {photoLink ? <img src={photoLink} alt={`${account.name}'s profile photo`} className="h-7 w-7  border-blue-gray-600 border rounded-full object-cover" /> : <UserCircleIcon className="h-7 w-7 text-blue-gray-500" />}
          </Button>
          <AnimatePresence>
            {isProfileOpen && <ProfileCard />}
          </AnimatePresence>
          <IconButton
            variant="text"
            onClick={toggleProfile}
            color="blue-gray"
            className="grid xl:hidden"
          >
            {photoLink ? <div className="w-7 h-7 overflow-hidden border-blue-gray-600 border rounded-full"><img src={photoLink} alt={`${account.name}'s profile photo`} className="h-7 w-7 rounded-full object-cover" /></div> : <UserCircleIcon className="h-7 w-7 text-blue-gray-500" />}
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-7 w-7 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;