
import { useState } from 'react';
import Scene3D from '@/components/Scene3D';
import Interface3D from '@/components/Interface3D';

const Index = () => {
  const [settings, setSettings] = useState({
    autoRotate: true,
    rotationSpeed: 0.8,
    particleCount: 1500
  });

  const handleSettingsChange = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Título principal responsivo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
          Modelos 3D Interativos
        </h1>
        <p className="text-slate-300 text-sm md:text-lg lg:text-xl font-light max-w-2xl mx-auto">
          Explore geometrias 3D incríveis com interação em tempo real
        </p>
        <div className="mt-4 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* Cena 3D */}
      <Scene3D settings={settings} />
      
      {/* Interface de controle */}
      <Interface3D onSettingsChange={handleSettingsChange} />
      
      {/* Informações de performance */}
      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-900/60 to-emerald-800/40 backdrop-blur-xl rounded-xl p-3 text-white border border-green-400/20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <span className="text-sm font-medium text-green-100">WebGL Ativo</span>
        </div>
      </div>
      
      {/* Gradientes decorativos responsivos */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/15 to-pink-900/10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Index;
