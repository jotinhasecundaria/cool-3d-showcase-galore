
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface InteractiveSphereProps {
  position: [number, number, number];
}

const InteractiveSphere = ({ position }: InteractiveSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.z += 0.01;
      
      // Efeito de pulsação quando clicado
      const scale = clicked ? 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1 : 1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : scale);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial 
        color={hovered ? "#4ecdc4" : "#45b7d1"}
        metalness={0.9}
        roughness={0.1}
        emissive={clicked ? "#4ecdc4" : "#000000"}
        emissiveIntensity={clicked ? 0.2 : 0}
      />
    </mesh>
  );
};

export default InteractiveSphere;
