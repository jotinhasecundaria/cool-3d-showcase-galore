import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, MathUtils } from 'three';

interface InteractiveSphereProps {
  position: [number, number, number];
}

const InteractiveSphere = ({ position }: InteractiveSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Refs para animações suaves
  const hoverScaleFactor = useRef(1);
  const currentColor = useRef(new Color("#45b7d1"));
  const currentEmissive = useRef(new Color("#000000"));
  const currentEmissiveIntensity = useRef(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Animações de rotação
      meshRef.current.rotation.x += 0.004;
      meshRef.current.rotation.z += 0.008;

      // Transição de escala ao passar o mouse
      const targetHoverScale = hovered ? 1.1 : 1;
      hoverScaleFactor.current = MathUtils.lerp(
        hoverScaleFactor.current,
        targetHoverScale,
        5 * delta
      );

      // Efeito de pulsação quando clicado
      const pulseScale = clicked ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15 : 1;
      const totalScale = pulseScale * hoverScaleFactor.current;
      meshRef.current.scale.setScalar(totalScale);

      // Movimento orbital suave
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.4) * 0.2;

      // Transições de cor
      const targetColor = new Color(hovered ? "#4ecdc4" : "#45b7d1");
      currentColor.current.lerp(targetColor, 5 * delta);

      // Transições de emissividade
      const targetEmissive = new Color(clicked ? "#4ecdc4" : "#4e4e4e");
      currentEmissive.current.lerp(targetEmissive, 5 * delta);

      // Intensidade da emissividade
      const targetEmissiveIntensity = clicked ? 0.3 : 0;
      currentEmissiveIntensity.current = MathUtils.lerp(
        currentEmissiveIntensity.current,
        targetEmissiveIntensity,
        5 * delta
      );

      // Aplicar valores ao material
      meshRef.current.material.color.copy(currentColor.current);
      meshRef.current.material.emissive.copy(currentEmissive.current);
      meshRef.current.material.emissiveIntensity = currentEmissiveIntensity.current;
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
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.5}
        thickness={1.5}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

export default InteractiveSphere;