
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface Interface3DProps {
  onSettingsChange: (settings: any) => void;
}

const Interface3D = ({ onSettingsChange }: Interface3DProps) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState([0.5]);
  const [particleCount, setParticleCount] = useState([1000]);

  const handleAutoRotateChange = (checked: boolean) => {
    setAutoRotate(checked);
    onSettingsChange({ autoRotate: checked });
  };

  return (
    <Card className="absolute top-4 right-4 w-80 bg-black/20 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Configurações 3D</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm">Auto-rotação</label>
          <Switch 
            checked={autoRotate} 
            onCheckedChange={handleAutoRotateChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Velocidade de rotação</label>
          <Slider
            value={rotationSpeed}
            onValueChange={setRotationSpeed}
            max={2}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Quantidade de partículas</label>
          <Slider
            value={particleCount}
            onValueChange={setParticleCount}
            max={2000}
            min={100}
            step={100}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-black">
            Reset Câmera
          </Button>
          <Button size="sm" variant="outline" className="text-black">
            Screenshot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Interface3D;
