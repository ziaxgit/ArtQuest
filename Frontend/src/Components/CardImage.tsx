import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

interface Artwork {
  thumbnail: {
    lqip: string;
  };
  image_id: string;
}

const CardImage: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const [imageSrc, setImageSrc] = useState<string>(artwork.thumbnail?.lqip || '');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const highResImageSrc = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  useEffect(() => {
    const img = new Image();
    img.src = highResImageSrc;
    img.onload = () => {
      setImageSrc(highResImageSrc);
      setImageLoaded(true);
    };
  }, [highResImageSrc]);

  return (
    <Card.Img
      variant="top"
      src={imageSrc}
      style={{ maxHeight: "500px", objectFit: "cover" }}
      className={imageLoaded ? "loaded" : "loading"}
      alt={`Artwork image`}
    />
  );
};

export default CardImage;