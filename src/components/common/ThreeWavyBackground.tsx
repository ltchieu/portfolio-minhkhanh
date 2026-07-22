import { useEffect, useRef } from "react";
import * as THREE from "three";

// Three.js Monochrome Wavy Background with Dual Ribbon Paths
export default function ThreeWavyBackground() {
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

        // Monochrome Palette: Off-white and Soft Light Grey (closer to white)
        vec3 colorLight = vec3(0.96, 0.96, 0.97); // Off-white
        vec3 colorDark  = vec3(0.72, 0.72, 0.75); // Soft Light Grey


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
}
