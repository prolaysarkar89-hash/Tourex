import React, { useState, useEffect } from 'react';
import { generateImageForDay } from '../services/geminiService';
import ImageSkeletonLoader from './ImageSkeletonLoader';

interface ItineraryImageProps {
  query: string;
  title: string;
}

const ItineraryImage: React.FC<ItineraryImageProps> = ({ query, title }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      if (!query) {
        setError("No image query provided.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const url = await generateImageForDay(query);
        if (isMounted) {
          setImageUrl(url);
        }
      } catch (err) {
        console.error("Failed to generate image:", err);
        if (isMounted) {
          setError("Could not load image for this day.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (isLoading) {
    return <ImageSkeletonLoader />;
  }

  if (error || !imageUrl) {
    // Fallback display
    return (
      <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
        <p className="text-gray-400 text-center px-4">{error || `Image for "${title}"`}</p>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-48 object-cover"
    />
  );
};

export default ItineraryImage;