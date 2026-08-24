import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, Plane, Sparkles, Navigation, RotateCw, ZoomIn, ZoomOut, Compass, Info } from 'lucide-react';

interface CityNode {
  name: string;
  country: string;
  lat: number;
  lng: number;
  type: 'origin' | 'destination';
  description: string;
  badge: string;
  color: string;
}

const NODES: CityNode[] = [
  {
    name: 'Monrovia',
    country: 'Liberia 🇱🇷',
    lat: 6.3005,
    lng: -10.7969,
    type: 'origin',
    description: 'Myers Global Pathway West Africa Hub & In-Person Document Verification Desk',
    badge: 'Regional Desk',
    color: '#EF4444' // Red
  },
  {
    name: 'Accra',
    country: 'Ghana 🇬🇭',
    lat: 5.6037,
    lng: -0.1870,
    type: 'origin',
    description: 'Admissions & WAEC/WASSCE Direct Verification Center',
    badge: 'West Africa',
    color: '#F59E0B'
  },
  {
    name: 'Lagos',
    country: 'Nigeria 🇳🇬',
    lat: 6.5244,
    lng: 3.3792,
    type: 'origin',
    description: 'Student Counseling & Visa Advisory Office',
    badge: 'West Africa',
    color: '#10B981'
  },
  {
    name: 'Freetown',
    country: 'Sierra Leone 🇸🇱',
    lat: 8.484,
    lng: -13.2299,
    type: 'origin',
    description: 'WASSCE Credential Screening & Application Desk',
    badge: 'West Africa',
    color: '#06B6D4'
  },
  {
    name: 'Nairobi',
    country: 'Kenya 🇰🇪',
    lat: -1.2921,
    lng: 36.8219,
    type: 'origin',
    description: 'East Africa Student Advisory & Pre-Departure Desk',
    badge: 'East Africa',
    color: '#8B5CF6'
  },
  {
    name: 'India Admissions Desk',
    country: 'India 🇮🇳',
    lat: 28.6139,
    lng: 77.2090,
    type: 'destination',
    description: 'Accredited Higher Education Admissions, Bonafide Letters & Embassy Visa Documentation Hub',
    badge: 'Admissions Hub',
    color: '#3B82F6' // Blue
  },
  {
    name: 'Student Arrival & Reception Center',
    country: 'India 🇮🇳',
    lat: 13.0827,
    lng: 80.2707,
    type: 'destination',
    description: 'Airport Meet & Greet, Campus Transfer, Hostel Check-In & FRRO Police Clearance Support',
    badge: 'Arrival & Support',
    color: '#2563EB'
  }
];

// Flight Routes connecting Origins to Indian Destination Hubs
const FLIGHT_ROUTES = [
  { from: 'Monrovia', to: 'India Admissions Desk' },
  { from: 'Monrovia', to: 'Student Arrival & Reception Center' },
  { from: 'Accra', to: 'India Admissions Desk' },
  { from: 'Accra', to: 'Student Arrival & Reception Center' },
  { from: 'Lagos', to: 'India Admissions Desk' },
  { from: 'Lagos', to: 'Student Arrival & Reception Center' },
  { from: 'Freetown', to: 'India Admissions Desk' },
  { from: 'Nairobi', to: 'India Admissions Desk' }
];

// Helper: convert Lat/Lng to 3D Sphere Vector3
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Helper: create a smooth 3D curved trajectory arc between two points on sphere
function createCurvedFlightArc(p1: THREE.Vector3, p2: THREE.Vector3, maxElevation = 1.35) {
  const distance = p1.distanceTo(p2);
  const mid = p1.clone().lerp(p2, 0.5);
  const midLength = mid.length();
  
  // Elevate mid-point higher based on distance
  const elevation = 1 + (distance * 0.22 * (maxElevation - 1));
  mid.normalize().multiplyScalar(midLength * elevation);

  // Bezier curve with 4 control points for elegant aerodynamic arc
  const c1 = p1.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength * (1 + (elevation - 1) * 0.7));
  const c2 = p2.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength * (1 + (elevation - 1) * 0.7));

  return new THREE.CubicBezierCurve3(p1, c1, c2, p2);
}

export const ThreePathwayGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<CityNode | null>(NODES[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeView, setActiveView] = useState<'all' | 'liberia' | 'india'>('all');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 32);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(20, 25, 20);
    scene.add(mainLight);

    const blueBacklight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    blueBacklight.position.set(-20, -10, -20);
    scene.add(blueBacklight);

    const redAccentLight = new THREE.PointLight(0xef4444, 2, 50);
    redAccentLight.position.set(-15, 10, 15);
    scene.add(redAccentLight);

    // 3. Globe Master Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 10;

    // Generate procedural high-tech canvas texture for the Earth
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = 2048;
    mapCanvas.height = 1024;
    const ctx = mapCanvas.getContext('2d')!;

    // Deep Ocean Background
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#060f1e');
    oceanGrad.addColorStop(0.5, '#0b1b36');
    oceanGrad.addColorStop(1, '#050b14');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle latitude / longitude grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Draw continent dot matrix & landmass silhouettes
    ctx.fillStyle = '#1e3a8a';
    // Africa approximation region
    ctx.beginPath();
    ctx.ellipse(1040, 520, 180, 220, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
    ctx.fill();

    // India / South Asia approximation region
    ctx.beginPath();
    ctx.ellipse(1450, 420, 110, 140, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fill();

    // Dot grid network across globe
    for (let x = 0; x < 2048; x += 16) {
      for (let y = 0; y < 1024; y += 16) {
        // Pseudo land detection
        const inAfrica = Math.hypot((x - 1040) / 1.3, (y - 520) / 1.5) < 130;
        const inIndia = Math.hypot((x - 1460) / 1.1, (y - 410) / 1.3) < 90;
        const inEurope = Math.hypot((x - 1080) / 1.4, (y - 280) / 0.9) < 80;
        const inAmericas = Math.hypot((x - 500) / 1.8, (y - 480) / 2.2) < 180;
        const inAsia = Math.hypot((x - 1600) / 2.0, (y - 320) / 1.2) < 170;

        if (inAfrica || inIndia || inEurope || inAmericas || inAsia) {
          ctx.fillStyle = inAfrica 
            ? 'rgba(239, 68, 68, 0.65)' 
            : inIndia 
              ? 'rgba(59, 130, 246, 0.75)' 
              : 'rgba(96, 165, 250, 0.35)';
          ctx.beginPath();
          ctx.arc(x, y, inAfrica || inIndia ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const earthTexture = new THREE.CanvasTexture(mapCanvas);

    // Globe Sphere Mesh
    const sphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.4,
      metalness: 0.3,
      bumpScale: 0.05
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeMesh);

    // 4. Glowing Atmospheric Outer Halo
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        glowColor: { value: new THREE.Color(0x3b82f6) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.65 - dot(vNormal, vNormel), 2.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity * 1.6;
          gl_FragColor = vec4(glow, intensity * 0.75);
        }
      `
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 5. Equatorial Holographic Orbital Rings
    const ringGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.25, GLOBE_RADIUS * 1.28, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.3;
    globeGroup.add(orbitalRing);

    // Second inclined dashed orbital ring
    const ringGeo2 = new THREE.RingGeometry(GLOBE_RADIUS * 1.35, GLOBE_RADIUS * 1.36, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.x = -Math.PI / 3;
    orbitalRing2.rotation.y = Math.PI / 6;
    globeGroup.add(orbitalRing2);

    // 6. Starfield Particle Background
    const starCount = 400;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      const isBlue = Math.random() > 0.4;
      starColors[i] = isBlue ? 0.4 : 1.0;
      starColors[i + 1] = isBlue ? 0.7 : 0.4;
      starColors[i + 2] = isBlue ? 1.0 : 0.4;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. Node Pins & Flight Trajectory Arcs
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const nodePositionsMap = new Map<string, THREE.Vector3>();

    // Add city pins
    NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS);
      nodePositionsMap.set(node.name, pos);

      // Pin base sphere
      const pinColor = new THREE.Color(node.color);
      const pinSphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const pinSphereMat = new THREE.MeshBasicMaterial({ color: pinColor });
      const pinMesh = new THREE.Mesh(pinSphereGeo, pinSphereMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { nodeData: node };
      pinGroup.add(pinMesh);

      // Pulsing outer ripple ring around pin
      const ringGeom = new THREE.RingGeometry(0.4, 0.7, 24);
      const ringMater = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMater);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.02));
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      pinGroup.add(ringMesh);

      // Vertical beacon ray
      const rayGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8);
      const rayMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        transparent: true,
        opacity: 0.6
      });
      const rayMesh = new THREE.Mesh(rayGeo, rayMat);
      rayMesh.position.copy(pos.clone().multiplyScalar(1.07));
      rayMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      pinGroup.add(rayMesh);
    });

    // Create 3D Flight Arcs with animated photons
    const arcCurves: THREE.CubicBezierCurve3[] = [];
    const photonMeshes: THREE.Mesh[] = [];

    FLIGHT_ROUTES.forEach((route) => {
      const fromPos = nodePositionsMap.get(route.from);
      const toPos = nodePositionsMap.get(route.to);

      if (fromPos && toPos) {
        const curve = createCurvedFlightArc(fromPos, toPos, 1.45);
        arcCurves.push(curve);

        const points = curve.getPoints(60);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

        // Gradient tube / line
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.7,
          linewidth: 2
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arcLine);

        // Animated traveling light pulse (photon) along flight arc
        const photonGeo = new THREE.SphereGeometry(0.22, 12, 12);
        const photonMat = new THREE.MeshBasicMaterial({
          color: 0xffffff
        });
        const photon = new THREE.Mesh(photonGeo, photonMat);
        photon.userData = {
          curve,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.003
        };
        globeGroup.add(photon);
        photonMeshes.push(photon);
      }
    });

    // 8. Mouse Drag Orbit Controls (Custom silky smooth inertia)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = -1.8;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        rotationVelocityY = deltaX * 0.004;
        rotationVelocityX = deltaY * 0.004;

        targetRotationY += rotationVelocityY;
        targetRotationX += rotationVelocityX;

        // Clamp X tilt so it doesn't flip
        targetRotationX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domCanvas = canvasRef.current;
    domCanvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Initial position focused on Africa -> India trajectory
    globeGroup.rotation.y = -1.6;
    globeGroup.rotation.x = 0.25;

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when not dragging
      if (autoRotate && !isDragging) {
        targetRotationY += 0.0018;
      }

      // Smooth damping interpolation
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

      // Animate orbital rings slow counter-rotations
      orbitalRing.rotation.z += 0.003;
      orbitalRing2.rotation.z -= 0.002;

      // Starfield subtle breathing rotation
      starField.rotation.y = elapsedTime * 0.01;

      // Animate flight arc photons along Bezier curves
      photonMeshes.forEach((photon) => {
        photon.userData.progress += photon.userData.speed;
        if (photon.userData.progress > 1) {
          photon.userData.progress = 0;
        }
        const currentPoint = photon.userData.curve.getPoint(photon.userData.progress);
        photon.position.copy(currentPoint);
      });

      // Update atmosphere view vector
      if (atmosphereMat.uniforms) {
        atmosphereMat.uniforms.viewVector.value = camera.position;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domCanvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-950 via-[#071328] to-slate-950 border border-slate-800/80 shadow-2xl overflow-hidden text-white flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px]">
      {/* 3D Canvas Viewport */}
      <div 
        ref={containerRef} 
        className="relative flex-1 min-h-[380px] lg:min-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* 3D HUD Overlay: Top Left Badge */}
        <div className="absolute top-5 left-5 z-10 pointer-events-none flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-xs font-bold text-sky-400 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
            <span>Interactive 3D Pathway Globe</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono pl-1">
            Drag to orbit 360° • Real-time Africa ➔ India routes
          </p>
        </div>

        {/* 3D Controls overlay: Bottom Floating Bar */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Active Flight Arcs Count */}
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-lg">
            <Plane className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="font-bold text-white">8 Direct Student Corridors</span>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 backdrop-blur-md border cursor-pointer ${
                autoRotate
                  ? 'bg-blue-600/90 text-white border-blue-400/50 shadow-md shadow-blue-500/30'
                  : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800'
              }`}
              title="Toggle auto orbit"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="text-[11px] hidden sm:inline">{autoRotate ? 'Auto-Orbit ON' : 'Paused'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right / Sidebar: Interactive Pathway Corridor Navigator */}
      <div className="w-full lg:w-96 p-6 lg:p-8 bg-slate-900/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col justify-between z-10">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-rose-400 mb-2">
            <Compass className="w-4 h-4 text-rose-500" />
            <span>Global Corridor Navigator</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            Bridging Africa to India's Premier Campuses
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Myers Global Pathway manages the complete verified student journey from initial high school credential assessment in West Africa to university bonafide issuance and Delhi/Bengaluru campus check-in.
          </p>

          {/* Selectable Hub Nodes */}
          <div className="mt-6 space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Select City Hub Node
            </p>
            {NODES.map((node) => {
              const isSelected = selectedNode?.name === node.name;
              return (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-900/60 to-slate-900 border-blue-500 shadow-md shadow-blue-500/20 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: node.color }}
                    />
                    <div className="truncate">
                      <p className="text-xs font-extrabold text-white truncate">{node.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{node.country}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase shrink-0 ${
                    node.type === 'origin' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {node.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Node Details Card */}
          {selectedNode && (
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950/40 border border-white/10 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{selectedNode.country}</span>
                  <span className="text-slate-400">•</span>
                  <span>{selectedNode.name}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {selectedNode.type === 'origin' ? 'Departure & Advisory' : 'Destination Hub'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer Guarantee Stat */}
        <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Direct University Admissions</span>
          </span>
          <span className="font-mono text-[11px] text-slate-500">2026 Intakes Open</span>
        </div>
      </div>
    </div>
  );
};
