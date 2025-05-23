
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import AnimatedTorus from './AnimatedTorus';
import InteractiveSphere from './InteractiveSphere';
import FloatingCubes from './FloatingCubes';
import ParticleField from './ParticleField';
import FunShapes from './FunShapes';

interface Scene3DProps {
  settings?: {
    autoRotate: boolean;
    rotationSpeed: number;
    particleCount: number;
  };
}

const Scene3D = ({ settings }: Scene3DProps) => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ 
          background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #000000 100%)',
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Iluminação simplificada */}
          <ambientLight intensity={0.3} color="#4f46e5" />
          <pointLight position={[5, 5, 5]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-5, -5, 3]} intensity={0.8} color="#06b6d4" />
          
          {/* Ambiente HDR */}
          <Environment preset="night" />
          
          {/* Controles de órbita */}
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
          />
          
          {/* Objetos 3D otimizados */}
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.0}>
            <AnimatedTorus position={[-3, 1, -1]} />
          </Float>
          
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <InteractiveSphere position={[3, -0.5, 1]} />
          </Float>
          
          <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
            <FloatingCubes />
          </Float>
          
          <Float speed={1.0} rotationIntensity={0.4} floatIntensity={0.6}>
            <FunShapes />
          </Float>
          
          <ParticleField count={settings?.particleCount ?? 800} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
