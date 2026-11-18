import Image from "next/image";
import css from "./Thread.module.css";
import { toThumb } from "@/lib/images";

const link = "/images/";

interface ThreadProps {
  imagePaths: string[];
  double?: boolean;
}

const Thread: React.FC<ThreadProps> = ({ imagePaths, double = false }) => {
  // Small 640px previews (full-size photos only load in the gallery modal).
  // width/height describe the 3:2 slot the CSS crops every photo into
  // (object-fit: cover), not each file's own dimensions.
  const imagesFiles = imagePaths.map((path, index) => ({
    id: `${index + 1}`,
    src: `${link}${toThumb(path)}`,
    alt: `Image ${index + 1}`,
    width: 600,
    height: 400,
  }));

  const finalImages = double ? [...imagesFiles, ...imagesFiles] : imagesFiles;

  return (
    <div className={css.gallery}>
      <ul className={css.gallery_list}>
        {finalImages.map((img, index) => {
          // The second copy only exists to make the marquee loop seamlessly:
          // hide it from assistive tech so every photo is announced once.
          const isLoopCopy = index >= imagesFiles.length;
          return (
            <li
              className={css.gallery_item}
              key={`${img.id}-${index}`}
              aria-hidden={isLoopCopy || undefined}
            >
              <Image
                src={img.src}
                alt={isLoopCopy ? "" : img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={css.imageThumbnail}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Thread;
