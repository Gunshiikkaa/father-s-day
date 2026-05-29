"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom component to handle mouse parallax and camera movement
function SceneController() {
  const { camera, pointer } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state) => {
    // Parallax effect based on mouse movement
    targetCameraPos.current.x = THREE.MathUtils.lerp(targetCameraPos.current.x, pointer.x * 2.5, 0.05);
    targetCameraPos.current.y = THREE.MathUtils.lerp(targetCameraPos.current.y, pointer.y * 2.5 + 0.5, 0.05);
    camera.position.copy(targetCameraPos.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Procedural Vintage Camera Model
function VintageCamera(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.5) * 0.4;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.3) * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.cos(t * 0.25) * 0.1;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.5}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[2, 1.2, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.9} />
      </mesh>
      {/* Metallic top plate */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.2} metalness={0.95} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Lens Ring */}
      <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.05, 32]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Shutter Button */}
      <mesh position={[-0.6, 0.72, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Procedural Coffee Mug
function CoffeeMug(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.6) * 0.35;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.4) * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    meshRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.45}>
      {/* Mug Body */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 1.4, 32]} />
        <meshStandardMaterial color="#f5c44f" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.12, 16, 32]} />
        <meshStandardMaterial color="#b8860b" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Procedural Trophy
function GoldTrophy(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.4) * 0.5;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.5) * 0.25;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.4}>
      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.4, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.8, 16]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Bowl */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.8, 0.4, 1.0, 32]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.35, 0.08, 8, 24]} />
        <meshStandardMaterial color="#ffe58f" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.35, 0.08, 8, 24]} />
        <meshStandardMaterial color="#ffe58f" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Procedural Watch
function WristWatch(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.45) * 0.4;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.35) * 0.3;
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.5}>
      {/* Clock body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Clock Face */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Straps */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Procedural Necktie
function Necktie(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.35) * 0.45;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.45) * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.2;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.5}>
      {/* Knot */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.25, 0.35, 4]} />
        <meshStandardMaterial color="#b8860b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Tie Body */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.3, 1.4, 0.05]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Tie Tip */}
      <mesh position={[0, -1.0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.21, 0.21, 0.05]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Procedural Toolbox
function Toolbox(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.52) * 0.38;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.42) * 0.25;
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.15;
    meshRef.current.rotation.y = t * 0.14;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={0.4}>
      {/* Box base */}
      <mesh>
        <boxGeometry args={[1.6, 1.0, 0.8]} />
        <meshStandardMaterial color="#8b0000" roughness={0.5} metalness={0.2} /> {/* Dark red */}
      </mesh>
      {/* Lid details */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.64, 0.1, 0.84]} />
        <meshStandardMaterial color="#a9a9a9" roughness={0.3} metalness={0.8} /> {/* Metal rim */}
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[0.25, 0.06, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#e5b25d" roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  );
}

// Floating Polaroid / Picture Frame
function PolaroidFrame(props: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + props.seed;
    meshRef.current.position.y = props.posY + Math.sin(t * 0.48) * 0.4;
    meshRef.current.position.x = props.posX + Math.cos(t * 0.38) * 0.3;
    meshRef.current.rotation.y = t * 0.06;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={meshRef} position={[props.posX, props.posY, props.posZ]} scale={props.scale || 0.65}>
      {/* Frame border */}
      <mesh>
        <boxGeometry args={[2.0, 2.4, 0.08]} />
        <meshStandardMaterial color="#fcfcfc" roughness={0.4} />
      </mesh>
      {/* Photo area */}
      <mesh position={[0, 0.15, 0.05]}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.9} />
      </mesh>
      {/* Outer border glow outline */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.05, 2.45, 0.02]} />
        <meshBasicMaterial color="#e5b25d" wireframe />
      </mesh>
    </group>
  );
}

// Floating stars / particle sparks in background
function SparkParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16;
    positions[i + 1] = (Math.random() - 0.5) * 16;
    positions[i + 2] = (Math.random() - 0.5) * 10 - 2;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = t * 0.005;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffe58f"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function MemoryCanvas() {
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // Check WebGL compatibility
    try {
      const canvas = document.createElement("canvas");
      const support = !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      setWebGlSupported(support);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  if (!webGlSupported) {
    // Elegant CSS-based fallback if WebGL fails
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-amber-500/10 blur-xl animate-pulse" />
        <div className="absolute top-[60%] right-[15%] w-32 h-32 rounded-full bg-amber-600/10 blur-xl animate-pulse" />
        <div className="absolute bottom-[10%] left-[40%] w-40 h-40 rounded-full bg-amber-400/5 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 6, 12]} />
        
        {/* Lights */}
        <ambientLight intensity={0.4} color="#ffe58f" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffe58f" />
        <pointLight position={[-4, -4, 2]} intensity={0.8} color="#ff8c00" />
        <spotLight position={[0, 10, 0]} intensity={2.0} distance={15} angle={Math.PI / 4} penumbra={1} color="#f5c44f" />

        {/* 3D Floating Objects */}
        <VintageCamera posX={-2.8} posY={1.8} posZ={0} seed={1.2} />
        <GoldTrophy posX={2.6} posY={2.2} posZ={-1} seed={3.4} />
        <WristWatch posX={-3.2} posY={-1.5} posZ={1} seed={5.6} />
        <CoffeeMug posX={3.0} posY={-1.8} posZ={0.5} seed={7.8} />
        <Necktie posX={-1.0} posY={3.0} posZ={-2} seed={9.0} />
        <Toolbox posX={1.2} posY={-3.2} posZ={-1.5} seed={11.2} />
        <PolaroidFrame posX={-3.8} posY={0.2} posZ={-2.5} scale={0.5} seed={13.4} />
        <PolaroidFrame posX={3.8} posY={0.2} posZ={-2} scale={0.55} seed={15.6} />

        {/* Dynamic Sparks */}
        <SparkParticles />
        
        {/* Camera Parallax Controller */}
        <SceneController />
      </Canvas>
    </div>
  );
}
