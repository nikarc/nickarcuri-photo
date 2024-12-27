"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { ImageGrid } from "./components/ImageGrid";
import { Lightbox } from "./components/Lightbox";
import { ObjectList } from "aws-sdk/clients/s3";
import { listS3Objects } from "./actions/aws-s3";

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState<string | null>(null);
  const [s3Objects, setS3Objects] = useState<ObjectList>([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const objects = await listS3Objects();
      setS3Objects(objects);
    };

    asyncEffect();
  }, []);

  const urls = useMemo(() => {
    const output = [];

    for (const { Key } of s3Objects) {
      if (!Key || !Key.includes("_FULL")) continue;

      const url = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${Key}`;
      output.push({ src: url });
    }

    return output;
  }, [s3Objects]);

  return (
    <div>
      <main className="grid grid-cols-1 sm:grid-cols-[400px_1fr] h-[100vh] sm:overflow-y-hidden">
        <Header />
        <ImageGrid s3Objects={s3Objects} setLightboxOpen={setLightboxOpen} />
        <Lightbox
          closeLightbox={() => setLightboxOpen(null)}
          lightboxOpen={lightboxOpen}
          images={urls}
        />
      </main>
    </div>
  );
}
