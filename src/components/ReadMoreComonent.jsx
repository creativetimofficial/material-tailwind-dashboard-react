import { useLang } from "@/hooks/LangContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarClock } from "lucide-react";

export default function ReadMoreComonent({
  children,
  className,
  date,
  headingData,
}) {
  const [readMore, setReadMore] = useState(false);
  const { lang } = useLang();
  return (
    <article className={`${className}  `}>
      {headingData && (
        <>
          <caption className="text-[26px] font-semibold text-start">
            {headingData}
          </caption>
          <section
            className={`flex-row flex gap-5 items-center  text-[17.734px]`}
          >
            <CalendarClock size={30} />
            <p>{date}</p>
          </section>
        </>
      )}

      <section>
        <motion.div
          initial={{ height: "90px" }}
          animate={readMore ? { height: "fit-content" } : { height: "90px" }}
          transition={{ type: "spring", stiffness: 40, duration: 0.5 }}
          className={`${lang === "ar" ? "text-right" : "text-left"
            } text-[#9C9C9C]  overflow-hidden text-[20px] font-semibold`}
        >
          {children}
        </motion.div>
        <span
          onClick={() => {
            setReadMore(!readMore);
          }}
          className={` ${lang === "ar" ? "justify-end text-right" : "justify-start text-left"
            }  flex  text-[#e9e9e9] cursor-pointer`}
        >
          {readMore
            ? lang === "ar"
              ? "...اقرا اقل"
              : "read less..."
            : lang === "ar"
              ? "...اقرأ اكثر"
              : "Read More..."}
        </span>
      </section>
    </article>
  );
}
