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
    profileName: "ریچارد داویس",
    profileSkill: "سئو / هم‌بنیان‌گذار",
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
    ],
    platformSettings: {
      title: "تنظیمات پلتفرم",
      action: "پاسخ",
    },
    profileInfoCard: {
      title: "اطلاعات پروفایل",
      description: "سلام، من الک تامپسون هستم، تصمیم‌گیری: اگر نمی‌توانید تصمیم بگیرید، پاسخ خیر است. اگر دو مسیر به یکسان سخت باشند، مسیری را انتخاب کنید که در کوتاه مدت دردناک‌تر است (اجتناب از درد، ایجاد یک توهم برابری است).",
      details: {
        "نام": "الک ام. تامپسون",
        "موبایل": "(44) 123 1234 123",
        "ایمیل": "alecthompson@mail.com",
        "موقعیت مکانی": "ایالات متحده آمریکا",
      },
      social: {
        facebook: "fa-brands fa-facebook text-blue-700",
        twitter: "fa-brands fa-twitter text-blue-400",
        instagram: "fa-brands fa-instagram text-purple-500",
      },
      action: "ویرایش پروفایل",
    },
     projects: {
      title: "پروژه‌ها",
      subtitle: "معماران خانه‌ها را طراحی می‌کنند",
      action: "مشاهده پروژه",
    }
  }
}