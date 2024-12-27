import { useMemo } from "react";
import _Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  images: { src: string }[];
  lightboxOpen: string | null;
  closeLightbox: () => void;
};

export const Lightbox = ({
  images,
  lightboxOpen: lightBoxOpen,
  closeLightbox,
}: Props) => {
  const sortedImages = useMemo(() => {
    if (lightBoxOpen === null) return images;

    const index = images.findIndex(
      (i) => i.src.replace("_FULL", "") === lightBoxOpen,
    );

    if (!index) return images;

    return [...images.slice(index), ...images.slice(0, index - 1)];
  }, [images, lightBoxOpen]);

  return (
    <_Lightbox
      open={lightBoxOpen !== null}
      close={closeLightbox}
      slides={sortedImages}
    />
  );
};
