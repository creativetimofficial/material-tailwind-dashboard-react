import { ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/solid";

export const layoutData = {
  homePage: {
    dashboradConfiguratorTitle: "تنظیمات داشبورد",
    dashboradConfiguratorSubtitle: "گزینه‌های داشبورد ما را ببینید.",
    dashboradConfiguratorSelectLanguage: "انتخاب زبان",
    dashboradSidenavColorsTitle: "رنگ‌های نوارکناری",
    dashboradSidenavTypesTitle: "انواع نوارکناری",
    dashboradSidenavTypesSubtitle: "یکی از سه نوع نوارکناری را انتخاب کنید.",
    dashboradSidenavNavbarType: "هدر ثابت",
    projectsHeader: "پروژه‌ها",
    projectsSubHeader: "این ماه 30 پروژه انجام شده است.",
    projectsMenuItems: ["اقدام", "اقدامی دیگر", "یک اقدام دیگر"],
    projectsTableHeaders: ["شرکتها", "اعضا", "بودجه", "تکمیل"],
    ordersOverviewHeader: "نگاهی بر سفارش‌ها",
    ordersOverviewSubHeader:  "این ماه 24 درصد",
  },
  profilePage: {
    profileName: "",
    profileSkill: "",
    tabs:[
      { 
        value: "app", 
        icon: HomeIcon, 
        label: "اپ", 
        className: "-mt-1 me-2 inline-block h-5 w-5" 
      },
      { 
        value: "message", 
        icon: ChatBubbleLeftEllipsisIcon, 
        label: "پیام", 
        className: "-mt-0.5 me-2 inline-block h-5 w-5" 
      },
      { 
        value: "settings", 
        icon: Cog6ToothIcon, 
        label: "تنظیمات",
        className: "-mt-1 me-2 inline-block h-5 w-5" 
      },
    ]
  }
}