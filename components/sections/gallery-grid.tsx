"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/lib/content/gallery"

interface GalleryGridProps {
  images: GalleryImage[]
  columns?: number
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const getGridClass = (aspect: string) => {
    switch (aspect) {
      case "portrait":
        return "col-span-1 row-span-2"
      case "landscape":
        return "col-span-2 row-span-1"
      case "wide":
        return "col-span-2 row-span-2"
      case "square":
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer group bg-muted",
                getGridClass(image.aspect),
              )}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-sm">{image.title}</h3>
                {image.description && (
                  <p className="text-xs md:text-sm text-white/80 drop-shadow-sm line-clamp-2">{image.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              width={1200}
              height={900}
              priority
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sm text-muted-foreground">{selectedImage.description}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-foreground hover:text-foreground/80 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
