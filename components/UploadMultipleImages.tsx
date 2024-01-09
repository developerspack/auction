"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import uniqid from "uniqid";

import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { storage } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { CirclesWithBar } from "react-loader-spinner";

interface UploadMultipleProps {
  disabled: boolean;
  selectedFile: string[] | null;
  onChange: (selectedFile: string[] | null) => void;
  setSelectedFile: (selectedFile: string[] | null) => void;
  uploadingTo: string;
}

const UploadMultipleImages = ({
  disabled,
  onChange,
  setSelectedFile,
  selectedFile,
  uploadingTo,
}: UploadMultipleProps) => {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onChange(selectedFile);
  }, [selectedFile]);

  // upload image image
  const addItem = async (e: any) => {
    setLoading(true);
    const notification = toast.loading("Uploading images...");
    const files = e.target.files;
    try {
      const imageURLs = []; // Create an array to store the download URLs
      for (const file of files) {
        const imageRef = ref(storage, `${uploadingTo}/${uniqid()}`);
        await uploadBytes(imageRef, file, {});
        const downloadURL = await getDownloadURL(imageRef);
        imageURLs.push(downloadURL); // Add the download URL to the array
      }
      setSelectedFile(imageURLs);
      setLoading(false);
      toast.success(`${uploadingTo} images uploaded Successfully!`, {
        id: notification,
      });
    } catch (error) {
      toast.error((error as Error).message, {
        id: notification,
      });
    }
  };

  // delete
  const DeleteImage = async () => {
    setSelectedFile([]);
    if (selectedFile) {
      for (const url of selectedFile) {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
      }
    }
  };

  return (
    <div className="pb-4">
      {/* upload btn */}
      {selectedFile?.length === 0 && (
        <Button
          className="gap-2"
          type="button"
          variant="secondary"
          disabled={disabled}
          onClick={() => filePickerRef.current!.click()}
        >
          {loading ? (
            <CirclesWithBar
              height="30"
              width="30"
              color="#4acd8d"
              visible={true}
              ariaLabel="circles-with-bar-loading"
            />
          ) : (
            <>
              <AiOutlineCloudUpload className="h-5 w-5" />
              <input
                type="file"
                ref={filePickerRef}
                multiple
                hidden
                onChange={addItem}
              />
              Upload Images
            </>
          )}
        </Button>
      )}
      {/* Image View */}
      {selectedFile?.length! > 0 && (
        <div className="flex items-start space-x-2">
          <div className="absolute items-center justify-center ml-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={DeleteImage}
            >
              <MdDelete className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-x-auto flex gap-1 scrollbar">
            {selectedFile?.map((image, index) => (
              <Image
                src={image}
                className="w-full h-[20%] rounded-2xl max-h-40 object-contain pb-2"
                key={index}
                alt={`Image ${index}`}
                height={500}
                width={500}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMultipleImages;
