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
    profileName: "Ricahrd Davis",
    profileSkill: "CEO / Co-Founder",
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
    ],
    platformSettings: {
      title: "Platform Settings",
      action: "Reply",
    },
    profileInfoCard: {
      title: "Profile Information",
      description: "Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
      details: {
        "first name": "Alec M. Thompson",
        mobile: "(44) 123 1234 123",
        email: "alecthompson@mail.com",
        location: "USA",
      },
      social: {
        facebook: "fa-brands fa-facebook text-blue-700",
        twitter: "fa-brands fa-twitter text-blue-400",
        instagram: "fa-brands fa-instagram text-purple-500",
      },
      action: "Edit Profile",
    },
    projects: {
      title: "Projects",
      subtitle: "Architects design houses",
      action: "View Project",
    }
  },
  "tablesPage": {
    authorsTable: {
      title: "Authors Table",
      tableHeaders: ["Author", "Function", "Status", "Employed", ""],
      action: "Edit",
    },
    projectsTable: {
      title: "Projects Table",
      tableHeaders: ["Companies", "Members", "Budget", "Completion", ""],
    }
  }
}