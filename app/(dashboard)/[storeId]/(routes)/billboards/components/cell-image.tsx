"use client";

import Image from "next/image";

interface CellImagemProps {
  imageUrl: string;
}

export const CellImagem = ({ imageUrl }: CellImagemProps) => {
  return (
    <div className="overflow-hidden w-32 min-h-16 h-16 min-w-32 relative rounded-md shadow-md">
      <Image
        fill
        alt="Billboard"
        className="object-cover"
        src={imageUrl}
      />
    </div>
  );
};
