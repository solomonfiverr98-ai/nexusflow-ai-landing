"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SiriLayer = ({ 
  color, 
  distort, 
  speed, 
  scale, 
  opacity,
}: { 
  color: string; 
  distort: number; 
  speed: number; 
  scale: number; 
  opacity: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * (speed * 0.1);
      meshRef.current.rotation.y = time * (speed * 0.15);
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 128, 128]} />
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={1}
        transparent
        opacity={opacity}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={1.5}
      />
    </mesh>
  );
};

const OrbitingParticles = ({ count = 60 }: { count?: number }) => {
  const particlesRef = useRef<THREE.Group>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 1.5;
      const speed = 0.4 + Math.random() * 1.2;
      const size = 0.015 + Math.random() * 0.035;
      const phase = Math.random() * Math.PI * 2;
      
      temp.push({ angle, radius, speed, size, phase });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const p = particles[i];
        const currentAngle = p.angle + time * p.speed * 0.15;
        
        child.position.x = Math.cos(currentAngle) * p.radius;
        child.position.z = Math.sin(currentAngle) * p.radius;
        child.position.y = Math.sin(time * 0.4 + p.phase) * 0.8;
        
        // Pulse size
        const s = p.size * (1 + Math.sin(time * 1.5 + p.phase) * 0.4);
        child.scale.set(s, s, s);
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export default function InteractiveOrb() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // "Awake" animation delay
    const timer = setTimeout(() => setAwake(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(() => {
    if (awake) {
      gsap.to(".orb-reveal", {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "power4.out"
      });
    }
  }, [awake]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center p-4"
    >
      {/* Background Glows (Shared) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-brand-blue/15 rounded-full blur-[100px] md:blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-brand-purple/15 rounded-full blur-[70px] md:blur-[100px]" />
      </div>

      <div className="orb-reveal opacity-0 scale-90 w-full h-full max-w-[600px] max-h-[600px] flex items-center justify-center">
        {isMobile ? (
          /* High-Fidelity CSS Mobile Glow - Optimized for Performance */
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Inner Core */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-blue-bright via-brand-purple to-brand-blue-bright/50 shadow-glow-blue animate-pulse-slow relative">
                {/* Surface Reflection */}
                <div className="absolute inset-4 rounded-full bg-white/5 blur-[4px]" />
                {/* Secondary Pulse */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping-slow opacity-10" />
            </div>
            
            {/* Nebula Halo */}
            <div className="absolute inset-[-40px] rounded-full bg-brand-blue/20 blur-3xl mix-blend-screen animate-pulse" />
          </div>
        ) : (
          /* Desktop Three.js Siri-style Canvas - Cinematic Fidelity */
          <div className="w-full h-full cursor-pointer group">
            <Canvas gl={{ antialias: true, alpha: true }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#0EA5E9" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />
              
              <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
                <group scale={1.8}>
                  {/* Layer 1: Core */}
                  <SiriLayer 
                    color="#0EA5E9" 
                    distort={0.4} 
                    speed={1.5} 
                    scale={1} 
                    opacity={0.6} 
                  />
                  {/* Layer 2: Middle Glow */}
                  <SiriLayer 
                    color="#8B5CF6" 
                    distort={0.5} 
                    speed={2} 
                    scale={1.2} 
                    opacity={0.4} 
                  />
                  {/* Layer 3: Outer Aura */}
                  <SiriLayer 
                    color="#06B6D4" 
                    distort={0.3} 
                    speed={1} 
                    scale={1.4} 
                    opacity={0.2} 
                  />
                  {/* Atmospheric Dust */}
                  <OrbitingParticles count={80} />
                </group>
              </Float>

              <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1.5} />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
}

