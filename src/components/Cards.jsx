import { useEffect, useState } from "react";

export default function Cards(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.data && props.data.length) {
      const newDataSlice = props.data.slice(
        pageNumber * 9,
        (pageNumber + 1) * 9
      );
      setData((prevData) =>
        pageNumber === 0 ? [...newDataSlice] : [...prevData, ...newDataSlice]
      );
    }
  }, [pageNumber, props.data]);

  return (
    <section className="bg-black">
      <div className="w-full relative overflow-hidden text-white px-0 py-10 lg:pt-[3.75rem] lg:pb-0 lg:px-0">
        <article className="max-w-[1920px] grid-cols-8 w-full relative grid gap-[0_0.5rem] grid-flow-row items-stretch mx-auto px-4 sm:grid-cols-8 sm:gap-[0_1rem] sm:px-8 lg:grid-cols-12 lg:gap-[0_1.5rem] lg:px-14">
          <header className="col-[1/-1] whitespace-pre-wrap mb-6 lg:col-[1/span_6] lg:mb-0">
            <h2 className="text-[34px] leading-[110%] tracking-[-0.01em] sm:text-[38px]">
              A curated collection
            </h2>
          </header>
        </article>
      </div>
      <div>
        <div>
          <section className="w-full relative overflow-hidden text-black pt-0 pb-8 px-0 bg-black md:pt-0 md:pb-[3.75rem] md:px-0 lg:pt-10 lg:pb-[3.75rem] lg:px-0">
            <ul className="max-w-[1920px] grid-cols-8 w-full relative grid gap-[0_0.5rem] grid-flow-row mx-auto px-4 sm:grid-cols-8 sm:gap-[0_1rem] sm:px-8 lg:grid-cols-12 lg:gap-[0_1.5rem] lg:px-14">
              {data?.length
                ? data.map((entry) => {
                    return (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="col-[span_8/span_8] mb-6 md:col-[span_4/span_4] lg:w-auto lg:col-[span_4/span_4] lg:flex-[initial] lg:mr-0 lg:p-0 transition-all duration-[0.2s] ease-[ease-in-out] hover:scale-[1.02]"
                        href={entry.link}
                      >
                        <li className="relative block">
                          <div className="cursor-pointer">
                            <article className="w-full h-full relative flex flex-col gap-5 text-white overflow-hidden p-5 rounded-xl bg-[rgb(24,24,24)]">
                              <header className="w-full">
                                <div className="flex items-center">
                                  <div className="w-2.5 h-2.5 rounded-full mr-1.5 bg-[rgb(61,249,136)]"></div>
                                  <div className="text-[12px] leading-[140%] tracking-[0.04em]">
                                    {entry?.score?.toFixed(2) ||
                                      "No available score"}
                                  </div>
                                </div>
                                <div className="border h-px w-full mx-0 my-[0.3rem] border-b-0 border-solid border-white"></div>
                                <h1 className="text-2xl not-italic font-normal leading-[140%] tracking-[-0.24px] m-0 text-ellipsis whitespace-nowrap w-[90%] overflow-hidden">
                                  {entry.label}
                                </h1>
                              </header>
                              <div className="w-full relative overflow-hidden pb-[100%] rounded-[10px]">
                                <figure className="transition-[0.3s] duration-[cubic-bezier(0.215,0.61,0.355,1)] ease-[transform] absolute w-full h-full border m-0 rounded-[10px] border-solid border-[black] inset-0">
                                  <div className="absolute z-10 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.9)_inset] w-full h-full rounded-[10px]"></div>
                                  <div className="w-full h-full object-cover inline-block align-top relative overflow-hidden rounded-[10px]">
                                    <picture>
                                      <img
                                        className="object-cover transition-opacity duration-[0.25s] ease-linear will-change-[opacity] h-full max-w-none absolute w-full m-0 p-0 inset-0"
                                        decoding="async"
                                        loading="eager"
                                        src={
                                          entry.image
                                            ? entry.image
                                                .replace(
                                                  "rule=mo-160.jpg",
                                                  "rule=mo-640.jpg"
                                                )
                                                .replace("1t.jpg", "1.jpg")
                                            : ""
                                        }
                                        alt="ALTR"
                                      ></img>
                                    </picture>
                                  </div>
                                </figure>
                              </div>
                              <div className="items-start gap-2.5 h-full flex-col flex relative">
                                <div className="justify-start gap-2.5 items-start grid grid-cols-[repeat(2,50%)] w-full">
                                  <div>
                                    <h4 className="text-xs leading-[140%] tracking-[0.04em] uppercase text-[#919191] mt-0 mb-2 mx-0">
                                      price
                                    </h4>
                                    {parseInt(entry.price).toLocaleString(
                                      "hu-HU",
                                      {
                                        style: "currency",
                                        currency: "HUF",
                                      }
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-xs leading-[140%] tracking-[0.04em] uppercase text-[#919191] mt-0 mb-2 mx-0">
                                      year
                                    </h4>
                                    {entry.year}
                                  </div>
                                  <div>
                                    <h4 className="text-xs leading-[140%] tracking-[0.04em] uppercase text-[#919191] mt-0 mb-2 mx-0">
                                      odometer
                                    </h4>
                                    {entry.odometer} km
                                  </div>
                                  <div>
                                    <h4 className="text-xs leading-[140%] tracking-[0.04em] uppercase text-[#919191] mt-0 mb-2 mx-0">
                                      power
                                    </h4>
                                    {entry.horse_power} hp
                                  </div>
                                  <div>
                                    <h4 className="text-xs leading-[140%] tracking-[0.04em] uppercase text-[#919191] mt-0 mb-2 mx-0">
                                      {isNaN(parseInt(entry.lessThenMinimum)) ? '-' : 'smaller than min. by'}
                                    </h4>
                                    {isNaN(parseInt(entry.lessThenMinimum))
                                      ? "-"
                                      : parseInt(
                                          entry.lessThenMinimum
                                        ).toLocaleString("hu-HU", {
                                          style: "currency",
                                          currency: "HUF",
                                        })}
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </li>
                      </a>
                    );
                  })
                : ""}
            </ul>
            <div className="flex justify-center w-full">
            {data?.length < props.data.length && (
              <button
                className="flex gap-4 flex-wrap transition-all duration-200"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                <div className="select-none">
                  <div className="w-auto inline-block no-underline text-inherit cursor-pointer rounded-lg">
                    <div className="bg-black hover:bg-[rgb(221,222,226,0.2)] text-white justify-center w-auto flex items-center transition-[all] border-white border-solid border-[1px] duration-[.2s] px-4 py-2 rounded-lg">
                      Load more
                      <div className="h-4 w-4 ml-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 19 19"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M14.586 10.447H0v-2h14.586L8.293 2.154 9.707.74l8.707 8.707-8.707 8.707-1.414-1.414 6.293-6.293Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
