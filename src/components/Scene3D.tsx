import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import AnimatedTorus from './AnimatedTorus';
import InteractiveSphere from './InteractiveSphere';
import FloatingCubes from './FloatingCubes';
import ParticleField from './ParticleField';

interface Scene3DProps {
  settings?: {
    autoRotate: boolean;
    rotationSpeed: number;
    particleCount: number;
  };
}

const createGradientTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Gradiente claro modificado
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
  gradient.addColorStop(0, '#1d183a1c'); 
  gradient.addColorStop(1, '#2a1f4724');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  return canvas;
};

const Scene3D = ({ settings }: Scene3DProps) => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 90 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }} // alpha: true para fundo transparente
      >
        {/* Remove o mesh de background */}
        
        <Suspense fallback={null}>
          {/* Define background totalmente transparente */}
          <color attach="background" args={[0x000000]} /> {/* Cor preta com alpha 0 */}
          <color attach="background" args={['rgba(0,0,0,0)']} /> // Alternativa

          {/* Ajuste de iluminação para fundo transparente */}
          <ambientLight intensity={0.8} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-5, -5, 3]} intensity={0.7} color="#ffffff" />
          
          {/* Remove ou ajusta o Environment */}
          <Environment preset="apartment" background={false} />

          {/* Restante do código mantido */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={settings?.autoRotate ?? true}
            autoRotateSpeed={settings?.rotationSpeed ?? 0.5}
            maxDistance={15}
            minDistance={3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
            target={[0, 0, 0]}
          />
          
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.0}>
            <AnimatedTorus position={[-3, 1, -1]} />
          </Float>
          
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <InteractiveSphere position={[3, -0.5, 1]} />
          </Float>
          
          <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
            <FloatingCubes />
          </Float>
          
          <ParticleField count={settings?.particleCount ?? 800} />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default Scene3D;