"use client";

import Image from "next/image";

interface AvatarProps {
  url: string | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ url }) => {
  url == undefined ? "/images/robin.jpg" : url;
  if (!url) {
    return;
  }
  return (
    <div className="relative">
      <div
        className="
    relative
    inline-block
    rounded-sm
    overflow-hidden
    h-6
    w-6
    md:h-9
    md:w-9
    "
      >
        <Image alt="Avatar" src={url} fill />
      </div>
    </div>
  );
};

export default Avatar;
