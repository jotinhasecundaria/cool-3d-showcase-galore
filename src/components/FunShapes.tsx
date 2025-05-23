
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const FunShapes = () => {
  const duckRef = useRef<Mesh>(null);
  const bottleRef = useRef<Mesh>(null);
  const bathtubRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (duckRef.current) {
      duckRef.current.rotation.y += delta * 0.5;
      duckRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (bottleRef.current) {
      bottleRef.current.rotation.x += delta * 0.3;
      bottleRef.current.rotation.z += delta * 0.2;
    }
    if (bathtubRef.current) {
      bathtubRef.current.rotation.y += delta * 0.4;
    }
  });

  // Pato mais elaborado
  const DuckShape = () => (
    <group ref={duckRef} position={[-3, 2, 2]}>
      {/* Corpo principal */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 12]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
      {/* Cabeça */}
      <mesh position={[0, 0.7, 0.3]}>
        <sphereGeometry args={[0.5, 12, 8]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
      {/* Bico */}
      <mesh position={[0, 0.6, 0.8]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshPhongMaterial color="#FF8C00" />
      </mesh>
      {/* Olhos */}
      <mesh position={[-0.15, 0.8, 0.6]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.8, 0.6]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      {/* Asas */}
      <mesh position={[-0.6, 0.2, -0.2]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0.6, 0.2, -0.2]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
    </group>
  );

  // Garrafa de champanhe mais detalhada
  const ChampagneBottle = () => (
    <group ref={bottleRef} position={[3, 1, -2]}>
      {/* Corpo da garrafa */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.35, 2, 12]} />
        <meshPhongMaterial color="#006400" />
      </mesh>
      {/* Gargalo */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.6, 8]} />
        <meshPhongMaterial color="#006400" />
      </mesh>
      {/* Tampa */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 8]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
      {/* Rótulo */}
      <mesh position={[0, 0.3, 0.31]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshPhongMaterial color="#FFFFFF" />
      </mesh>
      {/* Papel alumínio no gargalo */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.4, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
    </group>
  );

  // Banheira mais realista
  const Bathtub = () => (
    <group ref={bathtubRef} position={[0, -1, 3]}>
      {/* Base da banheira */}
      <mesh>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshPhongMaterial color="#FFFFFF" />
      </mesh>
      {/* Parte interna */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.8, 0.6, 0.8]} />
        <meshPhongMaterial color="#F0F8FF" />
      </mesh>
      {/* Torneira */}
      <mesh position={[0.8, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      {/* Pés da banheira */}
      <mesh position={[-0.7, -0.6, -0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      <mesh position={[0.7, -0.6, -0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      <mesh position={[-0.7, -0.6, 0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      <mesh position={[0.7, -0.6, 0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
    </group>
  );

  return (
    <>
      <DuckShape />
      <ChampagneBottle />
      <Bathtub />
    </>
  );
};

export default FunShapes;
