import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThreeRoomCanvas({
  dimensions = { length: 5.5, width: 4.2, height: 2.8 },
  wallColor = '#ebe7df',
  accentColor = '#3b4252',
  floorId = 'light_oak',
  placedFurniture = [],
  selectedId = null,
  onSelectItem = () => {},
  onUpdateItemPosition = () => {},
  viewMode = 'perspective' // 'perspective' | 'topdown' | 'firstperson'
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsMapRef = useRef(new Map());
  const selectedMeshBoxRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragPlaneRef = useRef(null);
  const dragOffsetRef = useRef(new THREE.Vector3());
  const hoveredMeshRef = useRef(null);

  // Orbit state
  const isOrbitingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAnglesRef = useRef({ phi: Math.PI / 4, theta: Math.PI / 4, radius: 9 });

  // Procedural floor textures
  const createFloorMaterial = (type) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (type === 'light_oak' || type === 'dark_walnut' || type === 'birch' || type === 'bamboo') {
      const base = type === 'dark_walnut' ? '#582f0e' : (type === 'light_oak' ? '#d4a373' : (type === 'bamboo' ? '#cca47c' : '#e9d8a6'));
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 512, 512);

      // Draw wood planks
      const plankHeight = 64;
      for (let y = 0; y < 512; y += plankHeight) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(0, y, 512, 2);

        // Vertical joints
        const offset = (y / plankHeight) % 2 === 0 ? 0 : 128;
        for (let x = offset; x < 512; x += 256) {
          ctx.fillRect(x, y, 2, plankHeight);
        }
      }
    } else if (type === 'marble') {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, 0);
        ctx.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
        ctx.stroke();
      }
    } else if (type === 'concrete') {
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      for (let i = 0; i < 400; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 4, 4);
      }
    } else {
      // Tile grid
      ctx.fillStyle = '#e5d9c5';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#d6c7b2';
      ctx.lineWidth = 3;
      for (let i = 0; i <= 512; i += 128) {
        ctx.strokeRect(i, 0, 128, 512);
        ctx.strokeRect(0, i, 512, 128);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: type === 'marble' ? 0.15 : (type === 'concrete' ? 0.8 : 0.4),
      metalness: type === 'marble' ? 0.1 : 0.05
    });
  };

  // Build Furniture 3D Mesh
  const buildFurnitureMesh = (item) => {
    const group = new THREE.Group();
    group.name = item.id;
    group.userData = { id: item.id, itemData: item };

    const colorHex = item.color || '#475569';
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.5,
      metalness: 0.1
    });

    const woodLegMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.6
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xca8a04,
      metalness: 0.85,
      roughness: 0.2
    });

    const meshType = item.catalogId ? item.catalogId.split('-')[0] : 'sofa';

    if (meshType === 'sofa') {
      // 3-Seater Base
      const baseGeo = new THREE.BoxGeometry(2.2, 0.35, 0.9);
      const base = new THREE.Mesh(baseGeo, mainMaterial);
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      // Backrest
      const backGeo = new THREE.BoxGeometry(2.2, 0.55, 0.25);
      const back = new THREE.Mesh(backGeo, mainMaterial);
      back.position.set(0, 0.35, -0.32);
      back.castShadow = true;
      group.add(back);

      // Armrests
      const armGeo = new THREE.BoxGeometry(0.2, 0.45, 0.9);
      const leftArm = new THREE.Mesh(armGeo, mainMaterial);
      leftArm.position.set(-1.0, 0.15, 0);
      const rightArm = new THREE.Mesh(armGeo, mainMaterial);
      rightArm.position.set(1.0, 0.15, 0);
      group.add(leftArm);
      group.add(rightArm);

      // Cushions
      for (let i = -0.6; i <= 0.6; i += 0.6) {
        const cGeo = new THREE.BoxGeometry(0.55, 0.15, 0.65);
        const cMesh = new THREE.Mesh(cGeo, mainMaterial);
        cMesh.position.set(i, 0.22, 0.05);
        group.add(cMesh);
      }

      // Wooden Legs
      const legGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.2, 8);
      [[-0.95, -0.22, 0.35], [0.95, -0.22, 0.35], [-0.95, -0.22, -0.35], [0.95, -0.22, -0.35]].forEach(pos => {
        const leg = new THREE.Mesh(legGeo, woodLegMaterial);
        leg.position.set(...pos);
        group.add(leg);
      });
    } else if (meshType === 'table') {
      if (item.name?.includes('Coffee') || item.catalogId === 'table-01') {
        // Marble Coffee Table Top
        const topGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.04, 32);
        const marbleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0.1 });
        const top = new THREE.Mesh(topGeo, marbleMat);
        top.position.y = 0.2;
        group.add(top);

        // Brass Tripod Legs
        for (let i = 0; i < 3; i++) {
          const angle = (i * 2 * Math.PI) / 3;
          const legGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8);
          const leg = new THREE.Mesh(legGeo, brassMaterial);
          leg.position.set(Math.sin(angle) * 0.35, 0, Math.cos(angle) * 0.35);
          leg.rotation.z = Math.sin(angle) * 0.15;
          group.add(leg);
        }
      } else {
        // Dining Table
        const topGeo = new THREE.BoxGeometry(1.8, 0.06, 0.9);
        const top = new THREE.Mesh(topGeo, woodLegMaterial);
        top.position.y = 0.35;
        group.add(top);

        const legGeo = new THREE.BoxGeometry(0.08, 0.7, 0.08);
        [[-0.8, 0, -0.35], [0.8, 0, -0.35], [-0.8, 0, 0.35], [0.8, 0, 0.35]].forEach(pos => {
          const leg = new THREE.Mesh(legGeo, woodLegMaterial);
          leg.position.set(...pos);
          group.add(leg);
        });
      }
    } else if (meshType === 'chair') {
      const seatGeo = new THREE.BoxGeometry(0.5, 0.06, 0.5);
      const seat = new THREE.Mesh(seatGeo, mainMaterial);
      seat.position.y = 0.15;
      group.add(seat);

      const backGeo = new THREE.BoxGeometry(0.5, 0.45, 0.05);
      const back = new THREE.Mesh(backGeo, mainMaterial);
      back.position.set(0, 0.38, -0.22);
      group.add(back);

      const legGeo = new THREE.CylinderGeometry(0.02, 0.015, 0.45, 8);
      [[-0.2, -0.08, 0.2], [0.2, -0.08, 0.2], [-0.2, -0.08, -0.2], [0.2, -0.08, -0.2]].forEach(pos => {
        const leg = new THREE.Mesh(legGeo, woodLegMaterial);
        leg.position.set(...pos);
        group.add(leg);
      });
    } else if (meshType === 'light') {
      if (item.name?.includes('Chandelier') || item.catalogId === 'light-02') {
        const centerOrb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), brassMaterial);
        group.add(centerOrb);

        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4), brassMaterial);
          arm.position.set(Math.cos(angle) * 0.2, 0, Math.sin(angle) * 0.2);
          arm.rotation.z = Math.PI / 2;
          arm.rotation.y = angle;
          group.add(arm);

          const bulb = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xfffaed })
          );
          bulb.position.set(Math.cos(angle) * 0.42, 0, Math.sin(angle) * 0.42);
          group.add(bulb);
        }
      } else {
        // Floor lamp
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), brassMaterial);
        base.position.y = -0.9;
        group.add(base);

        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.8), brassMaterial);
        pole.position.y = 0;
        group.add(pole);

        const shade = new THREE.Mesh(
          new THREE.ConeGeometry(0.25, 0.35, 24, 1, true),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, side: THREE.DoubleSide })
        );
        shade.position.y = 0.9;
        group.add(shade);
      }
    } else if (meshType === 'decor' && item.catalogId === 'decor-01') {
      // Potted Plant
      const potGeo = new THREE.CylinderGeometry(0.2, 0.14, 0.4, 24);
      const potMat = new THREE.MeshStandardMaterial({ color: 0xdf9e82, roughness: 0.7 });
      const pot = new THREE.Mesh(potGeo, potMat);
      group.add(pot);

      const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.4, side: THREE.DoubleSide });
      for (let i = 0; i < 7; i++) {
        const leafGeo = new THREE.SphereGeometry(0.18, 8, 8);
        leafGeo.scale(1, 0.2, 1.8);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        const a = (i * 2 * Math.PI) / 7;
        leaf.position.set(Math.sin(a) * 0.2, 0.28 + i * 0.04, Math.cos(a) * 0.2);
        leaf.rotation.x = 0.5 + Math.random() * 0.3;
        leaf.rotation.y = a;
        group.add(leaf);
      }
    } else if (meshType === 'decor' && item.catalogId === 'decor-02') {
      // Area Rug
      const rugGeo = new THREE.PlaneGeometry(3.0, 2.0);
      const rugMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), roughness: 0.9 });
      const rug = new THREE.Mesh(rugGeo, rugMat);
      rug.rotation.x = -Math.PI / 2;
      rug.position.y = 0.005;
      group.add(rug);
    } else {
      // Generic Cabinet / Credenza
      const boxGeo = new THREE.BoxGeometry(1.6, 0.5, 0.45);
      const box = new THREE.Mesh(boxGeo, mainMaterial);
      group.add(box);
    }

    // Set position, scale, rotation
    if (item.position) group.position.set(...item.position);
    if (item.rotation) group.rotation.set(...item.rotation);
    if (item.scale) group.scale.set(...item.scale);

    return group;
  };

  // Setup Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfffaed, 1.2);
    mainSun.position.set(8, 12, 6);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 2048;
    mainSun.shadow.mapSize.height = 2048;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 30;
    const d = 8;
    mainSun.shadow.camera.left = -d;
    mainSun.shadow.camera.right = d;
    mainSun.shadow.camera.top = d;
    mainSun.shadow.camera.bottom = -d;
    scene.add(mainSun);

    const fillLight = new THREE.PointLight(0xdbeafe, 0.5, 15);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Floor & Room Structure
    const roomGroup = new THREE.Group();
    roomGroup.name = 'roomStructure';
    scene.add(roomGroup);

    // Drag Plane for raycasting
    const dragPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    dragPlane.rotation.x = -Math.PI / 2;
    scene.add(dragPlane);
    dragPlaneRef.current = dragPlane;

    // Selection Highlight Box
    const selBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const selBoxMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const selMesh = new THREE.Mesh(selBoxGeo, selBoxMat);
    selMesh.visible = false;
    scene.add(selMesh);
    selectedMeshBoxRef.current = selMesh;

    // Animation Loop
    let animationFrameId;
    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      // Camera view mode updates
      if (viewMode === 'topdown') {
        camera.position.set(0, 10, 0.001);
        camera.lookAt(0, 0, 0);
      } else if (viewMode === 'firstperson') {
        camera.position.set(0, 1.4, 2.2);
        camera.lookAt(0, 1.3, -1);
      } else {
        // Perspective Orbit
        const { phi, theta, radius } = cameraAnglesRef.current;
        camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
        camera.position.y = radius * Math.cos(phi);
        camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
        camera.lookAt(0, 0.8, 0);
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    // Window resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Room Geometry & Materials when dimensions, wallColor, floorId change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const existingRoom = scene.getObjectByName('roomStructure');
    if (existingRoom) scene.remove(existingRoom);

    const room = new THREE.Group();
    room.name = 'roomStructure';

    const L = dimensions.length || 5.5;
    const W = dimensions.width || 4.2;
    const H = dimensions.height || 2.8;

    // Floor
    const floorGeo = new THREE.PlaneGeometry(W, L);
    const floorMat = createFloorMaterial(floorId);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    room.add(floor);

    // Floor Baseboard trim
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(W, 0.1, 0.04), trimMat);
    trimBack.position.set(0, 0.05, -L / 2 + 0.02);
    room.add(trimBack);

    // Wall Materials
    const mainWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(wallColor),
      roughness: 0.85
    });

    const accentWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor || wallColor),
      roughness: 0.85
    });

    // Back Wall (Accent Wall)
    const backWallGeo = new THREE.BoxGeometry(W, H, 0.1);
    const backWall = new THREE.Mesh(backWallGeo, accentWallMat);
    backWall.position.set(0, H / 2, -L / 2);
    backWall.receiveShadow = true;
    room.add(backWall);

    // Left Wall with Window
    const leftWallGeo = new THREE.BoxGeometry(0.1, H, L);
    const leftWall = new THREE.Mesh(leftWallGeo, mainWallMat);
    leftWall.position.set(-W / 2, H / 2, 0);
    leftWall.receiveShadow = true;
    room.add(leftWall);

    // Right Wall
    const rightWallGeo = new THREE.BoxGeometry(0.1, H, L);
    const rightWall = new THREE.Mesh(rightWallGeo, mainWallMat);
    rightWall.position.set(W / 2, H / 2, 0);
    rightWall.receiveShadow = true;
    room.add(rightWall);

    // Grid guide on floor
    const grid = new THREE.GridHelper(Math.max(L, W), Math.round(Math.max(L, W)), 0x94a3b8, 0xe2e8f0);
    grid.position.y = 0.002;
    room.add(grid);

    scene.add(room);
  }, [dimensions, wallColor, accentColor, floorId]);

  // Update Furniture Meshes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing furniture objects
    objectsMapRef.current.forEach((mesh) => {
      scene.remove(mesh);
    });
    objectsMapRef.current.clear();

    placedFurniture.forEach((item) => {
      const mesh = buildFurnitureMesh(item);
      scene.add(mesh);
      objectsMapRef.current.set(item.id, mesh);
    });
  }, [placedFurniture]);

  // Update Selected Mesh Highlight Box
  useEffect(() => {
    const selBox = selectedMeshBoxRef.current;
    if (!selBox) return;

    if (!selectedId || !objectsMapRef.current.has(selectedId)) {
      selBox.visible = false;
      return;
    }

    const selectedMesh = objectsMapRef.current.get(selectedId);
    const bbox = new THREE.Box3().setFromObject(selectedMesh);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);

    selBox.scale.set(size.x * 1.08, size.y * 1.08, size.z * 1.08);
    selBox.position.copy(center);
    selBox.visible = true;
  }, [selectedId, placedFurniture]);

  // Mouse Interaction: Orbit Controls & Drag to Move Furniture
  const handleMouseDown = (e) => {
    if (e.button === 0) { // Left click
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const furnitureMeshes = Array.from(objectsMapRef.current.values());
      const intersects = raycaster.intersectObjects(furnitureMeshes, true);

      if (intersects.length > 0) {
        let topGroup = intersects[0].object;
        while (topGroup.parent && !topGroup.userData?.id) {
          topGroup = topGroup.parent;
        }

        if (topGroup && topGroup.userData?.id) {
          const itemId = topGroup.userData.id;
          onSelectItem(itemId);
          isDraggingRef.current = true;

          const planeIntersects = raycaster.intersectObject(dragPlaneRef.current);
          if (planeIntersects.length > 0) {
            dragOffsetRef.current.copy(topGroup.position).sub(planeIntersects[0].point);
          }
          return;
        }
      }

      // If clicked empty space, start camera orbit
      isOrbitingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current && selectedId) {
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      const planeIntersects = raycaster.intersectObject(dragPlaneRef.current);

      if (planeIntersects.length > 0) {
        const newPos = planeIntersects[0].point.clone().add(dragOffsetRef.current);
        // Clamp within room boundaries
        const halfW = (dimensions.width / 2) - 0.3;
        const halfL = (dimensions.length / 2) - 0.3;
        const clampedX = Math.max(-halfW, Math.min(halfW, newPos.x));
        const clampedZ = Math.max(-halfL, Math.min(halfL, newPos.z));

        const mesh = objectsMapRef.current.get(selectedId);
        if (mesh) {
          mesh.position.x = clampedX;
          mesh.position.z = clampedZ;
          onUpdateItemPosition(selectedId, [clampedX, mesh.position.y, clampedZ]);
        }
      }
    } else if (isOrbitingRef.current && viewMode === 'perspective') {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const angles = cameraAnglesRef.current;
      angles.theta -= deltaX * 0.008;
      angles.phi = Math.max(0.1, Math.min(Math.PI / 2.05, angles.phi - deltaY * 0.008));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    isOrbitingRef.current = false;
  };

  const handleWheel = (e) => {
    if (viewMode === 'perspective') {
      e.preventDefault();
      const angles = cameraAnglesRef.current;
      angles.radius = Math.max(3, Math.min(18, angles.radius + e.deltaY * 0.01));
    }
  };

  return (
    <div
      ref={mountRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: isDraggingRef.current ? 'grabbing' : (isOrbitingRef.current ? 'all-scroll' : 'default'),
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }}
    />
  );
}
