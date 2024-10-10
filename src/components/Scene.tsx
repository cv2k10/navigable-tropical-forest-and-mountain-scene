import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';
import { Sky } from '@react-three/drei';
import { Terrain } from './Terrain';
import { Trees } from './Trees';
import { Rocks } from './Rocks';
import { SunAndClouds } from './SunAndClouds';

const Scene: React.FC = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const skyRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.1;
    const dayDuration = Math.PI;

    if (directionalLightRef.current && ambientLightRef.current && skyRef.current) {
      // Update directional light position
      directionalLightRef.current.position.x = Math.cos(time) * 80;
      directionalLightRef.current.position.y = Math.sin(time) * 80;

      // Update light intensities
      const sunIntensity = Math.max(0, Math.sin(time));
      directionalLightRef.current.intensity = sunIntensity * 1.5;
      ambientLightRef.current.intensity = 0.2 + sunIntensity * 0.3;

      // Update sky
      skyRef.current.material.uniforms.sunPosition.value.set(
        Math.cos(time) * 80,
        Math.sin(time) * 80,
        0
      );

      // Update background color
      const bgColor = new Color().setHSL(0.6, 1, 0.1 + sunIntensity * 0.5);
      skyRef.current.material.uniforms.rayleigh.value = 1 + sunIntensity;
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.5} />
      <directionalLight ref={directionalLightRef} position={[50, 30, -50]} intensity={1.5} castShadow />
      <Sky ref={skyRef} distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <Terrain />
      <Trees count={500} />
      <Rocks count={100} />
      <SunAndClouds />
    </>
  );
};

export default Scene;