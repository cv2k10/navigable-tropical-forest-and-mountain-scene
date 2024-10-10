import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export const SunAndClouds: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const Cloud: React.FC<{ position: [number, number, number], scale: number }> = ({ position, scale }) => {
    const geometry = useMemo(() => {
      const geo = new THREE.SphereGeometry(1, 32, 32);
      const vertices = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < vertices.length; i += 3) {
        vertices[i] += (Math.random() - 0.5) * 0.3;
        vertices[i + 1] += (Math.random() - 0.5) * 0.3;
        vertices[i + 2] += (Math.random() - 0.5) * 0.3;
      }
      return geo;
    }, []);

    return (
      <group position={position} scale={[scale, scale * 0.6, scale]}>
        <mesh geometry={geometry}>
          <meshLambertMaterial
            map={cloudTexture}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  };

  useFrame(({ clock }) => {
    if (sunRef.current) {
      const time = clock.getElapsedTime() * 0.1;
      const radius = 80;
      sunRef.current.position.x = Math.cos(time) * radius;
      sunRef.current.position.y = Math.sin(time) * radius;
    }
  });

  return (
    <>
      {/* Sun */}
      <Sphere ref={sunRef} args={[5, 32, 32]} position={[50, 30, -50]}>
        <meshBasicMaterial color="#FDB813" />
      </Sphere>

      {/* Clouds */}
      {[...Array(15)].map((_, index) => (
        <Cloud
          key={index}
          position={[
            (Math.random() - 0.5) * 100,
            20 + Math.random() * 10, // Lowered the y-position
            (Math.random() - 0.5) * 100,
          ]}
          scale={2 + Math.random() * 2} // Increased the scale
        />
      ))}
    </>
  );
};