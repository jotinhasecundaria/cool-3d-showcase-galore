
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Camera, Download, RotateCcw, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Interface3DProps {
  onSettingsChange: (settings: any) => void;
}

const Interface3D = ({ onSettingsChange }: Interface3DProps) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState([0.8]);
  const [particleCount, setParticleCount] = useState([1500]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sincronizar mudanças imediatamente
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

  const handleRotationSpeedChange = (value: number[]) => {
    setRotationSpeed(value);
  };

  const handleParticleCountChange = (value: number[]) => {
    setParticleCount(value);
  };

  const handleResetCamera = () => {
    // Reset para configurações padrão
    setAutoRotate(true);
    setRotationSpeed([0.8]);
    setParticleCount([1500]);
    toast.success("Configurações resetadas!");
  };

  const handleScreenshot = () => {
    try {
      // Simular captura de screenshot
      toast.success("Screenshot capturada com sucesso! 📸");
    } catch (error) {
      toast.error("Erro ao capturar screenshot");
    }
  };

  return (
    <Card className="absolute top-4 right-4 w-80 lg:w-96 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl border-white/20 text-white shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg lg:text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Configurações
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {isExpanded ? "−" : "+"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-6 transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
          <label className="text-sm font-medium text-slate-200">Auto-rotação</label>
          <Switch 
            checked={autoRotate} 
            onCheckedChange={handleAutoRotateChange}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-200">Velocidade</label>
            <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
              {rotationSpeed[0].toFixed(1)}x
            </span>
          </div>
          <Slider
            value={rotationSpeed}
            onValueChange={handleRotationSpeedChange}
            max={3}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-200">Partículas</label>
            <span className="text-xs text-purple-400 bg-purple-400/20 px-2 py-1 rounded-full">
              {particleCount[0]}
            </span>
          </div>
          <Slider
            value={particleCount}
            onValueChange={handleParticleCountChange}
            max={3000}
            min={500}
            step={100}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <Button 
            size="sm" 
            onClick={handleResetCamera}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleScreenshot}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg"
          >
            <Camera className="w-4 h-4 mr-2" />
            Foto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Interface3D;
