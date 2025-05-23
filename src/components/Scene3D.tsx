
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import { Suspense } from 'react';
import AnimatedTorus from './AnimatedTorus';
import InteractiveSphere from './InteractiveSphere';
import FloatingCubes from './FloatingCubes';
import ParticleField from './ParticleField';

const Scene3D = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <Suspense fallback={null}>
          {/* Iluminação */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, 5]} intensity={0.5} color="#4facfe" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} color="#00f2fe" />
          
          {/* Ambiente HDR */}
          <Environment preset="night" />
          
          {/* Controles de órbita */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          
          {/* Objetos 3D */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <AnimatedTorus position={[-3, 2, 0]} />
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <InteractiveSphere position={[3, -1, 2]} />
          </Float>
          
          <FloatingCubes />
          <ParticleField />
          
          {/* Texto 3D */}
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <Center position={[0, -3, 0]}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.8}
                height={0.1}
                curveSegments={12}
              >
                Modelos 3D
                <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.2} />
              </Text3D>
            </Center>
          </Float>
        </Suspense>
      </Canvas>
      
      {/* Interface de controle */}
      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-md rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">Controles 3D</h3>
        <ul className="text-sm space-y-1">
          <li>🖱️ Arrastar: Rotacionar câmera</li>
          <li>🎯 Scroll: Zoom in/out</li>
          <li>✨ Auto-rotação ativada</li>
        </ul>
      </div>
    </div>
  );
};

export default Scene3D;
