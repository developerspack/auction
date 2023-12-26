"use client";

import { FetchDocument } from "@/Hooks/Hooks";
import { Separator } from "@/components/ui/separator";
import Moment from "react-moment";

const Profile = ({ userId }: { userId: string }) => {
  const { document } = FetchDocument("users", userId);
  const { document: items } = FetchDocument("items", userId);
  console.log(items);
  return (
    <div className="">
      {" "}
      <section className="relative block h-96">
        <div
          className=" top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50"
          ></span>
        </div>
      </section>
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-[#313030]/80 dark:bg-[#313030] w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      src={document.photo}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-14 -ml-10 lg:-ml-16 max-w-[200px]"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1 text-white">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        22
                      </span>
                      <span className="text-sm">Total Items</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Open</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        89
                      </span>
                      <span className="text-sm">Accepted Bids</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                  {document.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                  <span>Created </span>

                  <Moment fromNow>{document.createdAt}</Moment>
                </div>
              </div>
              <Separator />
              <div className="mt-10 py-10 text-center"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
