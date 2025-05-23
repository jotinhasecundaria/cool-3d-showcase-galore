
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Interface3DProps {
  onSettingsChange: (settings: any) => void;
}

const Interface3D = ({ onSettingsChange }: Interface3DProps) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState([0.8]);
  const [particleCount, setParticleCount] = useState([1500]);

  useEffect(() => {
    onSettingsChange({
      autoRotate,
      rotationSpeed: rotationSpeed[0],
      particleCount: particleCount[0]
    });
  }, [autoRotate, rotationSpeed, particleCount, onSettingsChange]);

  const handleAutoRotateChange = (checked: boolean) => {
    setAutoRotate(checked);
    toast.success(checked ? "Auto-rotação ativada" : "Auto-rotação desativada");
  };

  const handleReset = () => {
    setAutoRotate(true);
    setRotationSpeed([0.8]);
    setParticleCount([1500]);
    toast.success("Configurações resetadas!");
  };

  return (
    <Card className="absolute top-4 right-4 w-72 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border-white/20 text-white shadow-2xl rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <Settings className="w-4 h-4 text-blue-400" />
          Configurações
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Auto-rotação */}
        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
          <span className="text-xs font-medium">Auto-rotação</span>
          <Switch 
            checked={autoRotate} 
            onCheckedChange={handleAutoRotateChange}
            className="data-[state=checked]:bg-blue-500 scale-75"
          />
        </div>
        
        {/* Velocidade */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Velocidade</span>
            <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded">
              {rotationSpeed[0].toFixed(1)}x
            </span>
          </div>
          <Slider
            value={rotationSpeed}
            onValueChange={setRotationSpeed}
            max={3}
            min={0.1}
            step={0.1}
            className="w-full h-1"
          />
        </div>
        
        {/* Partículas */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Partículas</span>
            <span className="text-xs text-purple-400 bg-purple-400/20 px-2 py-0.5 rounded">
              {particleCount[0]}
            </span>
          </div>
          <Slider
            value={particleCount}
            onValueChange={setParticleCount}
            max={3000}
            min={500}
            step={100}
            className="w-full h-1"
          />
        </div>
        
        {/* Botão Reset */}
        <Button 
          size="sm" 
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg h-8 text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};

export default Interface3D;
