import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Globe, Compass, ArrowUpRight } from 'lucide-react';

interface HeroGlobe3DProps {
  onOpenApplication?: () => void;
}

export const HeroGlobe3D: React.FC<HeroGlobe3DProps> = ({ onOpenApplication }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 4, 26);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xF59E0B, 2.5, 50);
    pointLight.position.set(12, 16, 16);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x3B82F6, 2, 50);
    blueLight.position.set(-15, -10, -10);
    scene.add(blueLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 8.8;

    // Procedural globe texture
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 2048;
    texCanvas.height = 1024;
    const ctx = texCanvas.getContext('2d')!;

    // Dark sleek ocean
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#040914');
    grad.addColorStop(0.5, '#091529');
    grad.addColorStop(1, '#030712');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle meridian grid
    ctx.strokeStyle = 'rgba(217, 155, 38, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Draw stylized continents as dots
    for (let x = 0; x < 2048; x += 18) {
      for (let y = 0; y < 1024; y += 18) {
        const inAfrica = Math.hypot((x - 1040) / 1.3, (y - 520) / 1.5) < 140;
        const inIndia = Math.hypot((x - 1460) / 1.1, (y - 410) / 1.3) < 95;
        const inEurope = Math.hypot((x - 1080) / 1.4, (y - 280) / 0.9) < 85;
        const inAmericas = Math.hypot((x - 500) / 1.8, (y - 480) / 2.2) < 170;
        const inAsia = Math.hypot((x - 1600) / 2.0, (y - 320) / 1.2) < 160;

        if (inAfrica || inIndia || inEurope || inAmericas || inAsia) {
          ctx.fillStyle = inAfrica 
            ? 'rgba(217, 155, 38, 0.85)' // Golden Amber for Africa
            : inIndia 
              ? 'rgba(56, 189, 248, 0.95)' // Sky Blue for India
              : 'rgba(148, 163, 184, 0.35)'; // Slate for rest
          ctx.beginPath();
          ctx.arc(x, y, inAfrica || inIndia ? 2.8 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const globeTex = new THREE.CanvasTexture(texCanvas);
    const globeGeo = new THREE.SphereGeometry(RADIUS, 48, 48);
    const globeMat = new THREE.MeshStandardMaterial({
      map: globeTex,
      roughness: 0.5,
      metalness: 0.2
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Outer Halo Atmosphere
    const haloGeo = new THREE.SphereGeometry(RADIUS * 1.12, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xD99B26,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Orbital Ring
    const ringGeo = new THREE.RingGeometry(RADIUS * 1.25, RADIUS * 1.27, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD99B26,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    globeGroup.add(ring);

    // Convert lat/lng to sphere coordinate
    const toVector = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Route: Monrovia (Africa) -> India
    const pOrigin = toVector(6.3005, -10.7969, RADIUS);
    const pDest = toVector(28.6139, 77.2090, RADIUS);
    const pSouthIndia = toVector(13.0827, 80.2707, RADIUS);

    // Add Pins
    const makePin = (pos: THREE.Vector3, colorHex: number, label: string) => {
      const pinMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const pinSphere = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), pinMat);
      pinSphere.position.copy(pos);
      globeGroup.add(pinSphere);

      const beacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8),
        new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8 })
      );
      beacon.position.copy(pos.clone().multiplyScalar(1.08));
      beacon.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      globeGroup.add(beacon);
    };

    makePin(pOrigin, 0xF59E0B, 'Africa Desk');
    makePin(pDest, 0x38BDF8, 'India Admissions');
    makePin(pSouthIndia, 0x38BDF8, 'India Support');

    // Create 3D Flight Arcs
    const createArc = (p1: THREE.Vector3, p2: THREE.Vector3, elevation = 1.35) => {
      const dist = p1.distanceTo(p2);
      const mid = p1.clone().lerp(p2, 0.5);
      mid.normalize().multiplyScalar(RADIUS * elevation);
      const c1 = p1.clone().lerp(mid, 0.5).normalize().multiplyScalar(RADIUS * (1 + (elevation - 1) * 0.7));
      const c2 = p2.clone().lerp(mid, 0.5).normalize().multiplyScalar(RADIUS * (1 + (elevation - 1) * 0.7));
      return new THREE.CubicBezierCurve3(p1, c1, c2, p2);
    };

    const curve1 = createArc(pOrigin, pDest, 1.42);
    const curve2 = createArc(pOrigin, pSouthIndia, 1.38);

    const arcLines: THREE.Line[] = [];
    const photons: { mesh: THREE.Mesh; curve: THREE.CubicBezierCurve3; progress: number; speed: number }[] = [];

    [curve1, curve2].forEach((curve, idx) => {
      const pts = curve.getPoints(50);
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(
        geom,
        new THREE.LineBasicMaterial({
          color: idx === 0 ? 0xD99B26 : 0x38BDF8,
          transparent: true,
          opacity: 0.75,
          linewidth: 2
        })
      );
      globeGroup.add(line);
      arcLines.push(line);

      // Light particle
      const pMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), pMat);
      globeGroup.add(pMesh);
      photons.push({
        mesh: pMesh,
        curve,
        progress: idx * 0.5,
        speed: 0.005
      });
    });

    // Initial position: Focused right at the Africa -> India pathway
    globeGroup.rotation.y = -1.65;
    globeGroup.rotation.x = 0.22;

    let targetRotY = -1.65;
    let targetRotX = 0.22;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.005;
        targetRotX += dy * 0.005;
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onUp = () => {
      isDragging = false;
    };

    const dom = canvasRef.current;
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotY += 0.0012; // Gentle orbit
      }

      globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.06;
      ring.rotation.z += 0.002;

      photons.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pt = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="hero-3d-globe-container"
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-grab active:cursor-grabbing focus:outline-none"
        title="Interactive 3D Pathway Globe: Africa to India Higher Education Corridor"
      />

      {/* Floating Information Tags (as requested by user) */}
      
      {/* Tag 1: University Guidance */}
      <div 
        id="tag-university-guidance"
        className="absolute top-8 left-4 sm:left-8 px-4 py-2.5 rounded-2xl bg-[#0B1528]/85 backdrop-blur-md border border-amber-500/30 text-white shadow-xl flex items-center gap-2.5 animate-bounce"
        style={{ animationDuration: '4s' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
        <div>
          <p className="text-xs font-bold tracking-wide text-white">University Guidance</p>
          <p className="text-[10px] text-slate-400 font-medium">UGC & NAAC Verified</p>
        </div>
      </div>

      {/* Tag 2: Application Support */}
      <div 
        id="tag-application-support"
        className="absolute bottom-16 left-4 sm:left-12 px-4 py-2.5 rounded-2xl bg-[#0B1528]/85 backdrop-blur-md border border-sky-500/30 text-white shadow-xl flex items-center gap-2.5"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
        <div>
          <p className="text-xs font-bold tracking-wide text-white">Application Support</p>
          <p className="text-[10px] text-slate-400 font-medium">Direct Admissions Liaison</p>
        </div>
      </div>

      {/* Tag 3: Student Assistance */}
      <div 
        id="tag-student-assistance"
        className="absolute top-20 right-4 sm:right-8 px-4 py-2.5 rounded-2xl bg-[#0B1528]/85 backdrop-blur-md border border-emerald-500/30 text-white shadow-xl flex items-center gap-2.5"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
        <div>
          <p className="text-xs font-bold tracking-wide text-white">Student Assistance</p>
          <p className="text-[10px] text-slate-400 font-medium">Arrival & On-Ground Care</p>
        </div>
      </div>

      {/* Bottom Hint Indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xs border border-white/10 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-amber-400" />
        <span>Africa ➔ India Corridor</span>
      </div>
    </div>
  );
};
