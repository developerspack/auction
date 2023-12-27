"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ImageCarousel from "./ImageCarousel";
import CountDown from "../CountDown";
import { useUserStore } from "@/store/user";
import { FetchDocument } from "@/Hooks/Hooks";
import BidModal from "./BidModal";

const ItemDetails = ({
  id,
  Name,
  Thumbnail,
  video,
  otherImages,
  Description,
  expiryDate,
  userId,
  startingPrice,
  BidAccepted,
}: itemProps) => {
  const router = useRouter();

  useEffect(() => {
    if (BidAccepted) {
      router.push("/");
    }
  }, [BidAccepted]);

  const [open, setOpen] = useState(false);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(startingPrice);

  const { user } = useUserStore();
  const { document } = FetchDocument("users", userId);

  // console.log(user);
  const HandleModal = () => {
    if (user.isLoggedIn) {
      setOpen(true);
    } else {
      toast("Sign Required", {
        icon: "🔐🔑",
      });
    }
  };

  return (
    <div className="w-full">
      <BidModal
        setOpen={setOpen}
        open={open}
        id={id}
        name={Name}
        startingPrice={startingPrice}
        email={document.email}
        userName={user.Name}
      />
      {/* btns bid edit */}
      <div className="flex gap-4 float-right -mt-8 lg:mt-0 z-50">
        <button
          className="flex items-center justify-center gap-1 font-medium p-3
          cursor-pointer text-black bg-blue-300 hover:bg-blue-400 rounded-lg"
          onClick={() => HandleModal()}
        >
          <BiDollar className="h-5 w-5" />
          <span>Bid</span>
        </button>
        {user.id === userId && (
          <Link
            href={`/u/${user?.id}/${id}`}
            className="flex items-center justify-center gap-1 font-medium p-3
            cursor-pointer text-black bg-green-400 hover:bg-green-500 rounded-lg"
          >
            <FaEdit className="h-5 w-5" />
            <span>Edit</span>
          </Link>
        )}
      </div>
      <div className="block lg:flex gap-5">
        <div className="w-full block mt-10 lg:mt-0">
          {/* image */}
          <div className="lg:h-[480px] p-2 bg-[#313030]/10 dark:bg-[#313030] rounded-lg">
            <Image
              src={Thumbnail}
              height={500}
              width={500}
              alt={Name}
              className="rounded-lg h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="mt-2 overflow-auto">
            <div className="text-lg text-bold mb-2 pl-4">
              Bidding Closes in:
            </div>
            {expiryDate && <CountDown expiryDate={expiryDate} />}
          </div>
        </div>
        <div className="w-full">
          {/* name price */}
          <div className="mt-2 space-y-3 lg:pl-3">
            {/* name */}
            <h2 className="text-2xl md:text-3xl line-clamp-1 mb-3">{Name}</h2>
            <Link href={`/user/${userId}`} className="mt-4">
              <span className="font-medium text-lg text-blue-500">
                Auctioneer:{" "}
              </span>{" "}
              <span className="hover:underline underline-offset-3">
                {document.name}
              </span>
            </Link>
            {/* price */}
            <div className="flex items-center gap-2">
              <span className="text-blue-300">Starting Price:</span>
              <span className="text-xl font-bold">{formatted}</span>
            </div>
            <div className="p-2 bg-[#313030]/10 dark:bg-[#313030] rounded-lg mb-2 md:mb-0">
              <span className="font-semibold text-lg p-2">Item Show Case:</span>
              <div className="rounded-lg h-[300px]">
                {video ? (
                  <video
                    src={video}
                    height={500}
                    width={500}
                    className="rounded-lg h-full w-full"
                    controls
                  />
                ) : (
                  <h3 className="font-bold text-lg">Not Available</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pl-4 bg-[#313030]/10 dark:bg-[#313030] p-2 rounded-md overflow-auto">
        <div className="text-lg text-bold">Description:</div>
        <div className="ml-28">{Description}</div>
      </div>
      <div className="px-7 lg:px-14 pt-4">
        <p className="text-2xl md:text-3xl line-clamp-1">Gallery</p>
        {otherImages && (
          <>
            {otherImages.length !== 0 ? (
              <ImageCarousel otherImages={otherImages} />
            ) : (
              <h3 className="font-bold text-lg">Not Available</h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
