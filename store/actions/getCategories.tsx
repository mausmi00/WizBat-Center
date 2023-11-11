import { Category } from "@/types";
import { useEffect } from "react";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL, {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return res.json();
};

export default getCategories;
