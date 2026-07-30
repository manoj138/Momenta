import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * LightboxGallery component for photos slider & popup lightbox.
 * 
 * @param {Array<{url: string, caption?: string}>} photos - List of photo items
 * @param {string} [title="Memories Gallery"] - Header title
 */
const LightboxGallery = ({ photos = [], title = "Memories Gallery" }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!photos || photos.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {title && <h3 className="text-xl font-bold text-center text-white">{title}</h3>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-md hover:border-pink-500/50 transition-all duration-300"
          >
            <img
              src={photo.url || photo}
              alt={photo.caption || `Memory ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              {photo.caption && <span className="text-xs text-white font-medium truncate">{photo.caption}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[85vh] p-2 flex flex-col items-center">
            <img
              src={photos[selectedIndex]?.url || photos[selectedIndex]}
              alt="Expanded view"
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {photos[selectedIndex]?.caption && (
              <p className="text-sm text-gray-300 mt-4 text-center font-medium max-w-lg">
                {photos[selectedIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxGallery;
