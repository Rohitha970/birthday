import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Flame({ position }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[0.15, 0.4, 16]} />
      <meshStandardMaterial color="orange" emissive="orange" />
    </mesh>
  );
}

function CakeModel() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[2, 2, 1.5, 32]} />
        <meshStandardMaterial color="#ffb703" />
      </mesh>

      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.3, 32]} />
        <meshStandardMaterial color="#ff6f91" />
      </mesh>

      {[ -0.8, 0, 0.8 ].map((x, i) => (
        <group key={i} position={[x, 1.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <Flame position={[0, 0.4, 0]} />
        </group>
      ))}
    </group>
  );
}

export default function CakeWithCandles() {
  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 50 }} style={{ height: 420 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <CakeModel />
      </Float>
    </Canvas>
  );
}
