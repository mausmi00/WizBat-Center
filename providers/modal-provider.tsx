"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // so that hydration errors don't occur - there is no asyncronization between server side and client side
  // until the lifecycle (useEffect) runs (this only happens in the client component) and the modal is mounted
  // the server will return null
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
