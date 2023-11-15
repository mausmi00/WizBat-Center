"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  const imageGenerator = async () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY_IMAGE_GEN,
    });

    const openai = new OpenAIApi(configuration);
    let prompt = `A ${imageDescription} which is to be used as a product image in a store`;
    let response = await openai
      .createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      })
      .then(async (response) => {
        let generated_url = response.data.data[0].url;
        if (generated_url !== undefined) {
          let image_url: string = generated_url;
          const data = new FormData();
          data.append("file", image_url);
          data.append("upload_preset", "t3tev8mo");

          await axios
            .post(
              "https://api.cloudinary.com/v1_1/doxhicxh0/image/upload",
              data
            )
            .then((response) => {
              onChange(response.data.url);
            });
        }
      });
  };
  
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="t3tev8mo">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          const onClickImageGenerator = async () => {
            // const image_url: string = ImageGenerator();
            setLoading(true);
            imageGenerator().then(() => {
              setLoading(false);
            });

            // <CldImage src="
            // https://oaidalleapiprodscus.blob.core.windows.net/private/org-zPPSy8C6avKOolzJnjmd2HjY/user-bNID8zWt6W85dzh6FMwgr2jC/img-cLQMEdYs9SbnqPEvjawRak2X.png?st=2023-09-04T18%3A57%3A59Z&se=2023-09-04T20%3A57%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-04T18%3A49%3A38Z&ske=2023-09-05T18%3A49%3A38Z&sks=b&skv=2021-08-06&sig=dodRlsrPXHMroQgh1UIJoiu/MEgYt7P26eaLxbYFbQg%3D
            // " alt="" uploadPreset="t3tev8mo"/>
            // <CldUploadWidget onUpload={onUpload} uploadPreset="t3tev8mo" />;
            // onChange("https://oaidalleapiprodscus.blob.core.windows.net/private/org-zPPSy8C6avKOolzJnjmd2HjY/user-bNID8zWt6W85dzh6FMwgr2jC/img-cS4tP5xPbmldOclAipZNxJZu.png?st=2023-09-07T20%3A42%3A33Z&se=2023-09-07T22%3A42%3A33Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-07T18%3A16%3A02Z&ske=2023-09-08T18%3A16%3A02Z&sks=b&skv=2021-08-06&sig=hRM9j9JpIWIOJLLBs9npfA3Os6isEADEi4PNSNWjgJk%3D");
            //     cloudinary.cloudinaryLoader(
            //       {
            //         height: ,
            //          src: "https://upload.wikimedia.org/wikipedia/commons/1/13/Benedict_Cumberbatch_2011.png"
            // })
            // onChange(uploaded_image_url);
          };
          return (
            <div className="flex-row">
              <div className="m-2 mb-10">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Upload an Image
                </Button>
              </div>
              <div className="m-2">
                <Input
                  placeholder="Image Description"
                  onChange={(event) => setImageDescription(event.target.value)}
                  className="max-w-sm p-8"
                />
                <div className="mt-5">
                  {loading ? (
                    <>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={onClickImageGenerator}
                      >
                        Generating Image...
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={onClickImageGenerator}
                      >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Use AI Generated Image
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
