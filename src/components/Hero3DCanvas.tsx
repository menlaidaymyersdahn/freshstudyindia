import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xef4444, 3, 40);
    redLight.position.set(-10, 10, 10);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 40);
    blueLight.position.set(12, -8, 10);
    scene.add(blueLight);

    // 3. Floating 3D Geometric Objects Group
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Holographic Icosahedron (Global Education Crystal)
    const icoGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const icoWireMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoWireMat);
    icoMesh.position.set(9, 2, -2);
    floatingGroup.add(icoMesh);

    // Inner Glowing Core
    const innerIcoGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const innerIcoMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      emissive: 0xd97706,
      emissiveIntensity: 0.3
    });
    const innerIco = new THREE.Mesh(innerIcoGeo, innerIcoMat);
    innerIco.position.copy(icoMesh.position);
    floatingGroup.add(innerIco);

    // Floating 3D Orbital Rings around crystal
    const torusGeo = new THREE.TorusGeometry(6, 0.08, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.5
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.copy(icoMesh.position);
    torusMesh.rotation.x = Math.PI / 3;
    floatingGroup.add(torusMesh);

    const torusGeo2 = new THREE.TorusGeometry(7.2, 0.06, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.35
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.position.copy(icoMesh.position);
    torusMesh2.rotation.y = Math.PI / 4;
    floatingGroup.add(torusMesh2);

    // Left floating micro octahedrons
    const miniOctaGeo = new THREE.OctahedronGeometry(1.2, 0);
    const miniOctaMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const miniOcta1 = new THREE.Mesh(miniOctaGeo, miniOctaMat);
    miniOcta1.position.set(-11, -4, 2);
    floatingGroup.add(miniOcta1);

    const miniOcta2 = new THREE.Mesh(miniOctaGeo, miniOctaMat);
    miniOcta2.position.set(-7, 7, -4);
    miniOcta2.scale.setScalar(0.7);
    floatingGroup.add(miniOcta2);

    // 4. Particle Constellation Network
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.012
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.45,
      transparent: true,
      opacity: 0.75
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0012;
      mouseY = (e.clientY - windowHalfY) * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 8;
      camera.lookAt(0, 0, 0);

      // Rotate 3D floating crystal elements
      icoMesh.rotation.x = elapsedTime * 0.2;
      icoMesh.rotation.y = elapsedTime * 0.25;

      innerIco.rotation.x = -elapsedTime * 0.4;
      innerIco.rotation.y = -elapsedTime * 0.3;

      torusMesh.rotation.z = elapsedTime * 0.3;
      torusMesh2.rotation.x = elapsedTime * 0.25;

      miniOcta1.rotation.x = elapsedTime * 0.4;
      miniOcta1.rotation.y = elapsedTime * 0.3;
      miniOcta1.position.y = -4 + Math.sin(elapsedTime * 1.5) * 0.5;

      miniOcta2.rotation.x = -elapsedTime * 0.3;
      miniOcta2.position.y = 7 + Math.cos(elapsedTime * 1.2) * 0.4;

      // Particle floating drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleSpeeds[i].x;
        positions[i3 + 1] += particleSpeeds[i].y;
        positions[i3 + 2] += particleSpeeds[i].z;

        // Wrap around bounds
        if (positions[i3] > 18) positions[i3] = -18;
        if (positions[i3] < -18) positions[i3] = 18;
        if (positions[i3 + 1] > 12) positions[i3 + 1] = -12;
        if (positions[i3 + 1] < -12) positions[i3 + 1] = 12;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize listener
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    const container = mountRef.current;
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85" 
      aria-hidden="true"
    />
  );
};
