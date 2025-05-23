
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface AnimatedTorusProps {
  position: [number, number, number];
}

const AnimatedTorus = ({ position }: AnimatedTorusProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.5, 0.5, 16, 100]} />
      <meshStandardMaterial 
        color="#ff6b6b"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff6b6b"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

export default AnimatedTorus;
