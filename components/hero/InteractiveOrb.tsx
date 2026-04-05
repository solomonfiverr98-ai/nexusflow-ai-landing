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
  isMobile 
}: { 
  color: string; 
  distort: number; 
  speed: number; 
  scale: number; 
  opacity: number;
  isMobile: boolean;
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
      <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={1}
        transparent
        opacity={opacity}
        roughness={0}
        metalness={1}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
};

const OrbitingParticles = ({ count = 40, isMobile }: { count?: number; isMobile: boolean }) => {
  const particlesRef = useRef<THREE.Group>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      const speed = 0.5 + Math.random() * 1.5;
      const size = 0.02 + Math.random() * 0.04;
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
        const currentAngle = p.angle + time * p.speed * 0.2;
        
        child.position.x = Math.cos(currentAngle) * p.radius;
        child.position.z = Math.sin(currentAngle) * p.radius;
        child.position.y = Math.sin(time * 0.5 + p.phase) * 0.5;
        
        // Pulse size
        const s = p.size * (1 + Math.sin(time * 2 + p.phase) * 0.5);
        child.scale.set(s, s, s);
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
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
    const timer = setTimeout(() => setAwake(true), 500);
    
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
        duration: 2,
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-blue/20 rounded-full blur-[100px] md:blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-brand-purple/20 rounded-full blur-[60px] md:blur-[80px]" />
      </div>

      <div className="orb-reveal opacity-0 scale-90 w-full h-full max-w-[500px] max-h-[500px]">
        {isMobile ? (
          /* High-Fidelity CSS Mobile Glow */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Inner Core */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue-bright to-brand-purple shadow-glow-blue animate-pulse-slow relative">
                {/* Surface Reflection */}
                <div className="absolute inset-2 rounded-full bg-white/10 blur-[2px]" />
                {/* Secondary Pulse */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
            </div>
            
            {/* Nebula Halo */}
            <div className="absolute w-48 h-48 rounded-full bg-brand-blue/30 blur-3xl mix-blend-screen animate-pulse" />
          </div>
        ) : (
          /* Desktop Three.js Siri-style Canvas */
          <Canvas gl={{ antialias: true, alpha: true }}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#0EA5E9" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <group>
                <SiriLayer 
                  color="#0EA5E9" 
                  distort={0.4} 
                  speed={1.5} 
                  scale={1.5} 
                  opacity={0.4} 
                  isMobile={false}
                />
                <SiriLayer 
                  color="#8B5CF6" 
                  distort={0.5} 
                  speed={2} 
                  scale={1.4} 
                  opacity={0.3} 
                  isMobile={false}
                />
                <SiriLayer 
                  color="#06B6D4" 
                  distort={0.3} 
                  speed={1} 
                  scale={1.6} 
                  opacity={0.2} 
                  isMobile={false}
                />
                <OrbitingParticles count={40} isMobile={false} />
              </group>
            </Float>

            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        )}
      </div>
    </div>
  );
}

