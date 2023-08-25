import Filter from "../components/Filter";
import Cards from "../components/Cards";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Home() {
  const handleToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000, // Close after 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, // Use the default progress bar
      className: 'toastify-custom', // Apply the custom class
    });
  };

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const years = Array.from({ length: 124 }, (_, index) => ({
    label: String(2023 - index),
    code: 2023 - index,
  }));
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedMin, setSelectedMin] = useState(null);
  const [selectedMax, setSelectedMax] = useState(null);

  const [cars, setCars] = useState();

  const [hasznaltauto, setHasznaltauto] = useState(null);

  const loadingRef = useRef(null);

  useEffect(() => {
    fetch("/assets/filter/mobile.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.makes);
        setSelectedBrand();
      });
  }, []);

  useEffect(() => {
    fetch("/assets/filter/hasznaltauto.json")
      .then((res) => res.json())
      .then((data) => {
        setHasznaltauto(data.makes);
      });
  }, []);

  function sendRequest() {
    if(!selectedBrand) return handleToast('There is no brand selected!')
    if(!selectedModel) return handleToast('There is no model selected!')
    console.log(selectedMin, selectedMax)
    if(selectedMin?.label > selectedMax?.label) return handleToast(`Starting year exceeds ending year.`)
    setTimeout(() => {
      loadingRef.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    setLoading(true);
    for (let i = 0; i < hasznaltauto.length; i++) {
      if (hasznaltauto[i].label === selectedBrand.label) {
        for (let j = 0; j < hasznaltauto[i].options.length; j++) {
          if (hasznaltauto[i].options[j].label === selectedModel.label) {
            axios({
              method: "post",
              url: "http://localhost:8000/reverse-score",
              timeout: 300000,
              data: {
                mobileMake: selectedBrand.code,
                mobileModel: selectedModel.code,
                hasznaltautoMake: hasznaltauto[i].code,
                hasznaltautoModel: hasznaltauto[i].options[j].code,
                startYear: selectedMin?.code,
                endYear: selectedMax?.code,
              },
            })
              .then((res) => {
                setCars(res.data);
                console.log(res.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("An error occurred:", error);
              });

            break;
          }
        }
        break;
      }
    }
  }

  return (
    <>
      <section className="h-[90vh] lg:h-[100vh] relative">
        <video
          className="h-full object-cover absolute"
          controls={false}
          autoPlay
          muted
          loop
        >
          <source src="./assets/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-[2] h-full w-full">
          <div className="relative h-full max-w-[1920px] m-auto py-[2.5rem] px-[2rem] lg:p-[3.75rem]">
            <div className="h-full relative flex flex-col justify-end">
              <div className="ml-auto mr-auto grid relative w-full grid-cols-8 gap-[0_1rem] md:px-8 lg:grid-cols-12 lg:gap-[0_1.5rem] lg:px-14">
                <div className="col-[1/-1] lg:col-[1/6]">
                  <div className="shadow-[1.5px_3.5px_3.5px_rgba(0,0,0,0.25)] backdrop-blur-[45px] mb-3 p-6 rounded-[10px] lg:mb-0">
                    <svg
                      className="w-[50px] fill-none mb-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 75 36"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M.106 31.939c.52 2.861 3.164 3.969 6.092 3.969 5.716.046 9.73-3.923 11.572-5.493C17.77 33 17.392 36 20.415 36s5.904-3.185 5.904-3.185l-.472-.323c-2.456 2.493-3.684 1.523-3.684-.184 0-1.662-.048-6.739-.048-13.8 0-7.108-5.148-9.462-11.618-8.539-6.471.877-8.927 4.339-7.652 6.046 1.228 1.662 3.495-.969 6.849-1.246 2.645-.23 3.4.692 3.495 1.846.33 3-6.282 5.585-8.455 7.016-2.74 1.846-5.29 4.384-4.628 8.308ZM9.41 23.03c3.732-2.77 4.629-4.846 4.393-6.6-.284-2.308-3.118-2.908-6.188-2.585-.614.046-1.275-.092-.944-.6.85-1.385 2.928-2.538 5.384-2.585 2.881-.046 5.715 1.847 5.715 7.8v11.216c-1.18 1.108-3.59 2.584-5.337 3.323-2.503 1.154-6.423.692-7.463-1.892-1.039-2.631.709-5.308 4.44-8.077Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M36.05 35.677v-.462c-1.275-.138-3.07-.323-3.07-1.477V0h-7.368v.462c1.18.138 3.07.323 3.07 1.43V33.74c0 1.153-1.89 1.338-3.07 1.476v.462H36.05ZM36.967 10.938h3.542v19.293c0 2.63.992 5.677 5.29 5.677 4.346 0 8.03-4.847 8.36-5.4l-.425-.277c-1.653 2.03-3.637 3.508-5.904 3.508-2.55 0-2.928-2.308-2.928-4.247v-18.6h9.068v-.6h-9.068V4.015l-2.787 2.216-5.148 4.707ZM54.738 35.677h10.438v-.462c-.992-.138-3.07-.23-3.07-1.43v-9.093c0-9 3.967-11.169 6.848-11.169 3.496 0 4.204 1.616 4.818 1.616.709 0 1.228-1.2 1.228-1.985 0-1.477-1.748-2.954-3.967-3h-.331c-.567 0-1.134.092-1.748.277-2.55.83-5.667 3.923-6.848 9v-1.662l.047-3.046c0-1.846-.094-3.646-.52-4.43h-4.77c.661 1.522.945 5.4.945 7.8v15.692c0 1.2-1.89 1.292-3.07 1.43v.462Z"
                      ></path>
                    </svg>
                    <h3 className="mb-7 text-3xl leading-[120%] tracking-[-0.01em]">
                      From the F1 Grand Prix to the Blockchain
                    </h3>
                    <div className="text-lg leading-[124%] tracking-[0] whitespace-pre-wrap">
                      Ferrari F40 Captivates Headlines Again with Sold-Out Sale
                      on Altr Platform
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0.1)] backdrop-blur-[45px] shadow-[1.5px_3.5px_3.5px_rgba(0,0,0,0.25)] transition-opacity duration-[2s] ease-[ease] delay-[0s] opacity-100 self-end col-[1/-1] px-6 py-4 rounded-xl lg:col-[6/-1]">
                  <div className="flex items-center flex-wrap gap-3 justify-between">
                    <div className="shrink-0 mr-[60px]">
                      <p className="text-xs leading-[140%] tracking-[0.04em] mb-1">
                        Powered by Lucidao (LCD)
                      </p>
                      <div className="flex items-center flex-wrap gap-3 justify-between text-lg leading-[124%] tracking-[0]">
                        <div className="inline-block text-lg leading-[124%] tracking-[0]">
                          $0.007
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 inline">
                      <div className="select-none">
                        <div className="no-underline text-inherit cursor-pointer w-auto inline-block rounded-lg">
                          <div className="transition-[0.2s] duration-[all] border items-center flex px-4 py-2 rounded-lg border-solid border-current">
                            <span className="text-base leading-[124%] tracking-[0.01em]">
                              Learn More
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-[140px] bottom-[-5px] left-0 right-0 bg-[linear-gradient(_rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.0)_30%,rgba(0,0,0,1.0)_100%_)]"></div>
      </section>
      <section className="bg-black">
        <div className="relative h-full max-w-[1920px] m-auto px-4 sm:px-8 py-10 lg:p-[3.75rem]">
          <div className="relative block lg:flex gap-8">
            <div className="block lg:flex lg:flex-1 mb-6">
              <div className="flex-1">
                <div className="text-base leading-[124%] tracking-[0.01em] mb-1 lg:mb-6">
                  Features
                </div>
                <h1 className="leading-[100%] tracking-[-0.01em] text-[42px] md:text-[52px] mb-6 lg:mb-[3.75rem]">
                  From Physical to Digital and Every Step in Between
                </h1>
                <p className="text-base leading-[124%] tracking-[0] mb-6">
                  Altr is a gateway to the world of luxury collectibles,
                  offering collectors an easy way to purchase rare and fine
                  collectibles either in full or as a fraction using USDt
                  Stablecoin. Additionally, Altr allows collectors to digitize
                  their existing collections and use them as collateral to
                  borrow liquidity without selling them. A digital proof of
                  ownership, in the form of an NFT, is issued and can be held,
                  traded, collateralized, or redeemed for the physical item at
                  any time.{" "}
                </p>
              </div>
            </div>
            <div className="lg:flex-1">
              <Filter
                data={data || null}
                title="Brands"
                stateChanger={setSelectedBrand}
                error="Error while fetching brands."
              />
              <Filter
                data={selectedBrand?.options || null}
                title="Models"
                stateChanger={setSelectedModel}
                error="Please select a brand first."
              />
              <Filter
                data={years}
                title="From"
                stateChanger={setSelectedMin}
                error=""
              />
              <Filter
                data={years}
                title="To"
                stateChanger={setSelectedMax}
                error=""
              />
              <div className="col-span-full relative">
                {/* <p className="text-[22px] leading-[120%] tracking-[0] mb-8">Are you a merchant of luxury goods looking for a new market of premium clients?</p> */}
                <button
                  className="flex gap-4 flex-wrap transition-all duration-200"
                  onClick={sendRequest}
                >
                  <div className="select-none">
                    <div className="w-auto inline-block no-underline text-inherit cursor-pointer rounded-lg">
                      <div
                        className="bg-black hover:bg-[rgb(221,222,226,0.2)] text-white justify-center w-auto flex items-center transition-[all] border-white border-solid border-[1px] duration-[.2s] px-4 py-2 rounded-lg"
                        style={{
                          opacity: isLoading ? 0 : 1,
                          visibility: isLoading ? "hidden" : "visible",
                        }}
                      >
                        Search Listings
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        {isLoading ? (
          <div className="relative h-full max-w-[1920px] m-auto px-4 py-10 sm:px-8 lg:px-16 sm:py-10 sm:pt-0 ">
            <div className="h-[345px] text-[white] mt-[60px] rounded-2xl sm:h-[345px] sm:mt-0 overflow-hidden">
              <div className="block h-full w-full align-top overflow-hidden relative">
                <img
                  className="absolute min-w-[100vw] h-full"
                  sizes="(min-width: 2656px) 2656px, 100vw"
                  decoding="async"
                  loading="lazy"
                  src="https://www.stuttcars.com/wp-content/uploads/2023/03/337294740_239580515106576_7886695114266928304_n.jpg"
                  alt=""
                />
                <div className="flex items-center justify-center relative h-full shadow-[1.5px_3.5px_3.5px_rgba(0,0,0,0.25)] backdrop-blur-[45px]">
                  <div className="text-center">
                    {/* <h2 className="mb-2 text-base leading-[124%] tracking-[0.01em]">Collection</h2> */}
                    <div class="loading" ref={loadingRef}>
                      <div class="loading-text">
                        <span class="loading-text-words">L</span>
                        <span class="loading-text-words">O</span>
                        <span class="loading-text-words">A</span>
                        <span class="loading-text-words">D</span>
                        <span class="loading-text-words">I</span>
                        <span class="loading-text-words">N</span>
                        <span class="loading-text-words">G</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
      <ToastContainer />
      {cars && !isLoading ? <Cards data={cars} /> : ""}
    </>
  );
}
