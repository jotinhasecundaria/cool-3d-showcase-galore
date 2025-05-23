
import { useState } from 'react';
import Scene3D from '@/components/Scene3D';
import Interface3D from '@/components/Interface3D';

const Index = () => {
  const [settings, setSettings] = useState({
    autoRotate: true,
    rotationSpeed: 0.5,
    particleCount: 1000
  });

  const handleSettingsChange = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Título principal */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Modelos 3D Interativos
        </h1>
        <p className="text-white/80 text-center mt-2 text-lg">
          Explore geometrias 3D incríveis com interação em tempo real
        </p>
      </div>

      {/* Cena 3D */}
      <Scene3D />
      
      {/* Interface de controle */}
      <Interface3D onSettingsChange={handleSettingsChange} />
      
      {/* Informações de performance */}
      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-md rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>WebGL Ativo</span>
        </div>
      </div>
      
      {/* Gradiente de fundo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 pointer-events-none"></div>
    </div>
  );
};

export default Index;
