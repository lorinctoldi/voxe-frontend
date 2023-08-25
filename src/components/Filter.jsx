import { useState } from "react";

export default function Filter(props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(props.title);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="backdrop-blur-[45px] shadow-[1.5px_3.5px_3.5px_rgba(0,0,0,0.25)] rounded-xl bg-[rgba(240,240,240,0.1)] mb-3"
    >
      <button className="text-[100%] leading-[1.15] normal-case cursor-pointer bg-transparent text-inherit items-center justify-between w-full text-left flex m-0 p-5 border-0">
        <div className="lg:flex flex-1">
          <h4 className="text-[22px] leading-[120%] tracking-[0] flex-1">
            {title}
          </h4>
          <div className="items-center flex mt-1">
            <div
              className={`h-3 w-3 mr-1.5 rounded-[100%] ${
                active ? "bg-[#bdffa6]" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs leading-[140%] tracking-[0.04em]">
              {active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="w-4 h-4 flex justify-center ml-6">
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 2"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M0 1a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 25"
              aria-hidden="true"
            >
              <g
                fill="currentColor"
                fillRule="evenodd"
                clipPath="url(#plus_svg__a)"
                clipRule="evenodd"
              >
                <path d="M24 13.5H0v-2h24v2Z"></path>
                <path d="M13 .5v24h-2V.5h2Z"></path>
              </g>
              <defs>
                <clipPath id="plus_svg__a">
                  <path fill="#fff" d="M0 .5h24v24H0z"></path>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </button>
      <div
        className="h-[0] transition-[height] duration-[.4s] overflow-hidden"
        style={{
          height: open
            ? props.data
              ? `${Math.ceil(props.data.length / 2) * 80}px`
              : "50px"
            : "0",
          maxHeight: "300px",
        }}
      >
        <div className="pt-0 pb-5 px-5 relative">
          {" "}
          {!props.data ? (
            <p className="mb-6 m-0">{props.error}</p>
          ) : (
            <>
              <div
                className="absolute top-[-5px] h-[30px] w-full pointer-events-none bg-[linear-gradient(_rgba(24,24,24,0.7)_0%,rgba(24,24,24,0)_100%_)]"
                style={{
                  opacity: Math.ceil(props.data.length / 2) > 3 ? 1 : 0,
                }}
              ></div>
              <div
                className="absolute bottom-[-2px] h-[100px] w-full pointer-events-none  bg-[linear-gradient(_rgba(24,24,24,0)_0%,rgba(24,24,24,1)_100%_)]"
                style={{
                  opacity: Math.ceil(props.data.length / 2) > 3 ? 1 : 0,
                }}
              ></div>
              <ul
                className="md:grid grid-cols-[repeat(2,1fr)] gap-3 m-0 p-0 overflow-scroll h-[290px] scroll-smooth"
                style={{
                  height: open
                    ? props.data
                      ? `${Math.ceil(props.data.length / 2) * 70}px`
                      : "50px"
                    : "0",
                  maxHeight: "290px",
                }}
              >
                {props.data.map((entry) => {
                  return (
                    <li
                      className="mb-3 md:mb-0 col-[span_1]"
                      key={entry.label}
                      onClick={() => {
                        setActive(true);
                        setTitle(
                          entry.label[0].toUpperCase() +
                            entry.label.slice(1, entry.label.length)
                        );
                        props.stateChanger(entry);
                      }}
                    >
                      <div className="select-none">
                        <div className="w-full inline-block no-underline text-inherit cursor-pointer rounded-lg">
                          <div className="flex items-center justify-center w-auto transition-[0.2s] duration-[all] border px-6 py-4 rounded-lg border-solid border-current capitalize">
                            {entry.label}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
