import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import * as THREE from "three";

interface HeroProps {
  currentDateString: string;
  currentTime: string;
}

// Three.js Monochrome Wavy Background with Dual Ribbon Paths
const ThreeWavyBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create Canvas
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full pointer-events-none z-0";
    container.appendChild(canvas);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2.0;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent to blend with pure white background
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Vertex Shader (3D sine wave displacement & normal calculations)
    const vertexShader = `
      precision mediump float;
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;

      void main() {
        vUv = uv;
        
        vec3 pos = position;
        // Wavy displacement along the Z axis (pronounced folds for deep shadow)
        float w1 = sin(pos.x * 1.8 + uTime * 0.5) * 0.20;
        float w2 = cos(pos.y * 2.6 + uTime * 0.7) * 0.14;
        float w3 = sin((pos.x + pos.y) * 1.2 - uTime * 0.3) * 0.08;
        pos.z += w1 + w2 + w3;

        // Analytical derivatives for normal vector calculation
        float dw1_dx = 1.8 * cos(position.x * 1.8 + uTime * 0.5) * 0.20;
        float dw3_dx = 1.2 * cos((position.x + position.y) * 1.2 - uTime * 0.3) * 0.08;
        float dz_dx = dw1_dx + dw3_dx;

        float dw2_dy = -2.6 * sin(position.y * 2.6 + uTime * 0.7) * 0.14;
        float dw3_dy = 1.2 * cos((position.x + position.y) * 1.2 - uTime * 0.3) * 0.08;
        float dz_dy = dw2_dy + dw3_dy;

        vNormal = normalize(vec3(-dz_dx, -dz_dy, 1.0));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment Shader (Tapered width, monochrome palette, volumetric shadows, and film grain)
    const fragmentShader = `
      precision mediump float;
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;

      void main() {
        // Tapering width: ribbon narrows along its length (vUv.x)
        // Starts wide at vUv.x = 0.0, becomes very narrow at vUv.x = 1.0
        float halfWidth = mix(0.48, 0.06, vUv.x);
        
        // Sharp bottom edge, very soft blurred top edge
        float edgeSharp = smoothstep(-halfWidth, -halfWidth + 0.06, vUv.y - 0.5);
        float edgeSoft  = smoothstep(halfWidth, halfWidth - 0.32, vUv.y - 0.5);
        
        // Dissolve ribbon ends smoothly
        float edgeLength = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
        
        float alpha = edgeSharp * edgeSoft * edgeLength;

        if (alpha < 0.001) discard;

        // Monochrome Palette: Off-white and Charcoal Grey
        vec3 colorLight = vec3(0.96, 0.96, 0.97); // Off-white
        vec3 colorDark  = vec3(0.24, 0.24, 0.27); // Charcoal Grey

        // Base gradient distorted by waves for a fluid look
        float grad = vUv.y + sin(vUv.x * 2.8 + uTime * 0.18) * 0.08;
        vec3 baseColor = mix(colorDark, colorLight, smoothstep(0.0, 0.92, grad));

        // Diagonal lighting direction
        vec3 lightDir = normalize(vec3(-0.7, -0.7, 0.6));
        float diff = max(dot(vNormal, lightDir), 0.0);

        // Volumetric Crease Shading: creases are significantly darker (deep soft volume shadow)
        float shadowFactor = smoothstep(0.12, 0.88, diff);
        baseColor = baseColor * (0.32 + shadowFactor * 0.68);

        // Soften the contrast in the center area for maximum typography legibility
        float centerDist = distance(vUv, vec2(0.5, 0.5));
        float centerFactor = smoothstep(0.42, 0.0, centerDist);
        baseColor = mix(baseColor, colorLight, centerFactor * 0.46);

        // Satin/Silk specular highlight
        float spec = pow(diff, 16.0) * 0.08;
        vec3 finalColor = baseColor + vec3(spec);

        // High-contrast film grain noise texture (very visible film look)
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += (grain - 0.5) * 0.075;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Ribbon 1: One big ribbon starting bottom-left, going through center, and tapering near middle-right
    const geometry1 = new THREE.PlaneGeometry(3.8, 1.8, 128, 128);
    const mesh1 = new THREE.Mesh(geometry1, material);
    mesh1.position.set(-0.1, 0.1, 0.0);
    mesh1.rotation.z = Math.PI / 4.8; // 37.5 degrees
    scene.add(mesh1);

    // Ribbon 2: Smaller ribbon starting big from middle-bottom, tapering near middle-right
    const geometry2 = new THREE.PlaneGeometry(2.3, 1.1, 128, 128);
    const mesh2 = new THREE.Mesh(geometry2, material);
    mesh2.position.set(0.48, -0.42, -0.05); // Slightly behind ribbon 1 to prevent z-fighting
    mesh2.rotation.z = Math.PI / 6.0; // 30 degrees
    scene.add(mesh2);

    // Animation loop setup
    const startTime = performance.now();
    let animationId: number;

    const animate = () => {
      const elapsedSeconds = (performance.now() - startTime) / 1000.0;
      material.uniforms.uTime.value = elapsedSeconds;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    // Resize listener
    const handleResize = () => {
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (width < 768) {
        camera.position.z = 2.4;
      } else {
        camera.position.z = 2.0;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      if (container && canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }

      geometry1.dispose();
      geometry2.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 bg-white"
    />
  );
};

export default function Hero({ currentDateString, currentTime }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] md:h-screen w-full flex flex-col justify-between py-12 px-6 pt-[120px] overflow-hidden select-none bg-white">
      {/* Three.js Monochrome Wavy Background */}
      <ThreeWavyBackground />

      {/* Top Header Row - White, Black, and Grey theme */}
      <div className="relative flex justify-between items-start w-full z-10 max-w-[1440px] mx-auto">
        <div className="font-narrow text-xs font-black tracking-[0.2em] text-[#111111] uppercase max-w-xs md:max-w-none">
          Marketing Excutive &amp; Event
        </div>

        <div className="flex items-center gap-3 font-narrow text-xs font-bold tracking-[0.1em] text-[#5E5E5E]">
          <span className="hidden sm:inline">{currentDateString}</span>
          <div className="flex items-center gap-1.5 bg-[#111111] text-white py-1 px-2.5 rounded font-mono text-[11px]">
            <i className="fa-regular fa-clock text-xs text-white/70 animate-pulse"></i>
            <span>{currentTime || "00:00:00"} GMT+7</span>
          </div>
          <i className="fa-solid fa-arrow-right text-xs text-[#111111] animate-bounce-horizontal"></i>
        </div>
      </div>

      {/* Center content redesigned exactly like the user-uploaded image */}
      <div className="relative flex flex-col items-center justify-center w-full flex-grow py-8 z-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-fit flex flex-col text-left"
        >
          {/* Pre-headline */}
          <span className="font-sans text-sm sm:text-base md:text-lg text-[#5E5E5E] font-medium tracking-wide block mb-1">
            Marketing Excutive &amp; Event
          </span>

          {/* Headline */}
          <h1 className="font-sans font-black text-black leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem]">
            Portfolio.
          </h1>

          {/* Post-headline row (aligned with left and right edges of Portfolio) */}
          <div className="flex justify-between items-center w-full mt-2 font-sans text-sm sm:text-base md:text-lg text-[#5E5E5E] font-medium tracking-wide">
            <span>Nguyen Ha Minh Khanh</span>
            <span className="font-bold text-black">2026</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Metadata Info Grid - White, Black, and Grey theme */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full z-10 font-mono text-[11px] tracking-widest text-[#5E5E5E] max-w-[1440px] mx-auto pt-4 border-t border-[#CCCCCC]/60">
        <div className="text-left flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-black/60"></span>
          <a href="https://instagram.com/mnisliz" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:opacity-60 transition-colors">
            @mnisliz — UGC SPECIALIST
          </a>
        </div>
        <div className="text-center sm:text-left md:text-center">
          <a href="mailto:liz.contentcreator@gmail.com" className="hover:text-black hover:opacity-60 transition-colors">
            liz.contentcreator@gmail.com
          </a>
        </div>
        <div className="text-right sm:text-left md:text-right flex items-center justify-end gap-1.5">
          <i className="fa-solid fa-location-dot text-xs text-black/60"></i>
          <span>Ho Chi Minh, Viet Nam — Global Remote</span>
        </div>
      </div>
    </section>
  );
}
