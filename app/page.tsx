"use client";

import { Header } from "./Header";
import { ImageGrid } from "./components/ImageGrid";

export default function Home() {
    return (
        <div>
            <main className="grid grid-cols-[400px_1fr] h-[100vh] overflow-y-hidden">
                <Header />
                <ImageGrid />
            </main>
        </div>
    );
}
