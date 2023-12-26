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
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { storage } from "@/lib/firebase";
import { CirclesWithBar } from "react-loader-spinner";

interface UploadSingleProps {
  disabled: boolean;
  selectedFile: string | null;
  onChange: (selectedFile: string | null) => void;
  setSelectedFile: (selectedFile: string | null) => void;
  uploadingTo: string;
  type: string;
}

const UploadSingleItem = ({
  disabled,
  onChange,
  setSelectedFile,
  selectedFile,
  uploadingTo,
  type,
}: UploadSingleProps) => {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onChange(selectedFile);
  }, [selectedFile]);
  const FileType = selectedFile && selectedFile.includes("items");

  // upload image image
  const addItem = async (e: any) => {
    setLoading(true);
    const notification = toast.loading(`Uploading ${type}...`);
    const file = e.target.files[0];
    try {
      const imageRef = ref(storage, `${uploadingTo}/${file.name}`);
      await uploadBytes(imageRef, file, {});
      const downloadURL = await getDownloadURL(imageRef);
      setSelectedFile(downloadURL);
      setLoading(false);
      toast.success(`${uploadingTo} ${type} uploaded Successfully!`, {
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
    setSelectedFile(null);
    if (selectedFile) {
      const storageRef = ref(storage, selectedFile);
      await deleteObject(storageRef);
    }
  };

  return (
    <div className="pb-4">
      {/* upload btn */}
      {!selectedFile && (
        <Button
          className="gap-2"
          type="button"
          variant="secondary"
          disabled={disabled}
          onClick={() => filePickerRef.current?.click()}
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
                hidden
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={addItem}
              />
              Upload an {type}
            </>
          )}
        </Button>
      )}
      {/* Image View */}
      {selectedFile && (
        <div className="mb-4 flex items-center gap-4">
          <div className="relative rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={DeleteImage}
              >
                <MdDelete className="h-4 w-4" />
              </Button>
            </div>
            {FileType && type === "image" ? (
              <div className="w-[200px] h-[200px]">
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={selectedFile}
                />
              </div>
            ) : (
              <div className="p-2 bg-[#313030]/10 dark:bg-[#313030] rounded-lg w-[250px] h-[200px]">
                <video
                  src={selectedFile}
                  height={500}
                  width={500}
                  className="rounded-lg h-full w-full"
                  controls
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSingleItem;
