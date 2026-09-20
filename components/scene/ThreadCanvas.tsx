"use client";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { threadPoints, threadView } from "@/data/thread";

type Props = { progress: MutableRefObject<number>; paused: boolean; onReady: (ready: boolean) => void; onError: () => void };

function Route({ progress, paused, onReady }: Omit<Props, "onError">) {
  const elapsed = useRef(0);
  const notified = useRef(false);
  const traveller = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const main = new THREE.CatmullRomCurve3([
      [0, 6, 0], [3, 5, -1], [3.5, 2, 1], [.5, -1, 0], [-2, 0, 2],
      [-1, 3, -1], [2, 2, 0], [4, -4, 1], threadPoints[1],
      [-5.6, -15, -1.5], threadPoints[2], [5, -25, -1.8],
      threadPoints[3], [-4.5, -37, 1.5], threadPoints[4],
      [5, -47, -1.5], threadPoints[5], [-3, -57, 1], threadPoints[6],
    ].map(p => new THREE.Vector3(...p as [number, number, number])));
    const marks = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      marks[i * 3] = (i % 12 - 5.5) * 1.8;
      marks[i * 3 + 1] = 5 - Math.floor(i / 12) * 5.2;
      marks[i * 3 + 2] = -3;
    }
    const dots = new THREE.BufferGeometry();
    dots.setAttribute("position", new THREE.BufferAttribute(marks, 3));
    return { main, tube: new THREE.TubeGeometry(main, 480, .095, 10, false), rail: new THREE.TubeGeometry(main, 480, .009, 4, false), dots };
  }, []);
  useEffect(() => () => { geometry.tube.dispose(); geometry.rail.dispose(); geometry.dots.dispose(); }, [geometry]);
  useFrame(({ camera, size }, delta) => {
    if (!notified.current) { notified.current = true; onReady(true); }
    const view = threadView(progress.current);
    const ortho = camera as THREE.OrthographicCamera;
    const blend = 1 - Math.exp(-Math.min(delta, .05) * 8);
    // Leave a calm reading column on the left. At the end reveal the entire route.
    const width = view.span * size.width / size.height;
    const x = view.x - width * .22 * (1 - view.overview);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, blend);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, view.y, blend);
    ortho.zoom = THREE.MathUtils.lerp(ortho.zoom, size.height / view.span, blend);
    ortho.updateProjectionMatrix();
    if (!paused) elapsed.current += Math.min(delta, .05);
    if (traveller.current) {
      const p = geometry.main.getPointAt((progress.current * .93 + elapsed.current * .008) % 1);
      traveller.current.position.copy(p);
    }
  });
  return <>
    <mesh geometry={geometry.tube}><meshStandardMaterial color="#b4cec0" metalness={.6} roughness={.28} /></mesh>
    <mesh geometry={geometry.rail} position={[.22, 0, -.15]}><meshBasicMaterial color="#456154" /></mesh>
    <points geometry={geometry.dots}><pointsMaterial size={.026} color="#526158" transparent opacity={.45} sizeAttenuation /></points>
    {threadPoints.slice(1, -1).map((p, i) => <group key={i} position={p}>
      <mesh rotation={[.18, -.2, .15]}><torusGeometry args={[.32, .022, 6, 40]} /><meshBasicMaterial color="#c0d7cc" /></mesh>
      <mesh position={[0, 0, -.12]}><circleGeometry args={[.21, 32]} /><meshBasicMaterial color="#17241e" /></mesh>
      <mesh position={[0, 0, .08]}><sphereGeometry args={[.07, 12, 8]} /><meshBasicMaterial color="#d8e7df" /></mesh>
    </group>)}
    <mesh ref={traveller}><sphereGeometry args={[.095, 12, 8]} /><meshBasicMaterial color="#f6eee0" /></mesh>
  </>;
}

export default function ThreadCanvas({ progress, paused, onReady, onError }: Props) {
  return <Canvas dpr={[1, 1.5]} frameloop={paused ? "demand" : "always"} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", onError, { once: true }); }}>
    <OrthographicCamera makeDefault position={[-4, 2, 25]} zoom={60} near={.1} far={100} />
    <ambientLight intensity={1.1} /><directionalLight position={[4, 10, 15]} intensity={3} /><directionalLight position={[-10, -20, 5]} intensity={1.5} color="#b0cfbc" />
    <Route progress={progress} paused={paused} onReady={onReady} />
  </Canvas>;
}
