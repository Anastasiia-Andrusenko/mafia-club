// import Image from "next/image";
// import React, { useState } from "react";
// import "react-awesome-lightbox/build/style.css"; // імпорт стилів для лайтбоксу

// const imageGallery = [
//   {
//     src: "https://your-server.com/images/photo1-large.webp",
//     srcset:
//       "https://your-server.com/images/photo1-small.webp 300w, https://your-server.com/images/photo1-medium.webp 768w, https://your-server.com/images/photo1-large.webp 1024w",
//     alt: "Description 1",
//   },
//   {
//     src: "https://your-server.com/images/photo2-large.webp",
//     srcset:
//       "https://your-server.com/images/photo2-small.webp 300w, https://your-server.com/images/photo2-medium.webp 768w, https://your-server.com/images/photo2-large.webp 1024w",
//     alt: "Description 2",
//   },
//   // Додай інші зображення сюди
// ];

const Gallery = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const openLightbox = (index: number) => {
  //   setCurrentImageIndex(index);
  //   setIsOpen(true);
  // };

  // const closeLightbox = () => {
  //   setIsOpen(false);
  // };

  return (
    <div>
      {/* Показуємо мініатюри плиткою */}
      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imageGallery.map((image, index) => (
          <Image
            key={index}
            srcSet={image.srcset}
            src={image.src}
            alt={image.alt}
            style={{ width: "200px", height: "auto", cursor: "pointer" }}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div> */}

      {/* Відкриваємо лайтбокс при кліку */}
      {/* {isOpen && (
        <Lightbox
          image={imageGallery[currentImageIndex].src}
          title={imageGallery[currentImageIndex].alt}
          onClose={closeLightbox}
          allowZoom={true}
          startIndex={currentImageIndex}
          images={imageGallery.map((image) => ({ url: image.src }))}
        />
      )} */}
    </div>
  );
};

export default Gallery;
