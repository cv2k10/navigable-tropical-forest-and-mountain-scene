import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { noise } from '../utils/perlin';

interface TreesProps {
  count: number;
}

export const Trees: React.FC<TreesProps> = ({ count }) => {
  const trees = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      const y = noise(x * 0.1, z * 0.1) * 10;
      
      const scale = 0.3 + Math.random() * 1.2;

      temp.push({ position: new Vector3(x, y, z), scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {trees.map((tree, index) => (
        <group 
          key={index} 
          position={tree.position}
          scale={[tree.scale, tree.scale, tree.scale]}
        >
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 4, 8]} /> {/* Increased height from 2 to 4 */}
            <meshPhongMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 2.5, 0]}> {/* Adjusted y-position from 1.5 to 2.5 */}
            <coneGeometry args={[1, 2, 8]} />
            <meshPhongMaterial color="#228B22" />
          </mesh>
        </group>
      ))}
    </>
  );
};