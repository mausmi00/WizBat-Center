"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

// this page triggers the modal
const RootPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = function () {};
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default RootPage;
