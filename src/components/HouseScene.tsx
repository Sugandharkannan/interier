"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface RoomProps {
  id: string;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  selected: boolean;
  onSelect: (id: string) => void;
  playHover: () => void;
  furniture: React.ReactNode;
}

function Room({
  id,
  name,
  position,
  size,
  color,
  selected,
  onSelect,
  playHover,
  furniture,
}: RoomProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Clickable Floor Zone */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playHover();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={selected ? "#D4AF37" : hovered ? "#D4AF37" : "#111111"}
          transparent
          opacity={selected ? 0.35 : hovered ? 0.25 : 0.05}
          roughness={0.5}
        />
      </mesh>

      {/* Mini Furniture Group */}
      {furniture}

      {/* Floating Room Label */}
      <Html position={[0, 0.4, 0]} center distanceFactor={10}>
        <button
          onClick={() => onSelect(id)}
          className={`px-3 py-1 rounded text-[8px] font-semibold uppercase tracking-widest backdrop-blur-md transition-all duration-300 border ${
            selected
              ? "bg-primary text-bg-dark border-primary shadow-lg shadow-primary/20"
              : hovered
              ? "bg-white text-bg-dark border-white"
              : "bg-bg-dark/70 text-text-secondary border-white/10 hover:border-primary hover:text-white"
          }`}
        >
          {name}
        </button>
      </Html>
    </group>
  );
}

// Custom scene auto-rotation/breathing effects
function SceneRig() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating breathing rotation
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.05;
  });
  return <group ref={groupRef} />;
}

export default function HouseScene({
  selectedRoom,
  onSelectRoom,
  playHover,
}: {
  selectedRoom: string;
  onSelectRoom: (id: string) => void;
  playHover: () => void;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 6, 8], fov: 42 }}
      className="w-full h-full"
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#101010"]} />
      <ambientLight intensity={0.6} />

      {/* Soft volumetric top light */}
      <directionalLight
        position={[5, 10, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group position={[0, -0.5, 0]}>
        {/* Ground grid helper */}
        <gridHelper args={[12, 12, "#D4AF37", "#222"]} position={[0, -0.01, 0]} />

        {/* --- BLUEPRINT WALLS --- */}
        {/* Outer Boundary Walls */}
        <mesh position={[0, 0.4, -4]} receiveShadow castShadow>
          <boxGeometry args={[8.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#202020" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.4, 4]} receiveShadow castShadow>
          <boxGeometry args={[8.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#202020" roughness={0.8} />
        </mesh>
        <mesh position={[-4, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.8, 8.1]} />
          <meshStandardMaterial color="#202020" roughness={0.8} />
        </mesh>
        <mesh position={[4, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.8, 8.1]} />
          <meshStandardMaterial color="#202020" roughness={0.8} />
        </mesh>

        {/* Partition Walls */}
        {/* Horizontal dividing wall */}
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[8.0, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Vertical dividing wall (partial) */}
        <mesh position={[0, 0.4, -2]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.8, 4.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.4, 2]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.8, 4.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        {/* --- ROOM ZONE COMPOSITIONS --- */}

        {/* 1. Living Room: x: -2, z: 2 */}
        <Room
          id="living"
          name="Living Room"
          position={[-2, 0.025, 2]}
          size={[3.9, 0.05, 3.9]}
          color="#3b82f6"
          selected={selectedRoom === "living"}
          onSelect={onSelectRoom}
          playHover={playHover}
          furniture={
            <group>
              {/* Sofa (mini) */}
              <mesh position={[-0.8, 0.1, 0.4]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[1.2, 0.15, 0.4]} />
                <meshStandardMaterial color="#2c2c2c" />
              </mesh>
              {/* Coffee table */}
              <mesh position={[0.1, 0.06, 0.4]}>
                <boxGeometry args={[0.6, 0.1, 0.4]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.6} />
              </mesh>
              {/* TV Unit */}
              <mesh position={[1.0, 0.15, -1.0]}>
                <boxGeometry args={[1.4, 0.3, 0.2]} />
                <meshStandardMaterial color="#151515" />
              </mesh>
            </group>
          }
        />

        {/* 2. Bedroom: x: -2, z: -2 */}
        <Room
          id="bedroom"
          name="Bedroom"
          position={[-2, 0.025, -2]}
          size={[3.9, 0.05, 3.9]}
          color="#ef4444"
          selected={selectedRoom === "bedroom"}
          onSelect={onSelectRoom}
          playHover={playHover}
          furniture={
            <group>
              {/* Bed base */}
              <mesh position={[-0.6, 0.125, -0.6]}>
                <boxGeometry args={[1.2, 0.2, 1.4]} />
                <meshStandardMaterial color="#333" />
              </mesh>
              {/* Pillow */}
              <mesh position={[-0.6, 0.23, -1.15]}>
                <boxGeometry args={[1.0, 0.05, 0.3]} />
                <meshStandardMaterial color="#efeded" />
              </mesh>
              {/* Wardrobe */}
              <mesh position={[1.1, 0.35, 0.6]}>
                <boxGeometry args={[0.4, 0.7, 1.8]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          }
        />

        {/* 3. Kitchen & Dining: x: 2, z: 2 */}
        <Room
          id="kitchen"
          name="Kitchen"
          position={[2, 0.025, 2]}
          size={[3.9, 0.05, 3.9]}
          color="#10b981"
          selected={selectedRoom === "kitchen"}
          onSelect={onSelectRoom}
          playHover={playHover}
          furniture={
            <group>
              {/* Kitchen counter L-shape */}
              <mesh position={[1.0, 0.2, -0.6]}>
                <boxGeometry args={[0.5, 0.4, 2.2]} />
                <meshStandardMaterial color="#fff" roughness={0.1} />
              </mesh>
              <mesh position={[0.2, 0.2, -1.45]}>
                <boxGeometry args={[1.1, 0.4, 0.5]} />
                <meshStandardMaterial color="#fff" roughness={0.1} />
              </mesh>
              {/* Dining Table */}
              <mesh position={[-0.8, 0.18, 0.8]}>
                <cylinderGeometry args={[0.4, 0.4, 0.04, 16]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.7} />
              </mesh>
              <mesh position={[-0.8, 0.09, 0.8]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 8]} />
                <meshStandardMaterial color="#111" />
              </mesh>
            </group>
          }
        />

        {/* 4. Executive Office / Studio: x: 2, z: -2 (Bedroom 2/Office) */}
        <Room
          id="office"
          name="Studio Office"
          position={[2, 0.025, -2]}
          size={[3.9, 0.05, 3.9]}
          color="#8b5cf6"
          selected={selectedRoom === "office"}
          onSelect={onSelectRoom}
          playHover={playHover}
          furniture={
            <group>
              {/* Office desk */}
              <mesh position={[-0.2, 0.18, -0.6]}>
                <boxGeometry args={[1.4, 0.04, 0.6]} />
                <meshStandardMaterial color="#4A2511" roughness={0.4} />
              </mesh>
              {/* Desk leg */}
              <mesh position={[-0.8, 0.09, -0.6]}>
                <boxGeometry args={[0.04, 0.18, 0.5]} />
                <meshStandardMaterial color="#222" />
              </mesh>
              <mesh position={[0.4, 0.09, -0.6]}>
                <boxGeometry args={[0.04, 0.18, 0.5]} />
                <meshStandardMaterial color="#222" />
              </mesh>
              {/* Chair */}
              <mesh position={[-0.2, 0.15, 0.0]}>
                <boxGeometry args={[0.4, 0.3, 0.4]} />
                <meshStandardMaterial color="#111" />
              </mesh>
            </group>
          }
        />
      </group>

      <SceneRig />
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={3.5}
        maxDistance={12}
      />
    </Canvas>
  );
}
