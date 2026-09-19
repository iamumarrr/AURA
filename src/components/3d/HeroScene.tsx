import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function AbstractCulinaryShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <spotLight position={[-10, -10, -5]} intensity={0.5} color="#d4af37" />
        
        <PresentationControls
          global

          snap={true}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <AbstractCulinaryShape />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
