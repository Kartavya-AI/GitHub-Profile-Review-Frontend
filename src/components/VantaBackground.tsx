"use client";

import { useEffect, useRef, useState } from "react";

export default function VantaBackground({ children }: { children: React.ReactNode }) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let THREE: any;
    let CELLS: any;

    async function loadVanta() {
      const three = await import("three");
      const vantaCells = (await import("vanta/dist/vanta.cells.min")).default;

      THREE = three;
      CELLS = vantaCells;

      if (!vantaEffect && vantaRef.current) {
        setVantaEffect(
          CELLS({
            el: vantaRef.current,
            THREE,
            color1: 0x4a90e2,          // tech blue color
            color2: 0x8aade8,          // lighter blue accent
            backgroundColor: 0xf9fafb, // light neutral background
            size: 1.2,                 // tweak for scale
            spacing: 20,               // spacing between cells
            showLines: true,
          })
        );
      }
    }

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="relative w-full min-h-screen overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
