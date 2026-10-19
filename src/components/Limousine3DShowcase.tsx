/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Rotate3d,
  Sparkles,
  Lightbulb,
  Camera,
  Maximize2,
  ChevronDown,
  ChevronUp,
  X,
  Eye
} from "lucide-react";

interface Limousine3DProps {
  onClose?: () => void;
  lang?: string;
}

export const Limousine3DShowcase: React.FC<Limousine3DProps> = ({ onClose, lang = "ar" }) => {
  const L = (ar: string, en: string, zh: string, ru: string) =>
    lang === "ar" ? ar : lang === "zh" ? zh : lang === "ru" ? ru : en;
  const containerRef = useRef<HTMLDivElement>(null);
  const [paintColor, setPaintColor] = useState<string>("#0b0e14"); // Obsidian Black default
  const [lightsOn, setLightsOn] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [activeCamPreset, setActiveCamPreset] = useState<string>("frontThreeQuarter");

  // Paint Color Swatches
  const colorOptions = [
    { id: "black", name: L("أسود أوبسيديان ملكي", "Obsidian Black", "黑曜石黑", "Чёрный обсидиан"), hex: "#0a0d14", metal: 0.95, rough: 0.12 },
    { id: "white", name: L("أبيض لؤلؤي ماسي", "Diamond Pearl White", "钻石珍珠白", "Алмазный жемчужно-белый"), hex: "#f0f4f8", metal: 0.4, rough: 0.18 },
    { id: "blue", name: L("أزرق سفير ملكي", "Royal Sapphire Blue", "皇家蓝宝石蓝", "Королевский сапфировый синий"), hex: "#0f2347", metal: 0.9, rough: 0.15 },
    { id: "gold", name: L("شامبين جولد فخم", "Champagne Gold", "香槟金", "Золото шампань"), hex: "#c29d53", metal: 0.92, rough: 0.2 },
    { id: "silver", name: L("فضي بلاتيني ناصع", "Platinum Silver", "铂金银", "Платиновое серебро"), hex: "#949ba6", metal: 0.98, rough: 0.14 }
  ];

  // Camera presets
  const cameraPresets: Record<string, { x: number; y: number; z: number }> = {
    frontThreeQuarter: { x: 7, y: 3.2, z: 8.5 },
    side: { x: 9.5, y: 1.8, z: 0 },
    rearThreeQuarter: { x: -7, y: 3.0, z: -8 },
    top: { x: 0.1, y: 11, z: 0.5 }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080d);
    scene.fog = new THREE.FogExp2(0x06080d, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const initialPos = cameraPresets.frontThreeQuarter;
    camera.position.set(initialPos.x, initialPos.y, initialPos.z);
    camera.lookAt(0, 0.7, 0);

    // Target camera position for smooth damped interpolation
    const targetCameraPos = new THREE.Vector3(initialPos.x, initialPos.y, initialPos.z);

    // 3. Renderer with ACESFilmicToneMapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.8);
    keyLight.position.set(8, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x7ea8db, 1.2);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    // Ambient Hemisphere
    const hemiLight = new THREE.HemisphereLight(0x283b5b, 0x05070a, 0.9);
    scene.add(hemiLight);

    // Studio Rim Lights for silhouette gloss
    const rimLight1 = new THREE.PointLight(0xd4af37, 2.5, 15);
    rimLight1.position.set(0, 2.5, -7);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0x5599ff, 1.8, 15);
    rimLight2.position.set(0, 2.5, 7);
    scene.add(rimLight2);

    // 5. Contact Shadow & Studio Floor Grid
    // Contact Shadow Plane
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.95)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(8.5, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.01;
    scene.add(contactShadow);

    // Circular reflective pedestal
    const pedestalGeo = new THREE.CylinderGeometry(6, 6.2, 0.15, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0e131d,
      roughness: 0.25,
      metalness: 0.85
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.08;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Outer ring accent
    const ringGeo = new THREE.RingGeometry(6.2, 6.35, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.07;
    scene.add(ring);

    // 6. BUILD PROCEDURAL LUXURY LIMOUSINE (Composite 3-12 Part THREE.Group)
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    // Material references for live customization
    const carBodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paintColor),
      metalness: 0.95,
      roughness: 0.12
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0d141f,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.88,
      depthWrite: false
    });

    const interiorLeatherMat = new THREE.MeshStandardMaterial({
      color: 0x8a4b24, // Cognac executive leather
      roughness: 0.65,
      metalness: 0.1
    });

    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.85,
      metalness: 0.1
    });

    const headlightGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0xddeeff),
      emissiveIntensity: lightsOn ? 2.5 : 0.1,
      roughness: 0.1,
      metalness: 0.5
    });

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0x990000,
      emissive: new THREE.Color(0xff1111),
      emissiveIntensity: lightsOn ? 2.8 : 0.2,
      roughness: 0.2,
      metalness: 0.4
    });

    // Part 1: Main Lower Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(5.4, 0.65, 2.1);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, carBodyMaterial);
    lowerBody.position.y = 0.6;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Front aerodynamic tapered nose
    const hoodGeo = new THREE.BoxGeometry(1.6, 0.45, 2.05);
    const hood = new THREE.Mesh(hoodGeo, carBodyMaterial);
    hood.position.set(2.0, 0.8, 0);
    hood.rotation.z = -0.06;
    hood.castShadow = true;
    carGroup.add(hood);

    // Rear boot/trunk
    const trunkGeo = new THREE.BoxGeometry(1.2, 0.48, 2.05);
    const trunk = new THREE.Mesh(trunkGeo, carBodyMaterial);
    trunk.position.set(-2.2, 0.8, 0);
    trunk.rotation.z = 0.05;
    trunk.castShadow = true;
    carGroup.add(trunk);

    // Part 2: Passenger Cabin & Panoramic Glass Roof
    const cabinGeo = new THREE.BoxGeometry(2.8, 0.75, 1.75);
    const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
    cabin.position.set(-0.15, 1.25, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Cabin Roof Panel (Solid Painted Body)
    const roofGeo = new THREE.BoxGeometry(2.7, 0.08, 1.7);
    const roof = new THREE.Mesh(roofGeo, carBodyMaterial);
    roof.position.set(-0.15, 1.65, 0);
    roof.castShadow = true;
    carGroup.add(roof);

    // Interior seats visible through glass
    const seatGeo = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const seat1 = new THREE.Mesh(seatGeo, interiorLeatherMat);
    seat1.position.set(0.5, 1.05, 0.45);
    const seat2 = new THREE.Mesh(seatGeo, interiorLeatherMat);
    seat2.position.set(0.5, 1.05, -0.45);
    const seat3 = new THREE.Mesh(seatGeo, interiorLeatherMat);
    seat3.position.set(-0.6, 1.05, 0.45);
    const seat4 = new THREE.Mesh(seatGeo, interiorLeatherMat);
    seat4.position.set(-0.6, 1.05, -0.45);
    carGroup.add(seat1, seat2, seat3, seat4);

    // Part 3: Front Executive Maybach Grille (Chrome)
    const grilleGeo = new THREE.BoxGeometry(0.12, 0.5, 1.2);
    const grille = new THREE.Mesh(grilleGeo, chromeMaterial);
    grille.position.set(2.72, 0.65, 0);
    carGroup.add(grille);

    // Grille vertical slats
    for (let i = -5; i <= 5; i++) {
      const slatGeo = new THREE.BoxGeometry(0.08, 0.45, 0.02);
      const slat = new THREE.Mesh(slatGeo, chromeMaterial);
      slat.position.set(2.76, 0.65, i * 0.1);
      carGroup.add(slat);
    }

    // Hood Emblem / Mascot (Gold)
    const emblemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 16);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.1 });
    const emblem = new THREE.Mesh(emblemGeo, goldMat);
    emblem.position.set(2.65, 1.05, 0);
    carGroup.add(emblem);

    // Part 4: LED Headlights & Taillights
    const headlightGeo = new THREE.BoxGeometry(0.25, 0.14, 0.35);
    const leftHeadlight = new THREE.Mesh(headlightGeo, headlightGlassMat);
    leftHeadlight.position.set(2.68, 0.75, 0.75);
    const rightHeadlight = new THREE.Mesh(headlightGeo, headlightGlassMat);
    rightHeadlight.position.set(2.68, 0.75, -0.75);
    carGroup.add(leftHeadlight, rightHeadlight);

    // LED Taillights (Continuous Light Bar)
    const taillightGeo = new THREE.BoxGeometry(0.15, 0.1, 1.8);
    const taillight = new THREE.Mesh(taillightGeo, taillightMat);
    taillight.position.set(-2.72, 0.78, 0);
    carGroup.add(taillight);

    // Part 5: Side Mirrors & Chrome Window Trims
    const mirrorGeo = new THREE.BoxGeometry(0.2, 0.12, 0.22);
    const leftMirror = new THREE.Mesh(mirrorGeo, carBodyMaterial);
    leftMirror.position.set(1.15, 1.15, 0.98);
    const rightMirror = new THREE.Mesh(mirrorGeo, carBodyMaterial);
    rightMirror.position.set(1.15, 1.15, -0.98);
    carGroup.add(leftMirror, rightMirror);

    // Chrome Window Surrounds (Lower Sill)
    const sillGeo = new THREE.BoxGeometry(3.0, 0.03, 0.04);
    const leftSill = new THREE.Mesh(sillGeo, chromeMaterial);
    leftSill.position.set(-0.15, 0.95, 0.92);
    const rightSill = new THREE.Mesh(sillGeo, chromeMaterial);
    rightSill.position.set(-0.15, 0.95, -0.92);
    carGroup.add(leftSill, rightSill);

    // Part 6: 4 Detailed Executive Wheels (Rims + Brake Calipers)
    const wheelPositions = [
      { x: 1.7, z: 0.96 },
      { x: 1.7, z: -0.96 },
      { x: -1.7, z: 0.96 },
      { x: -1.7, z: -0.96 }
    ];

    const wheelMeshes: THREE.Group[] = [];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, 0.4, pos.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.28, 32);
      tireGeo.rotateZ(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeo, rubberMaterial);
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Chrome Multi-Spoke Rim
      const rimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.29, 24);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, chromeMaterial);
      wheelGroup.add(rim);

      // Gold center cap
      const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.31, 16);
      capGeo.rotateZ(Math.PI / 2);
      const cap = new THREE.Mesh(capGeo, goldMat);
      wheelGroup.add(cap);

      carGroup.add(wheelGroup);
      wheelMeshes.push(wheelGroup);
    });

    // 7. Interactive Mouse / Touch Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let azimuth = 0.8;
    let elevation = 0.35;
    let distance = 11.5;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      azimuth -= deltaX * 0.007;
      elevation = Math.max(0.1, Math.min(1.2, elevation + deltaY * 0.005));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      distance = Math.max(6, Math.min(18, distance + e.deltaY * 0.01));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Loop (Lossless 60fps with Exponential Damping)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto-rotation if enabled and not currently dragging
      if (autoRotate && !isDragging) {
        azimuth += delta * 0.35;
      }

      // Smooth damped camera positioning
      targetCameraPos.x = Math.sin(azimuth) * Math.cos(elevation) * distance;
      targetCameraPos.y = Math.sin(elevation) * distance;
      targetCameraPos.z = Math.cos(azimuth) * Math.cos(elevation) * distance;

      camera.position.lerp(targetCameraPos, 0.08);
      camera.lookAt(0, 0.65, 0);

      // Subtle chassis suspension idle breathing
      carGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Store references on container for external React state updates
    (container as any).__threeRefs = {
      carBodyMaterial,
      headlightGlassMat,
      taillightMat,
      camera,
      setCameraPreset: (presetKey: string) => {
        const p = cameraPresets[presetKey];
        if (p) {
          distance = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
          azimuth = Math.atan2(p.x, p.z);
          elevation = Math.asin(p.y / distance);
        }
      }
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      domElement.removeEventListener("wheel", onWheel);

      renderer.dispose();
      scene.clear();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, []);

  // Update paint color in real time
  useEffect(() => {
    const refs = (containerRef.current as any)?.__threeRefs;
    if (refs?.carBodyMaterial) {
      refs.carBodyMaterial.color.set(paintColor);
    }
  }, [paintColor]);

  // Update headlights emissive state
  useEffect(() => {
    const refs = (containerRef.current as any)?.__threeRefs;
    if (refs?.headlightGlassMat && refs?.taillightMat) {
      refs.headlightGlassMat.emissiveIntensity = lightsOn ? 2.5 : 0.05;
      refs.taillightMat.emissiveIntensity = lightsOn ? 2.8 : 0.15;
    }
  }, [lightsOn]);

  // Apply camera preset
  const handleApplyCameraPreset = (presetKey: string) => {
    setActiveCamPreset(presetKey);
    const refs = (containerRef.current as any)?.__threeRefs;
    if (refs?.setCameraPreset) {
      refs.setCameraPreset(presetKey);
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-card-gold shadow-2xl border border-amber-400/30">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge (Minimalist Title & Quick Actions) */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 p-2 px-3.5 rounded-2xl glass-panel border border-white/10 pointer-events-auto shadow-lg">
          <Rotate3d className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-start">
            <span className="text-xs font-bold text-white block font-['Cairo']">
              {L("استعراض الليموزين التفاعلي 3D", "Interactive 3D Limousine Studio", "3D 互动豪华轿车展厅", "Интерактивная 3D-студия лимузина")}
            </span>
            <span className="text-[10px] text-slate-300 block">
              {L("اسحب الماوس للدوران 360° واستكشف الفخامة", "Drag to rotate 360° & inspect details", "拖动即可 360° 旋转并查看细节", "Перетащите, чтобы повернуть на 360° и рассмотреть детали")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Auto-rotate Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold glass-btn-ghost flex items-center gap-1.5 cursor-pointer shadow-md ${
              autoRotate ? "text-amber-400 border-amber-400/40" : "text-slate-300"
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {autoRotate ? (L("إيقاف الدوران", "Pause Spin", "暂停旋转", "Остановить вращение")) : (L("دوران تلقائي", "Auto Spin", "自动旋转", "Автовращение"))}
            </span>
          </button>

          {/* Close button if modal */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-btn-ghost flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Bottom Studio Control Dock (Zero Viewport Occlusion) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto max-w-2xl transition-all duration-300 z-20"
      >
        {/* Toggle Collapse/Expand handle */}
        <div className="flex justify-center mb-1">
          <button
            type="button"
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-3 py-1 rounded-t-xl glass-panel text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 border-b-0 cursor-pointer shadow-md"
          >
            {isControlsCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>
              {isControlsCollapsed
                ? (L("إظهار أدوات التخصيص 3D", "Show 3D Customizer", "显示 3D 定制工具", "Показать настройки 3D"))
                : (L("إخفاء لوحة التحكم", "Hide Controls", "隐藏控制面板", "Скрыть панель"))}
            </span>
          </button>
        </div>

        {/* Studio Dock Body */}
        {!isControlsCollapsed && (
          <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-start">
            {/* Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                {L("لون الطلاء:", "Exterior Paint:", "车身颜色：", "Цвет кузова:")}
              </span>
              <div className="flex items-center gap-1.5">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setPaintColor(c.hex)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer shadow-sm ${
                      paintColor === c.hex
                        ? "scale-125 border-amber-400 ring-2 ring-amber-400/50"
                        : "border-white/30 hover:scale-110"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Camera View Angle Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-300 font-medium hidden md:inline">
                {L("زوايا الرؤية:", "Camera:", "视角：", "Ракурс:")}
              </span>
              <button
                type="button"
                onClick={() => handleApplyCameraPreset("frontThreeQuarter")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold glass-btn-ghost cursor-pointer ${
                  activeCamPreset === "frontThreeQuarter" ? "text-amber-400 border-amber-400/50" : "text-slate-300"
                }`}
              >
                {L("أمامي", "Front 3/4", "前侧", "Спереди")}
              </button>
              <button
                type="button"
                onClick={() => handleApplyCameraPreset("side")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold glass-btn-ghost cursor-pointer ${
                  activeCamPreset === "side" ? "text-amber-400 border-amber-400/50" : "text-slate-300"
                }`}
              >
                {L("جانبي", "Profile", "侧面", "Сбоку")}
              </button>
              <button
                type="button"
                onClick={() => handleApplyCameraPreset("rearThreeQuarter")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold glass-btn-ghost cursor-pointer ${
                  activeCamPreset === "rearThreeQuarter" ? "text-amber-400 border-amber-400/50" : "text-slate-300"
                }`}
              >
                {L("خلفي", "Rear", "后侧", "Сзади")}
              </button>
            </div>

            {/* LED Headlights Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightsOn(!lightsOn)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold glass-btn-ghost flex items-center gap-1.5 cursor-pointer ${
                  lightsOn ? "text-amber-300 border-amber-400/40 bg-amber-500/10" : "text-slate-400"
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>
                  {lightsOn
                    ? (L("إضاءة LED مفعّلة", "LED Lights ON", "LED 灯已开启", "LED-свет включён"))
                    : (L("إضاءة LED مطفأة", "LED Lights OFF", "LED 灯已关闭", "LED-свет выключен"))}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
