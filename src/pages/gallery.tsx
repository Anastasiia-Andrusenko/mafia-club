import imagePaths from "../components/PhotoGallery/imagePaths.json";
import Overlay from "@/components/Overlay/Overlay";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useTranslation } from "../hooks/useTranslation";
import css from "../styles/Gallery.module.css";
import Container from "@/components/Container/Container";
import { useMemo, useState } from "react";
import ImageGallery from "@/components/PhotoGallery/PhotoGallery";
import { seoCopy } from "@/locales/seo";

interface ImageFile {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  imagesFiles: ImageFile[];
}

const link = "/images/";

export async function getStaticProps() {
  const imagesFiles: ImageFile[] = [...imagePaths.images]
    .reverse()
    .map((path, index) => ({
      id: `${index + 1}`,
      src: `${link}${path}`,
      alt: "",
      width: 600,
      height: 400,
    }));

  return {
    props: {
      imagesFiles,
    },
  };
}

const ITEMS_PER_PAGE = 12;

const Gallery: React.FC<GalleryProps> = ({ imagesFiles: files }) => {
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  // Descriptive, localized alt text (the grid is server-rendered for crawlers)
  const imagesFiles = useMemo(
    () =>
      files.map((img) => ({
        ...img,
        alt: `${seoCopy[language].photoAlt} №${img.id}`,
      })),
    [files, language]
  );

  const totalPages = Math.ceil(imagesFiles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = imagesFiles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <h2 className={css.title}>
        <span>{t.gallery.title1}</span>
        <span className={css.break}>{t.gallery.title2}</span>
        <br />
        <span className={css.club}> mafia dream club</span>
      </h2>
      <Container>
        <ImageGallery images={paginatedImages} allImages={imagesFiles} />
        <div className={css.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`${css.pageBtn} ${
                currentPage === i + 1 ? css.active : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className={css.mainBtnWrapForMargin}>
          <Overlay />
        </div>

        <ScrollTopBtn />
      </Container>
    </>
  );
};

export default Gallery;
