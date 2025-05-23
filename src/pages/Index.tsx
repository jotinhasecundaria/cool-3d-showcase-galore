
import { useState } from 'react';
import Scene3D from '@/components/Scene3D';
import Interface3D from '@/components/Interface3D';
import './page.css'

const Index = () => {
  const [settings, setSettings] = useState({
    autoRotate: true,
    rotationSpeed: 0.5,
    particleCount: 800
  });

  const handleSettingsChange = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Título principal */}
      <div className="absolute top-6 w-full left-1/2 transform -translate-x-1/2 -translate-y-1 z-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Modelos 3D Interativos
        </h1>
        <p className="text-slate-300 text-sm md:text-lg font-light max-w-xl mx-auto">
          Explore geometrias 3D com performance otimizada
        </p>
      </div>

      {/* Cena 3D */}
      <Scene3D settings={settings} />
      
      {/* Interface de controle */}
      <Interface3D onSettingsChange={handleSettingsChange} />
      
      {/* Status de performance */}
      <div className="absolute bottom-4 left-4 bg-green-900/60 backdrop-blur-lg rounded-lg p-2 text-white border border-green-400/20">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>WebGL Otimizado</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
