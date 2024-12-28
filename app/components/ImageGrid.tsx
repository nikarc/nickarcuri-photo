import { Dispatch, SetStateAction, useMemo } from "react";
import { Object, ObjectList } from "aws-sdk/clients/s3";
import Image from "next/image";

type Props = {
  setLightboxOpen: Dispatch<SetStateAction<string | null>>;
};

export const ImageGrid = ({
  setLightboxOpen,
  s3Objects,
}: { s3Objects: ObjectList } & Props) => {
  const thumbs = useMemo(
    () => s3Objects.filter((i) => !i.Key?.includes("_FULL")),
    [s3Objects],
  );

  return (
    <div className="grid grid-cols-1 image-grid px-2 pb-8 gap-2 sm:gap-0 sm:px-0 sm:max-w-[66vw] sm:h-[100vh] sm:overflow-y-scroll no-scrollbar snap-mandatory snap-y">
      {thumbs.map(({ Key }, index) => {
        return (
          <MasonryCard
            key={Key}
            data={{ Key }}
            index={index}
            setLightboxOpen={setLightboxOpen}
          />
        );
      })}
    </div>
  );
};

const MasonryCard = ({
  data: { Key },
  setLightboxOpen,
}: { index: number; data: Object } & Props) => {
  const url = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${Key}`;

  return (
    <div
      key={Key}
      className="flex items-center aspect-square sm:aspect-auto sm:h-[100vh] cursor-zoom-in"
      onClick={() => setLightboxOpen(url)}
    >
      <div className="relative sm:h-[98%] h-full w-full snap-start sm:snap-center">
        <Image
          alt={`${Key}`}
          className="object-cover sm:object-contain sm:object-left"
          fill
          src={url}
        />
      </div>
    </div>
  );
};
