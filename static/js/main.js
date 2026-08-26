import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';








(function setupHUDFlashlight() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none'; // Essential: lets clicks pass right through to your UI
    overlay.style.zIndex = '99999';       // Keeps it on top of all panels and canvases
    overlay.style.mixBlendMode = 'screen'; // Additive blending simulation in standard CSS
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';          // Hidden until the mouse enters the screen
    document.body.appendChild(overlay);

    // 2. Track mouse position and update the gradient beam location
    window.addEventListener('mousemove', (e) => {
        if (overlay.style.opacity === '0') overlay.style.opacity = '1';

        const x = e.clientX;
        const y = e.clientY;

        // FaintBlue flash illumination gradient profile
        overlay.style.background = `radial-gradient(
    circle 350px at ${x}px ${y}px, 
    rgba(0, 240, 255, 0.08) 0%, 
    rgba(0, 188, 255, 0.02) 50%, 
    rgba(0, 0, 0, 0) 100%
)`;

    });

    // 3. Fade out the beam cleanly if the user moves their cursor off the app window
    document.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
})();
























console.log("Pure Geometry GUI loaded");

/* ===== LEFT PANEL: search filter + item selection ===== */
(function setupLeftPanel() {
    const searchInput = document.getElementById('mainarea-left-search-input');
    const list = document.getElementById('mainarea-left-list');
    if (!searchInput || !list) return;

    const items = list.querySelectorAll('.mainarea-left-item');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        items.forEach(item => {
            const label = item.querySelector('.mainarea-left-item-label').textContent.toLowerCase();
            const cmd = (item.dataset.cmd || '').toLowerCase();
            const match = label.includes(q) || cmd.includes(q);
            item.style.display = match ? '' : 'none';
        });
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            console.log('[left] selected:', item.dataset.cmd);
        });
    });
})();

/* ===== RIGHT PANEL: action tile clicks ===== */
(function setupRightPanel() {
    const tiles = document.querySelectorAll('.mainarea-right-tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.classList.add('fired');
            console.log('[right] fired:', tile.dataset.action);
            setTimeout(() => tile.classList.remove('fired'), 400);
        });
    });
})();

/* ===== CENTER: Pure Holographic Tony Stark Geometry ===== */
(function setup3D() {
    const container = document.getElementById('mainarea-3d');
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // No mesh lighting needed—everything uses Basic/Points materials with pure laser emission
    const jarvisGroup = new THREE.Group();
    scene.add(jarvisGroup);

    // Helper to generate consistent holographic materials
    const createHoloMat = (color, opacity, wireframe = false) => {
        return new THREE.MeshBasicMaterial({
            color: color,
            wireframe: wireframe,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
    };

    /* 1. CORE ELEMENT: Micro-Node Quantum Cluster */
    const corePointsGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const corePointsMat = new THREE.PointsMaterial({
        color: 0xff3366, // Stark's diagnostic warning red core element
        size: 0.025,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const coreCloud = new THREE.Points(corePointsGeo, corePointsMat);
    jarvisGroup.add(coreCloud);

    /* 2. CORE RING: Fast Spinning Target Reticle */
    const coreRingGeo = new THREE.RingGeometry(0.4, 0.43, 3); // Triangle/Hex data node shape
    const coreRingMat = createHoloMat(0x00ffcc, 0.7, true);
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.rotation.x = Math.PI / 2;
    jarvisGroup.add(coreRing);

    /* 3. TRACKING RINGS: Dual Interlocking Equatorial Tracks */
    const trackGeo1 = new THREE.RingGeometry(0.7, 0.73, 32);
    const trackMat1 = createHoloMat(0x00f0ff, 0.5, true);
    const track1 = new THREE.Mesh(trackGeo1, trackMat1);
    track1.rotation.x = Math.PI / 2;
    jarvisGroup.add(track1);

    const trackGeo2 = new THREE.RingGeometry(0.75, 0.77, 4); // Square framing bounds
    const trackMat2 = createHoloMat(0x00f0ff, 0.3, true);
    const track2 = new THREE.Mesh(trackGeo2, trackMat2);
    track2.rotation.x = Math.PI / 2;
    jarvisGroup.add(track2);

    /* 4. ORBITAL BOUNDS: Off-Axis Giant Scanning Rings */
    const scanningGeo1 = new THREE.RingGeometry(1.0, 1.04, 64);
    const scanningMat1 = createHoloMat(0x00bcff, 0.6, true);
    const scanningRing1 = new THREE.Mesh(scanningGeo1, scanningMat1);
    scanningRing1.rotation.y = Math.PI / 4;
    jarvisGroup.add(scanningRing1);

    const scanningGeo2 = new THREE.RingGeometry(1.1, 1.12, 48);
    const scanningMat2 = createHoloMat(0x00ffaa, 0.4, true);
    const scanningRing2 = new THREE.Mesh(scanningGeo2, scanningMat2);
    scanningRing2.rotation.y = -Math.PI / 4;
    scanningRing2.rotation.x = Math.PI / 6;
    jarvisGroup.add(scanningRing2);

    /* 5. DATA CLOUD: Outer Spherical Telemetry Nodes */
    const cloudGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const cloudMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.015,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const outerTelemetry = new THREE.Points(cloudGeo, cloudMat);
    jarvisGroup.add(outerTelemetry);

    /* 6. BOUNDING CAGE: Low-poly HUD Perimeter Grid */
    const perimeterGeo = new THREE.SphereGeometry(1.6, 8, 8); // Ultra low segment structure
    const perimeterMat = createHoloMat(0x00aaff, 0.08, true);
    const perimeterCage = new THREE.Mesh(perimeterGeo, perimeterMat);
    jarvisGroup.add(perimeterCage);


    // View Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.minDistance = 1.5;
    controls.maxDistance = 6;

    // Slow cinematic global environment rotation
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.addEventListener('start', () => {
        controls.autoRotate = false;
    });

    function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    // Animation Loop handling independent vector telemetry speeds
    function animate() {
        requestAnimationFrame(animate);

        // Micro core spin
        coreCloud.rotation.z -= 0.015;
        coreCloud.rotation.y += 0.005;
        coreRing.rotation.z += 0.04; // Rapid spin for a mechanical processing effect

        // Concentric track offset rotations
        track1.rotation.z += 0.005;
        track2.rotation.z -= 0.008;

        // Diagonal outer scanning matrices
        scanningRing1.rotation.z += 0.003;
        scanningRing2.rotation.z -= 0.005;

        // Exterior telemetry clouds and shield cage
        outerTelemetry.rotation.y += 0.001;
        outerTelemetry.rotation.x -= 0.0005;

        perimeterCage.rotation.y -= 0.0007;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();
})();
