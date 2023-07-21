import { Box } from '@react-three/drei';
import { Vector3 } from 'three';

interface SortCubeProps {
  value: number;
  maxVal: number;
  position: [number, number, number];
}

export const SortCube = ({ value, maxVal, position }: SortCubeProps) => {
  const scale = new Vector3(1, value / maxVal, 1);
  return (
    <Box args={[1, 1, 1]} position={position} scale={scale}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
};
