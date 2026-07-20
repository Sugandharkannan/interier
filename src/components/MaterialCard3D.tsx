"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function MaterialSlab({ color, isGlass }: { color: string; isGlass?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating oscillations
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.9, 2.6, 0.2]} />
      {isGlass ? (
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={1.5}
          clearcoat={1.0}
        />
      ) : (
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={color === "#c5a059" ? 0.9 : 0.4} // Brass has higher metalness
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      )}
    </mesh>
  );
}

export default function MaterialCard3D({ color, isGlass }: { color: string; isGlass?: boolean }) {
  return (
    <div className="w-full h-[180px] bg-[#121212]/80 border border-white/5 rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ antialias: true }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        {/* Spot lights to catch specular reflections */}
        <pointLight position={[2, 3, 2]} intensity={1.5} color="#FFF" />
        <pointLight position={[-2, -3, 2]} intensity={0.8} color="#FFF" />
        <directionalLight position={[0, 5, 0]} intensity={0.5} />

        <MaterialSlab color={color} isGlass={isGlass} />
      </Canvas>
    </div>
  );
}
