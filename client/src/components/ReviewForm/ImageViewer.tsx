import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import ImagePreview from "react-viewer";

interface Props {
  images: string[];
}

const ImageViewer: React.FC<Props> = ({ images }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const onPreviewOpen = (index: number) => {
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const onPreviewClose = () => {
    setPreviewIndex(0);
    setIsPreviewOpen(false);
  };

  return (
    <Container>
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          className="rounded m-1 shadow-sm"
          height="80rem"
          onClick={() => onPreviewOpen(index)}
          style={{ cursor: "pointer" }}
        />
      ))}
      <ImagePreview
        images={[
          {
            src: images[previewIndex],
            alt: "Image " + previewIndex,
          },
        ]}
        visible={isPreviewOpen}
        onClose={onPreviewClose}
        noFooter
        noImgDetails
        noNavbar
        noToolbar
        noLimitInitializationSize
        noClose
      />
    </Container>
  );
};

export default ImageViewer;
