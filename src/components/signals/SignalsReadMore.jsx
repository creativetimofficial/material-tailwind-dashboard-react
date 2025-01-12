import ReadMoreComonent from "../ReadMoreComonent";
import { useLang } from "@/hooks/LangContext";

function SignalsReadMore({ content, title, date }) {
  const { lang } = useLang();
  return (

    <ReadMoreComonent
      date={date}
      headingData={title}
      className={
        "rounded-[8.867px]  bg-[rgb(37,37,37)]  p-[18px]  text-white flex flex-col gap-[15px] w-full"
      }
    >
      {content}
    </ReadMoreComonent>

  );
}

export default SignalsReadMore;
