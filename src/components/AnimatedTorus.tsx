
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
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <torusGeometry args={[1.8, 0.6, 20, 100]} />
      <meshPhysicalMaterial 
        color="#ff6b6b"
        metalness={0.9}
        roughness={0.1}
        emissive="#9c97e0"
        emissiveIntensity={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.1}
        thickness={0.5}
      />
    </mesh>
  );
};

export default AnimatedTorus;
