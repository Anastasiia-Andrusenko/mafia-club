import Image from "next/image";
import css from "./Thread.module.css";

const link = "https://mafiadream.com.ua/wp-content/images/";

interface ThreadProps {
  imagePaths: string[];
  double?: boolean;
}

const Thread: React.FC<ThreadProps> = ({ imagePaths, double = false }) => {
  const imagesFiles = imagePaths.map((path, index) => ({
    id: `${index + 1}`,
    src: `${link}${path}`,
    alt: `Image ${index + 1}`,
    width: 600,
    height: 400,
  }));

  const finalImages = double ? [...imagesFiles, ...imagesFiles] : imagesFiles;

  return (
    <div className={css.gallery}>
      <ul className={css.gallery_list}>
        {finalImages.map((img, index) => (
          <li className={css.gallery_item} key={`${img.id}-${index}`}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={css.imageThumbnail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Thread;
