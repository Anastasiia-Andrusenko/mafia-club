import Image from "next/image";
import css from "./PhotoGallery.module.css";
import Container from "../Container/Container";
import Modal from "./Modal";
import { useState } from "react";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: ImageData[];
  allImages: ImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, allImages }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Container>
        <div className={css.gallery}>
          {images.map((img) => (
            <div
              key={img.id}
              className={css.galleryItem}
              onClick={() =>
                handleImageClick(
                  allImages.findIndex((image) => image.id === img.id)
                )
              }
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={css.imageThumbnail}
              />
            </div>
          ))}
        </div>
      </Container>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={allImages.map((img) => ({ src: img.src, alt: img.alt }))}
        currentIndex={currentIndex}
        onChangeIndex={handleChangeIndex}
      />
    </>
  );
};

export default ImageGallery;
