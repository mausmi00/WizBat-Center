"use client";

import PreviewModal from "@/components/ui/previewModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return false;
  }
  return (
    <>
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
