
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
          <ambientLight intensity={0.3} color="#4f46e5" />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" castShadow />
          <pointLight position={[-10, -10, 5]} intensity={0.8} color="#06b6d4" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.4} 
            penumbra={1} 
            intensity={1.5} 
            color="#8b5cf6" 
            castShadow 
          />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f59e0b" />
          
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
          
          {/* Novas formas divertidas */}
          <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.0}>
            <FunShapes />
          </Float>
          
          <ParticleField count={settings?.particleCount ?? 1500} />
        </Suspense>
      </Canvas>
      
      {/* Interface de controle redesenhada */}
      <div className="absolute top-4 left-4 bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl rounded-2xl p-4 lg:p-6 text-white border border-white/10 shadow-2xl max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Controles 3D
          </h3>
        </div>
        <ul className="text-sm lg:text-base space-y-2 text-slate-200">
          <li className="flex items-center gap-2">
            <span className="text-blue-400">🖱️</span>
            <span>Arrastar para rotacionar</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400">🎯</span>
            <span>Scroll para zoom</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✨</span>
            <span>Auto-rotação ativa</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scene3D;
