
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
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ 
          background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #000000 100%)',
          filter: 'brightness(1.1) contrast(1.05)'
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          {/* Iluminação aprimorada */}
          <ambientLight intensity={0.4} color="#4f46e5" />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" castShadow />
          <pointLight position={[-10, -10, 5]} intensity={1.0} color="#06b6d4" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.4} 
            penumbra={1} 
            intensity={2.0} 
            color="#8b5cf6" 
            castShadow 
          />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f59e0b" />
          
          {/* Ambiente HDR */}
          <Environment preset="night" />
          
          {/* Controles de órbita responsivos */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={settings?.autoRotate ?? true}
            autoRotateSpeed={settings?.rotationSpeed ?? 0.8}
            maxDistance={20}
            minDistance={3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
          />
          
          {/* Objetos 3D com posicionamento melhorado */}
          <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
            <AnimatedTorus position={[-4, 1.5, -1]} />
          </Float>
          
          <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
            <InteractiveSphere position={[4, -0.5, 1.5]} />
          </Float>
          
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
            <FloatingCubes />
          </Float>
          
          {/* Formas divertidas melhoradas */}
          <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.0}>
            <FunShapes />
          </Float>
          
          <ParticleField count={settings?.particleCount ?? 1500} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
