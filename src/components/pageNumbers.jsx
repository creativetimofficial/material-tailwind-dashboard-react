import { useState,useEffect } from "react";
import { useLang } from "@/hooks/LangContext"

const PageNumbers = ({ pagesNumber, page = 1, next, prev }) => {
  const [show,setShow] = useState(window.innerWidth < 500)
  useEffect(() => {
		addEventListener("resize", () => {
			if (window.matchMedia("(min-width: 500px)").matches) {
				setShow(false);
			} else if(window.matchMedia("(max-width: 382px)").matches) {
      setShow("smallest")
      }else {
				setShow(true);
      }
		});
	}, []);
  const {lang} = useLang();
    const maxPagesToShow = show === "smallest"?2:show?3:10;

    // Determine the range of pages to show
    let startPage, endPage;
    if (pagesNumber <= maxPagesToShow) {
        startPage = 1;
        endPage = pagesNumber;
    } else {
        if (page <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (page + Math.floor(maxPagesToShow / 2) >= pagesNumber) {
            startPage = pagesNumber - maxPagesToShow + 1;
            endPage = pagesNumber;
        } else {
            startPage = page - Math.floor(maxPagesToShow / 2);
            endPage = page + Math.floor(maxPagesToShow / 2);
        }
    }

    let number = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center  gap-4">
            <button
                onClick={() => prev()}
                className="flex items-center gap-6 px-2 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                disabled={page === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                {lang === "ar"?"قبل":"Previous"}
            </button>
            <div className="flex items-center gap-2">
                {number.map((num) => (
                    <button
                        key={num}
                        onClick={() => next(num)}
                        className={
                            num !== page ? "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" :
                                "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        }

                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            {num}
                        </span>
                    </button>
                ))}
            </div>
            <button
                onClick={() => next()}
                className="flex items-center gap-6 px-2 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                disabled={page === pagesNumber}
            >
                {lang === "ar"?"بعد":"Next"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
            </button>
        </div>
    );
};

export default PageNumbers;