
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

const FloatingCubes = () => {
  const groupRef = useRef<Group>(null);
  
  const cubes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    position: [
      Math.sin((i / 8) * Math.PI * 2) * 4,
      Math.cos((i / 8) * Math.PI * 2) * 2,
      Math.sin((i / 8) * Math.PI * 4) * 3
    ] as [number, number, number],
    color: `hsl(${(i / 8) * 360}, 70%, 60%)`,
    speed: 0.5 + (i * 0.1)
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x += cubes[index].speed * 0.01;
        child.rotation.y += cubes[index].speed * 0.015;
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube) => (
        <mesh key={cube.id} position={cube.position}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial 
            color={cube.color}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingCubes;
