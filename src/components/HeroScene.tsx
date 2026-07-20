"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";

// Custom script to float particles
function FloatingParticles({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = Math.random() * 4;
      const z = (Math.random() - 0.5) * 8;
      const speed = 0.005 + Math.random() * 0.005;
      const scale = 0.01 + Math.random() * 0.02;
      temp.push({ x, y, z, speed, scale });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed;
      if (p.y > 4) p.y = 0; // wrap around
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null as any, null as any, count]} castShadow>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// Custom interactive camera tracking mouse coordinates
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Rotate slightly on mouse hover
    const targetX = state.mouse.x * 1.5;
    const targetY = state.mouse.y * 0.5 + 1.8;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    // Smooth breathing zoom
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      4.2 + Math.sin(t * 0.5) * 0.1,
      0.05
    );
    state.camera.lookAt(0, 0.7, 0);
  });
  return null;
}

// Procedural Sofa Mesh
function Sofa() {
  return (
    <group position={[0, 0, 0]}>
      {/* Sofa Base */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.25, 0.9]} />
        <meshStandardMaterial color="#181818" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Main Cushions */}
      <mesh position={[-0.6, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.18, 0.85]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.6} />
      </mesh>
      <mesh position={[0.6, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.18, 0.85]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.6} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.7, -0.38]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>

      {/* Armrests */}
      <mesh position={[-1.3, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.55, 0.9]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>
      <mesh position={[1.3, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.55, 0.9]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Coffee Table Mesh
function CoffeeTable() {
  return (
    <group position={[0, 0, 0.95]}>
      {/* Metal Legs */}
      <mesh position={[0, 0.125, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[-0.4, 0.125, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0.4, 0.125, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Glass Top */}
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={1.5}
        />
      </mesh>

      {/* Decorative Book on Table */}
      <mesh position={[0.1, 0.28, 0.1]} rotation={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.16]} />
        <meshStandardMaterial color="#4A1525" roughness={0.5} />
      </mesh>
    </group>
  );
}

// High-End Lamp Mesh
function FloorLamp() {
  return (
    <group position={[-1.7, 0, 0.4]}>
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
        <meshStandardMaterial color="#111" metalness={0.5} />
      </mesh>
      {/* Stand rod */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 1.9, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[0, 1.9, 0]} rotation={[0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.1, 0.25, 16]} />
        <meshStandardMaterial color="#222" metalness={0.3} />
      </mesh>
      {/* Light Bulb glow */}
      <mesh position={[0, 1.8, 0.06]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FFF" />
      </mesh>
      {/* Warm Point Light */}
      <pointLight position={[0, 1.7, 0.1]} color="#FFAA44" intensity={1.5} distance={3.5} castShadow />
    </group>
  );
}

// Background Wall & Floor Scene
function RoomEnvironment() {
  return (
    <group>
      {/* Hardwood Wood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0b0a09" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Main Back Wall */}
      <mesh position={[0, 2, -1.8]} receiveShadow>
        <planeGeometry args={[12, 4]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* Decorative Wall Artwork/Painting Frame */}
      <mesh position={[0, 2, -1.77]} castShadow>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      {/* Golden Canvas Artwork Texture */}
      <mesh position={[0, 2, -1.76]}>
        <planeGeometry args={[1.7, 1.1]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 2, 4.2], fov: 48 }}
      className="w-full h-full"
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 3.5, 6]} />

      {/* High-fidelity Lights */}
      <ambientLight intensity={0.4} color="#FFF" />

      {/* Warm Sunlight projection */}
      <directionalLight
        position={[4, 5, 2]}
        color="#FFF6E0"
        intensity={2.0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      />

      {/* Volumetric accent light from right wall */}
      <spotLight
        position={[2.5, 3, -1]}
        angle={Math.PI / 6}
        penumbra={0.6}
        intensity={1.2}
        color="#D4AF37"
        castShadow
      />

      <Center>
        <group position={[0, 0, 0]}>
          <RoomEnvironment />
          <Sofa />
          <CoffeeTable />
          <FloorLamp />
        </group>
      </Center>

      {/* Drift particles */}
      <FloatingParticles count={60} />

      {/* Interactive controls and rig */}
      <CameraRig />
    </Canvas>
  );
}
