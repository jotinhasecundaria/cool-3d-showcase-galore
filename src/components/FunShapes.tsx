
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

const FunShapes = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x += 0.005;
        child.rotation.y += 0.008;
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Patinho de borracha */}
      <mesh position={[-6, 2, -2]} castShadow receiveShadow>
        <group>
          {/* Corpo do patinho */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700" 
              metalness={0.1}
              roughness={0.3}
              clearcoat={0.8}
            />
          </mesh>
          {/* Cabeça do patinho */}
          <mesh position={[0, 0.6, 0.3]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700" 
              metalness={0.1}
              roughness={0.3}
              clearcoat={0.8}
            />
          </mesh>
          {/* Bico */}
          <mesh position={[0, 0.5, 0.8]}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshPhysicalMaterial color="#FF8C00" />
          </mesh>
          {/* Olhos */}
          <mesh position={[-0.15, 0.7, 0.6]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshPhysicalMaterial color="#000000" />
          </mesh>
          <mesh position={[0.15, 0.7, 0.6]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshPhysicalMaterial color="#000000" />
          </mesh>
        </group>
      </mesh>

      {/* Garrafa de champanhe */}
      <mesh position={[0, 0, 3]} castShadow receiveShadow>
        <group>
          {/* Corpo da garrafa */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 2.5, 12]} />
            <meshPhysicalMaterial 
              color="#2D5016" 
              metalness={0.8}
              roughness={0.2}
              transmission={0.3}
              thickness={0.5}
            />
          </mesh>
          {/* Gargalo */}
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
            <meshPhysicalMaterial 
              color="#2D5016" 
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Tampa */}
          <mesh position={[0, 2.4, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.3, 8]} />
            <meshPhysicalMaterial 
              color="#FFD700" 
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Rótulo */}
          <mesh position={[0, -0.3, 0.51]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshPhysicalMaterial 
              color="#FFFFFF" 
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
        </group>
      </mesh>

      {/* Banheira */}
      <mesh position={[6, -1, 0]} castShadow receiveShadow>
        <group>
          {/* Base da banheira */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 0.8, 1.2]} />
            <meshPhysicalMaterial 
              color="#FFFFFF" 
              metalness={0.1}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
          {/* Torneira */}
          <mesh position={[-0.8, 0.6, 0]}>
            <torusGeometry args={[0.15, 0.05, 8, 16]} />
            <meshPhysicalMaterial 
              color="#C0C0C0" 
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Pés da banheira */}
          <mesh position={[-0.7, -0.6, 0.4]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
          <mesh position={[0.7, -0.6, 0.4]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
          <mesh position={[-0.7, -0.6, -0.4]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
          <mesh position={[0.7, -0.6, -0.4]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        </group>
      </mesh>

      {/* Espuma da banheira (bolhas) */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            5.5 + (Math.random() - 0.5) * 1.5,
            -0.2 + Math.random() * 0.4,
            (Math.random() - 0.5) * 0.8
          ]}
        >
          <sphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
          <meshPhysicalMaterial 
            color="#FFFFFF" 
            transparent
            opacity={0.7}
            transmission={0.8}
            thickness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FunShapes;
