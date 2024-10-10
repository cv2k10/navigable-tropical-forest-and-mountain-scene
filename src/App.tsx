import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Text } from '@react-three/drei';
import Scene from './components/Scene';

function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      controls.maxPolarAngle = Math.PI / 2.1; // Allow looking down a bit more
      controls.minPolarAngle = Math.PI / 2.8; // Restrict looking up too much
      controls.maxAzimuthAngle = Math.PI / 2; // Limit horizontal rotation
      controls.minAzimuthAngle = -Math.PI / 2; // Limit horizontal rotation
      controls.maxDistance = 80; // Limit maximum zoom out
      controls.minDistance = 20; // Allow closer zooming
      controls.target.set(0, 0, 0); // Set the focus point
      camera.position.set(0, 40, 60); // Adjust initial camera position
      camera.lookAt(0, 0, 0);
      controls.update();
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false} // Disable panning
      enableZoom={true} // Ensure zooming is enabled
      zoomSpeed={0.5} // Adjust zoom speed
    />
  );
}

function App() {
  return (
    <div className="w-full h-screen bg-gray-800">
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
        <color attach="background" args={['#87CEEB']} />
        <Suspense fallback={<Text position={[0, 0, 0]} color="white">Loading...</Text>}>
          <Scene />
          <Sky sunPosition={[50, 30, -50]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[50, 30, -50]} intensity={1.5} />
          <CameraController />
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 text-white p-4">
        Use mouse wheel or pinch gesture to zoom in/out of the forest.
      </div>
    </div>
  );
}

export default App;