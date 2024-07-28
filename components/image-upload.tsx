"use client";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { ping } from "ldrs";

import { toast } from "./ui/use-toast";
import { storage } from "@/lib/firebase";
import Image from "next/image";
import { Button } from "./ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  ping.register();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);
    setIsLoading(true);

    const uploadPromises = files.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const uploadTask = uploadBytesResumable(
          ref(storage, `Images/${Date.now()}-${file.name}`),
          file,
          { contentType: file.type }
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message,
            });
            setIsLoading(false);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              onChange(downloadURL);
              setIsLoading(false);
              resolve();
            });
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Failed to upload images:", error);
    }
  };

  const onDelete = (url: string) => {
    onRemove(url);
    deleteObject(ref(storage, url)).then(() => {
      toast({
        variant: "default",
        title: "Image Removed",
      });
    });
  };

  return (
    <div>
      {value && value.length > 0 ? (
        <>
          <div className="mb-4 flex items-center gap-4">
            {value.map((url) => (
              <div
                className="relative w-52 h-52 rounded-md overflow-hidden"
                key={url}
              >
                <Image
                  fill
                  className="object-cover"
                  alt="Billboard Image"
                  src={url}
                />
                <div className="absolute z-10 top-2 left-40">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(url)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200 flex items-center justify-center flex-col gap-3">
          {isLoading ? (
            <>
              <l-ping size="45" speed="2" color="black"></l-ping>
              <p>{`${progress.toFixed(2)}%`}</p>
            </>
          ) : (
            <>
              <label>
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer">
                  <ImagePlus className="h-4 w-4" />
                  <p>Upload images</p>
                </div>
                <input
                  type="file"
                  onChange={onUpload}
                  accept="image/*"
                  multiple
                  className="w-0 h-0"
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};
