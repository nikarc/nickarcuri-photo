import { useEffect, useState } from "react";
import { listS3Objects } from "../actions/aws-s3";
import { Object, ObjectList } from "aws-sdk/clients/s3";
import Image from "next/image";

export const ImageGrid = () => {
    const [s3Objects, setS3Objects] = useState<ObjectList>([]);

    useEffect(() => {
        const asyncEffect = async () => {
            console.log("Listing S3 objects...");
            const objects = await listS3Objects();
            setS3Objects(objects);
        };

        asyncEffect();
    }, []);

    return (
        <div className="grid grid-cols-1 image-grid px-2 pb-8 gap-2 sm:gap-0 sm:px-0 sm:max-w-[66vw] sm:h-[100vh] sm:overflow-y-scroll no-scrollbar snap-mandatory snap-y">
            {s3Objects.map(({ Key }, index) => {
                return <MasonryCard key={Key} data={{ Key }} index={index} />;
            })}
        </div>
    );
};

const MasonryCard = ({ data: { Key } }: { index: number; data: Object }) => (
    <div
        key={Key}
        className="flex items-center aspect-square sm:aspect-auto sm:h-[100vh]"
    >
        <div className="relative sm:h-[98%] h-full w-full snap-start sm:snap-center">
            <Image
                alt={`${Key}`}
                className="object-cover sm:object-contain sm:object-left"
                fill
                src={`https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${Key}`}
            />
        </div>
    </div>
);
