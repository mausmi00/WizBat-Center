// import OpenAI from "openai";
import { CldUploadWidget } from "next-cloudinary";
import { Configuration, OpenAIApi } from "openai";
import { v2 as cloudinary } from 'cloudinary';
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_IMAGE_GEN,
});

export async function ImageGenerator() {
  const openai = new OpenAIApi(configuration);
  let response = await openai.createImage({
    prompt: "test",
    n: 1,
    size: "256x256",
  });
  let image_url = response.data.data[0].url;
  return image_url
}

export default ImageGenerator;
