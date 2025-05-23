
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
      meshRef.current.rotation.x += 0.004;
      meshRef.current.rotation.z += 0.008;
      
      // Efeito de pulsação mais suave quando clicado
      const scale = clicked ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15 : 1;
      const hoverScale = hovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(scale * hoverScale);
      
      // Movimento orbital suave
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[1.2, 2]} />
      <meshPhysicalMaterial 
        color={hovered ? "#4ecdc4" : "#45b7d1"}
        metalness={0.95}
        roughness={0.05}
        emissive={clicked ? "#4ecdc4" : "#000000"}
        emissiveIntensity={clicked ? 0.3 : 0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
        thickness={1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

export default InteractiveSphere;
