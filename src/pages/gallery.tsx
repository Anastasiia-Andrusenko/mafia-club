import dynamic from "next/dynamic";
import imagePaths from "../components/PhotoGallery/imagePaths.json";
import Overlay from "@/components/Overlay/Overlay";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
// Define the type for each image
interface ImageFile {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Define the type for the props
interface GalleryProps {
  imagesFiles: ImageFile[];
}

const ImageGallery = dynamic(
  () => import("@/components/PhotoGallery/PhotoGallery"),
  { ssr: false }
);
const link = "https://mafiadream.com.ua/wp-content/images/";

export async function getStaticProps() {
  const imagesFiles: ImageFile[] = imagePaths.images
    .reverse()
    .map((path, index) => ({
      id: `${index + 1}`, // Динамічне id
      src: `${link}${path}`, // Повний шлях до зображення
      alt: `Image ${index + 1}`, // Динамічний alt
      width: 600,
      height: 400,
    }));

  return {
    props: {
      imagesFiles,
    },
  };
}

const Gallery: React.FC<GalleryProps> = ({ imagesFiles }) => {
  return (
    <>
      <h2>Gallery</h2>
      <ImageGallery images={imagesFiles} />
      <Overlay />
      <ScrollTopBtn/>
    </>
  );
};

export default Gallery;
