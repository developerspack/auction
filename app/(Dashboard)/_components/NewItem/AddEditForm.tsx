"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DateTimePicker from "react-datetime-picker";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UpdateDcoument, uploadDocument } from "@/Hooks/Hooks";
import { Textarea } from "@/components/ui/textarea";
import UploadMultipleImages from "@/components/UploadMultipleImages";
import Heading from "@/components/heading";
import UploadSingleItem from "@/components/UploadSingleItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/user";

// form velidation
const formSchema = z.object({
  Name: z.string().min(1),
  Thumbnail: z.string().min(1),
  otherImages: z.string().array().optional().default([]),
  bidding: z.string().default("Open"),
  video: z.string().optional().default(""),
  Description: z.string().min(1),
  startingPrice: z.coerce.number().default(0),
});

interface AddEditFormProps {
  initialData: itemProps | any;
  id: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AddEditForm = ({ initialData, id }: AddEditFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otherImages, setOtherImages] = useState<string[] | null>([]);
  const [thumbnail, setTumbnail] = useState<string | null>("");
  const [video, setVideo] = useState<string | null>("");
  const [value, setValue] = useState<Value>(new Date());

  const { user } = useUserStore();

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      for (const fieldName in initialData) {
        if (form.setValue && initialData[fieldName] !== null) {
          form.setValue(fieldName, initialData[fieldName]);
        }
      }
      setOtherImages(initialData.otherImages);
      setTumbnail(initialData.Thumbnail);
      setVideo(initialData.video);

      setValue(initialData.expiryDate);
    }
  }, [initialData]);
  // dynamic text
  const title =
    Object.keys(initialData).length > 0 ? "Edit Item" : "Create Item";
  const description =
    Object.keys(initialData).length > 0 ? "Edit a Item." : "Add a new Item";
  const action =
    Object.keys(initialData).length > 0 ? "Save changes" : "Create";

  // upload values
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        Name: "",
        Thumbnail: "",
        video: "",
        otherImages: [],
        bidding: "Open",
        Description: "",
        startingPrice: 0,
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // submit values
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const uploadValues = {
      ...values,
      userId: user.id,
      expiryDate: `${value}`,
      BidAccepted:
        Object.keys(initialData).length > 0 ? initialData.BidAccepted : false,
    };

    try {
      if (Object.keys(initialData).length > 0) {
        await UpdateDcoument("items", id, uploadValues);
      } else {
        await uploadDocument("items", uploadValues);
      }
      setIsLoading(false);
      router.push(`/u/${user.id}/viewItems`);
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      setIsLoading(false);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  // console.log(form.formState.errors);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between pl-4 pb-8">
        <Heading title={title} description={description} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          {/* image */}
          <FormField
            control={form.control}
            name="Thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Thumbnail</FormLabel>
                <FormControl>
                  <UploadSingleItem
                    disabled={isLoading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    selectedFile={thumbnail}
                    setSelectedFile={setTumbnail}
                    uploadingTo="items"
                    type="image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Other Images(Optional)</FormLabel>
                <FormControl>
                  <UploadMultipleImages
                    disabled={isLoading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    selectedFile={otherImages}
                    setSelectedFile={setOtherImages}
                    uploadingTo="items"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Show Case (Optional)</FormLabel>
                <FormControl>
                  <UploadSingleItem
                    disabled={isLoading}
                    onChange={(video) => field.onChange(video)}
                    selectedFile={video}
                    setSelectedFile={setVideo}
                    uploadingTo="video"
                    type="video"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* // Name */}
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Starting Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div>
              <p>Bidding Closes On</p>

              <DateTimePicker
                onChange={setValue}
                value={value}
                disabled={isLoading}
                className="text-black bg-white mt-3 z-40"
              />
            </div>

            {/* description */}
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your Description here."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bidding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select If Bidding Is closed or Open</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select If Bidding Is closed or Open" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* btn */}
          <Button
            disabled={isLoading}
            className="md:w-fit w-full tracking-wider mt-8 float-right mb-4"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEditForm;
