import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { noise } from '../utils/perlin';

interface RocksProps {
  count: number;
}

export const Rocks: React.FC<RocksProps> = ({ count }) => {
  const rocks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 95;
      const z = (Math.random() - 0.5) * 95;
      const y = noise(x * 0.1, z * 0.1) * 10;
      
      // Adjusted scale to make rocks smaller
      const scale = 0.2 + Math.random() * 0.6;

      temp.push({ position: new Vector3(x, y, z), scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {rocks.map((rock, index) => (
        <group 
          key={index} 
          position={rock.position}
          scale={[rock.scale, rock.scale, rock.scale]}
        >
          <mesh>
            <dodecahedronGeometry args={[1, 0]} />
            <meshPhongMaterial color="#808080" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </>
  );
};