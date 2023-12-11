import { ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/solid";

export const layoutData = {
  homePage: {
    dashboradConfiguratorTitle: "Dashboard Configurator",
    dashboradConfiguratorSubtitle: "See our dashboard options.",
    dashboradConfiguratorSelectLanguage: "Select Language",
    dashboradSidenavColorsTitle: "Sidenav Colors",
    dashboradSidenavTypesTitle: "Sidenav Types",
    dashboradSidenavTypesSubtitle: "Choose between 3 different sidenav types.",
    dashboradSidenavNavbarType: "Navbar Fixed",
    projectsHeader: "Projects",
    projectsSubHeader: "30 done this month.",
    projectsMenuItems: ["Action", "Another action", "something else here"],
    projectsTableHeaders: ["companies", "members", "budget", "completion"],
    ordersOverviewHeader: "Orders Overview",
    ordersOverviewSubHeader: "This month 24%",
  },
  profilePage: {
    profileName: "",
    profileSkill: "",
    tabs:[
      { 
        value: "app", 
        icon: HomeIcon, 
        label: "App", 
        className: "-mt-1 me-2 inline-block h-5 w-5" 
      },
      { 
        value: "message", 
        icon: ChatBubbleLeftEllipsisIcon, 
        label: "Message", 
        className: "-mt-0.5 me-2 inline-block h-5 w-5" 
      },
      { 
        value: "settings", 
        icon: Cog6ToothIcon, 
        label: "Settings", 
        className: "-mt-1 me-2 inline-block h-5 w-5" 
      },
    ]
  }
}