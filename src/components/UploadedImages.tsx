import React, { useEffect, useState } from 'react';

interface UploadedImage {
  id: string;
  url: string;
  thumbUrl: string;
  size: number;
  extension: string;
}

export function UploadedImages() {
  const [images, setImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('uploadedImages');
      if (stored) {
        setImages(JSON.parse(stored));
      }
    } catch {
      setImages([]);
    }
  }, []);

  if (!images.length) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Uploads Recentes</h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <a
            key={img.id}
            href={img.url}
            target="_blank"
            rel="noreferrer"
            className="border p-1 text-center text-xs space-y-1 rounded"
          >
            <img
              src={img.thumbUrl}
              alt="thumbnail"
              className="w-full h-20 object-cover"
            />
            <div>{(img.size / 1024).toFixed(1)}KB</div>
            <div>.{img.extension}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
