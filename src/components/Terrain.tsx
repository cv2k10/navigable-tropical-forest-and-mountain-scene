import React, { useMemo } from 'react';
import { BufferAttribute, Color } from 'three';
import { noise } from '../utils/perlin';

export const Terrain: React.FC = () => {
  const size = 100;
  const resolution = 128;

  const { vertices, colors } = useMemo(() => {
    const vertices = [];
    const colors = [];
    const lightColor = new Color('#E6D7B8'); // Light soil color
    const darkColor = new Color('#8B4513'); // Dark soil color

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = (i / resolution - 0.5) * size;
        const z = (j / resolution - 0.5) * size;
        const y = noise(x * 0.1, z * 0.1) * 10;
        vertices.push(x, y, z);

        // Calculate color based on height
        const t = (y + 10) / 20; // Normalize height to 0-1 range
        const color = new Color().lerpColors(lightColor, darkColor, t);
        colors.push(color.r, color.g, color.b);
      }
    }
    return { 
      vertices: new Float32Array(vertices),
      colors: new Float32Array(colors)
    };
  }, [size, resolution]);

  const indices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const a = i * (resolution + 1) + j;
        const b = a + 1;
        const c = a + (resolution + 1);
        const d = c + 1;
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }
    return new Uint32Array(indices);
  }, [resolution]);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={indices}
          itemSize={1}
        />
      </bufferGeometry>
      <meshPhongMaterial vertexColors />
    </mesh>
  );
};