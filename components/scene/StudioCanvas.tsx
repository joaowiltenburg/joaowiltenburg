"use client";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { BufferGeometry, CanvasTexture, CubicBezierCurve3, Float32BufferAttribute, MathUtils, SRGBColorSpace, Vector3, type Group, type Mesh } from "three";
import { studioCode } from "@/data/story";

type Props = { progress: MutableRefObject<number>; paused: boolean; onReady: (ready: boolean) => void; onContextLost: () => void };
const dimensions = [[4.4, 3.2], [3.65, 3.8], [3.25, 2.8]];
// Position, rotation and scale for code, product and growth at each scroll stop.
const poses = [
  [[-.95, -.18, .85, -.07, .17, .12, 1], [1.25, .9, -.5, .13, -.2, -.11, .9], [1.95, -1.2, 1.1, -.05, -.14, .08, .86]],
  [[-2.0, 1.0, -.6, -.16, .4, .22, .72], [-.05, -.05, 1.1, .04, -.04, .04, 1], [2.45, -.9, -.2, .1, -.35, -.19, .77]],
  [[-1.75, 1.05, -.55, -.13, .2, .09, .75], [-1.3, -1.25, -.1, .1, .18, -.1, .68], [1.5, .0, 1.15, -.04, -.06, .04, 1.15]],
];

function makeTexture(index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1100; canvas.height = Math.round(1100 * dimensions[index][1] / dimensions[index][0]);
  const c = canvas.getContext("2d")!;
  const { width: w, height: h } = canvas;
  const styles = getComputedStyle(document.body);
  const body = styles.getPropertyValue("--font-body").trim() || "sans-serif";
  const mono = styles.getPropertyValue("--font-mono").trim() || "monospace";
  const ink = index === 0 ? "#c8d7cd" : "#24382c";
  const muted = index === 0 ? "#9daf9f" : "#445d4c";
  const lineColor = index === 0 ? "#46594a" : index === 1 ? "#b1bdb4" : "#779a86";
  const text = (value: string, x: number, y: number, size: number, color = ink, code = false) => { c.fillStyle = color; c.font = `400 ${size}px ${code ? mono : body}`; c.fillText(value, x, y); };
  const line = (x: number, y: number, endX: number, endY: number) => { c.strokeStyle = lineColor; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(endX, endY); c.stroke(); };
  c.fillStyle = ["#181f1b", "#e9e7df", "#a6c7b8"][index]; c.fillRect(0, 0, w, h);
  c.strokeStyle = lineColor; c.lineWidth = 3; c.strokeRect(1.5, 1.5, w - 3, h - 3);
  text(["joao.ts", "interface", "outbound"][index], 52, 67, 29, muted, true);
  text(["01 / CÓDIGO", "02 / PRODUTO", "03 / GROWTH"][index], 770, 67, 24, muted, true);
  line(0, 110, w, 110);
  if (index === 0) {
    studioCode.forEach((value, i) => { text(String(i + 1).padStart(2, "0"), 52, 243 + i * 75, 26, "#85988a", true); text(value, 136, 243 + i * 75, 32, i === 0 || i === 4 ? "#a6c7b8" : ink, true); });
    line(52, h - 126, w - 52, h - 126);
    c.fillStyle = "#a6c7b8"; c.beginPath(); c.arc(63, h - 65, 6, 0, Math.PI * 2); c.fill();
    text("EM CONSTRUÇÃO", 91, h - 57, 22, muted, true);
  } else if (index === 1) {
    text("FORMA + FUNÇÃO", 76, 219, 25, muted, true);
    text("Uma interface.", 67, 365, 91); text("Várias decisões.", 67, 462, 91);
    c.fillStyle = "#a6c7b8"; c.fillRect(76, 563, 290, 233);
    text("Aa", 111, 729, 141);
    [280, 202, 136].forEach((width, i) => line(425, 603 + i * 69, 425 + width, 603 + i * 69));
    line(76, 887, w - 76, 887);
    text("Explorar", 76, 969, 36); text("↗", w - 125, 969, 46);
    // A cursor and small handles suggest an interface being designed, not a live app.
    c.strokeStyle = "#617e6a"; c.strokeRect(59, 545, 324, 267);
    [[54, 540], [378, 540], [54, 807], [378, 807]].forEach(([x, y]) => { c.fillStyle = "#617e6a"; c.fillRect(x, y, 10, 10); });
  } else {
    text("Conectar.", 67, 292, 116);
    const nodeX = [143, 548, 950];
    const nodeY = [475, 562, 437];
    c.strokeStyle = "#5b8169"; c.lineWidth = 3;
    c.beginPath(); c.moveTo(nodeX[0], nodeY[0]); c.bezierCurveTo(330, 475, 344, 562, 548, 562); c.bezierCurveTo(739, 562, 749, 437, 950, 437); c.stroke();
    nodeX.forEach((x, i) => {
      c.fillStyle = "#a6c7b8"; c.beginPath(); c.arc(x, nodeY[i], 51, 0, Math.PI * 2); c.fill(); c.stroke();
      text(String(i + 1).padStart(2, "0"), x - 23, nodeY[i] + 11, 31, ink, true);
      c.textAlign = "center"; text(["Contato", "Conversa", "Cliente"][i], x, nodeY[i] + 103, 32); c.textAlign = "left";
    });
    line(69, h - 147, w - 69, h - 147);
    text("CÓDIGO TAMBÉM É DISTRIBUIÇÃO", 69, h - 72, 24, muted, true);
  }
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace; texture.anisotropy = 4;
  return texture;
}

function Studio({ progress, paused, onReady, onContextLost }: Props) {
  const root = useRef<Group>(null);
  const layers = useRef<(Group | null)[]>([]);
  const particles = useRef<(Mesh | null)[]>([]);
  const morph = useRef(0), elapsed = useRef(0), drawn = useRef(false);
  const { size, gl, invalidate } = useThree();
  const textures = useMemo(() => [0, 1, 2].map(makeTexture), []);
  const threads = useMemo(() => [0, 1].map(() => ({
    curve: new CubicBezierCurve3(new Vector3(), new Vector3(), new Vector3(), new Vector3()),
    geometry: new BufferGeometry().setAttribute("position", new Float32BufferAttribute(new Float32Array(49 * 3), 3)),
    point: new Vector3(),
  })), []);
  useEffect(() => { drawn.current = false; return () => onReady(false); }, [onReady]);
  useEffect(() => () => { textures.forEach(t => t.dispose()); threads.forEach(t => t.geometry.dispose()); }, [textures, threads]);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onContextLost(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onContextLost]);
  useEffect(() => { invalidate(); }, [paused, invalidate]);
  useFrame((state, delta) => {
    if (!root.current) return;
    const dt = Math.min(delta, .04), damping = 1 - Math.exp(-dt * 7);
    if (!paused) elapsed.current += dt;
    morph.current += (progress.current - morph.current) * damping;
    const p = MathUtils.clamp(morph.current, 0, 1) * 2;
    const segment = Math.min(1, Math.floor(p)), blend = MathUtils.smoothstep(p - segment, 0, 1);
    root.current.rotation.y += (state.pointer.x * .2 - root.current.rotation.y) * damping;
    root.current.rotation.x += (-state.pointer.y * .13 - root.current.rotation.x) * damping;
    root.current.position.y = Math.sin(elapsed.current * .65) * .045;
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const from = poses[segment][i], to = poses[segment + 1][i];
      const value = (axis: number) => MathUtils.lerp(from[axis], to[axis], blend);
      layer.position.set(value(0), value(1), value(2));
      layer.rotation.set(value(3), value(4), value(5));
      layer.scale.setScalar(value(6));
    });
    threads.forEach(({ curve, geometry, point }, i) => {
      const from = layers.current[i], to = layers.current[i + 1];
      if (!from || !to) return;
      curve.v0.set(from.position.x - .6, from.position.y - .6, -1.1);
      curve.v1.set(from.position.x - 2, from.position.y + (i ? -2 : 2.6), -1.1);
      curve.v2.set(to.position.x + 2.8, to.position.y + (i ? -1.8 : 2.5), -1.1);
      curve.v3.set(to.position.x + .8, to.position.y, -1.1);
      const attribute = geometry.attributes.position;
      for (let j = 0; j < 49; j++) { curve.getPoint(j / 48, point); attribute.setXYZ(j, point.x, point.y, point.z); }
      attribute.needsUpdate = true;
      for (let j = 0; j < 3; j++) {
        const particle = particles.current[i * 3 + j];
        if (particle) { curve.getPoint((elapsed.current * .075 + j / 3) % 1, point); particle.position.copy(point); }
      }
    });
    if (!drawn.current) { drawn.current = true; onReady(true); }
  });
  return <>
    <OrthographicCamera makeDefault position={[0, 0, 12]} zoom={Math.min(size.width / 8.9, size.height / 6.8)} near={.1} far={40} />
    <ambientLight intensity={2} /><directionalLight position={[-4, 5, 8]} intensity={2} />
    <group ref={root}>
      {dimensions.map(([width, height], i) => <group key={i} ref={element => { layers.current[i] = element; }}>
        <mesh><boxGeometry args={[width + .025, height + .025, .065]} /><meshStandardMaterial color={["#4a6252", "#a6afa6", "#648470"][i]} roughness={.6} metalness={.2} /></mesh>
        <mesh position={[0, 0, .034]}><planeGeometry args={[width, height]} /><meshBasicMaterial map={textures[i]} toneMapped={false} /></mesh>
      </group>)}
      {threads.map(({ geometry }, i) => <lineLoop key={i} geometry={geometry} frustumCulled={false}><lineBasicMaterial color="#668873" transparent opacity={.45} /></lineLoop>)}
      {Array.from({ length: 6 }, (_, i) => <mesh key={i} ref={element => { particles.current[i] = element; }}><sphereGeometry args={[.027, 8, 6]} /><meshBasicMaterial color="#b1d1bf" toneMapped={false} /></mesh>)}
    </group>
  </>;
}

export default function StudioCanvas(props: Props) {
  return <Canvas dpr={[1, 1.5]} frameloop={props.paused ? "demand" : "always"} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}><Studio {...props} /></Canvas>;
}
