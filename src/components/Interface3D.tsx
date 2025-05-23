
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

interface Interface3DProps {
  onSettingsChange: (settings: any) => void;
}

const Interface3D = ({ onSettingsChange }: Interface3DProps) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState([0.5]);
  const [particleCount, setParticleCount] = useState([800]);

  useEffect(() => {
    onSettingsChange({
      autoRotate,
      rotationSpeed: rotationSpeed[0],
      particleCount: particleCount[0]
    });
  }, [autoRotate, rotationSpeed, particleCount, onSettingsChange]);

  return (
    <Card className="absolute top-4 right-4 w-64 bg-slate-900/90 backdrop-blur-xl border-white/10 text-white shadow-xl rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
          <Settings className="w-4 h-4" />
          Configurações
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 text-xs">
        {/* Auto-rotação */}
        <div className="flex items-center justify-between">
          <span>Auto-rotação</span>
          <Switch 
            checked={autoRotate} 
            onCheckedChange={setAutoRotate}
            className="scale-75"
          />
        </div>
        
        {/* Velocidade */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Velocidade</span>
            <span className="text-blue-400">{rotationSpeed[0].toFixed(1)}x</span>
          </div>
          <Slider
            value={rotationSpeed}
            onValueChange={setRotationSpeed}
            max={2}
            min={0.1}
            step={0.1}
            className="h-1"
          />
        </div>
        
        {/* Partículas */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Partículas</span>
            <span className="text-purple-400">{particleCount[0]}</span>
          </div>
          <Slider
            value={particleCount}
            onValueChange={setParticleCount}
            max={1500}
            min={200}
            step={100}
            className="h-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Interface3D;
