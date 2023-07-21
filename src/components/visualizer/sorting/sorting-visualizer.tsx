import { Canvas } from 'react-three-fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import { SortCube } from './cube';

interface SortingVisualizerProps {
  values: number[];
}

export const SortingVisualizer = ({ values }: SortingVisualizerProps) => {
  const maxVal = Math.max(...values);
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="white" />
      </Plane>

      {values.map((value, i) => (
        <SortCube key={i} value={value} maxVal={maxVal} position={[i - values.length / 2, value / (2 * maxVal), 0]} />
      ))}
    </Canvas>
  );
};
