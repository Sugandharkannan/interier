"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Pre-load texture inside double-sided sphere
function PanoramaSphere({ url }: { url: string }) {
  const texture = useTexture(url);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

export default function WalkthroughScene({ url }: { url: string }) {
  return (
    <div className="w-full h-full relative bg-[#050505]">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="w-6 h-6 border border-t-primary border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-widest text-text-secondary">
              Generating 360° Dome...
            </span>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }} className="w-full h-full">
          <PanoramaSphere url={url} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            rotateSpeed={-0.4} // Reverse direction to feel more natural when dragging inside
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
