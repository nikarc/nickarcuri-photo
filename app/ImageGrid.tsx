import { useEffect } from "react";
import { listS3Objects } from "../aws-s3";

export const ImageGrid = () => {
    useEffect(() => {
        listS3Objects();
    }, []);

    return (
        <div className="grid grid-cols-2">
            <p>test</p>
            <p>test 2</p>
        </div>
    );
};
