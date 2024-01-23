"use client";

import { GalleryEntry } from "@/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";

interface Props {
  galleryEntries: GalleryEntry[];
  className?: string;
  activeIndex?: number;
}

export default function ProductGallery({
  galleryEntries,
  className = "",
  activeIndex: initialActiveIndex = 0,
}: Props) {
  const galleryLength = galleryEntries.length;
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const toNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % galleryLength);
  };
  const toPrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + galleryLength) % galleryLength
    );
  };

  return (
    <div className={`${className}`}>
      {previewIndex !== null && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-gray-800 bg-opacity-80 z-10"
          onClick={() => setPreviewIndex(null)}
        >
          <span className="inline-flex items-center justify-center w-16 h-16 absolute top-0 right-0 z-20">
            <XMarkIcon
              className="w-8 h-8 cursor-pointer text-gray-300 hover:text-gray-100 transition-colors"
              width={32}
              height={32}
            />
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              width={800}
              height={800}
              className="object-contain w-auto lg:h-[640px] cursor-pointer"
              src="https://dioutdoor.vn/media/2022/06/Leu-Glamping-Naturehike-Village-5.0-NH21ZP009-8-600x600.jpg.webp"
              alt="Main image"
            />
          </div>
        </div>
      )}
      <div className="mb-6 lg:h-[600px] border">
        <div className="w-full h-full relative">
          <div
            className="absolute h-full w-16 left-0 top-0 inline-flex justify-center items-center cursor-pointer bg-gray-400 bg-opacity-20 hover:bg-opacity-50 transition-colors"
            onClick={toPrev}
          >
            <span className="inline-block w-8 h-8 text-blue-600">
              <ChevronLeftIcon width={32} height={32} />
            </span>
          </div>
          <Swipe
            onSwipeLeft={toNext}
            onSwipeRight={toPrev}
            className="w-full h-full"
          >
            <Image
              width={600}
              height={600}
              className="object-contain w-full lg:h-full cursor-pointer"
              src="https://dioutdoor.vn/media/2022/06/Leu-Glamping-Naturehike-Village-5.0-NH21ZP009-8-600x600.jpg.webp"
              alt="Main image"
              onClick={() => {
                setPreviewIndex(activeIndex);
              }}
            />
          </Swipe>
          <div
            className="absolute h-full w-16 right-0 top-0 inline-flex justify-center items-center cursor-pointer bg-gray-400 bg-opacity-20 hover:bg-opacity-50 transition-colors"
            onClick={toNext}
          >
            <span className="inline-block w-8 h-8 text-blue-600">
              <ChevronRightIcon width={32} height={32} />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:hidden">
        <div className="w-fit mx-auto flex gap-4">
          {galleryEntries.map((entry, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-blue-400 border-2 ${
                index === activeIndex ? "bg-blue-600" : "bg-white"
              }`}
              onClick={() => {
                setActiveIndex(index);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex-wrap hidden md:flex">
        {galleryEntries.map((entry, index) => (
          <div
            key={index}
            className="w-1/2 p-2 sm:w-1/4"
            onClick={() => {
              setActiveIndex(index);
            }}
            onDoubleClick={() => {
              setPreviewIndex(index);
            }}
          >
            <div
              className={`border hover:border-blue-400 hover:scale-105 transition-all cursor-pointer ${
                index === activeIndex
                  ? "@apply shadow-[0_0_8px_0_rgb(71,139,255)] scale-105"
                  : ""
              }`}
            >
              <Image
                width={200}
                height={200}
                className="object-contain w-full lg:h-28"
                src="https://dioutdoor.vn/media/2022/06/Leu-Glamping-Naturehike-Village-5.0-NH21ZP009-8-600x600.jpg.webp"
                alt="Image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
