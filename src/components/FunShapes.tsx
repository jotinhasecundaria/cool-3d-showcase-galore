
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const FunShapes = () => {
  const bathtubRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (bathtubRef.current) {
      bathtubRef.current.rotation.y += delta * 0.2;
      bathtubRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Banheira otimizada
  const Bathtub = () => (
    <group ref={bathtubRef} position={[0, -1, 2]}>
      {/* Base da banheira */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.6, 0.9]} />
        <meshPhysicalMaterial 
          color="#FFFFFF" 
          metalness={0.1}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
      {/* Parte interna */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.6, 0.5, 0.7]} />
        <meshPhysicalMaterial 
          color="#F0F8FF" 
          metalness={0.0}
          roughness={0.1}
          transmission={0.1}
        />
      </mesh>
      {/* Torneira simples */}
      <mesh position={[0.7, 0.4, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshPhysicalMaterial 
          color="#C0C0C0" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );

  return <Bathtub />;
};

export default FunShapes;
