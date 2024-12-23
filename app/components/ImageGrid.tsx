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
        <div className="image-grid max-w-[66vw] h-[100vh] overflow-y-scroll no-scrollbar snap-mandatory snap-y">
            {s3Objects.map(({ Key }, index) => {
                return <MasonryCard key={Key} data={{ Key }} index={index} />;
            })}
        </div>
    );
};

const MasonryCard = ({ data: { Key } }: { index: number; data: Object }) => (
    <div key={Key} className="h-[100vh] flex items-center">
        <div className="relative h-[98vh] w-full snap-center">
            <Image
                alt={`${Key}`}
                className="object-contain object-left"
                fill
                src={`https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${Key}`}
            />
        </div>
    </div>
);
