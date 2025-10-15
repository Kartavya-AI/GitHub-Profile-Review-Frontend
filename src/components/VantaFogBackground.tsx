// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import FOG from "vanta/dist/vanta.fog.min";

// export default function VantaFogBackground() {
//   const [vantaEffect, setVantaEffect] = useState<any>(null);
//   const vantaRef = useRef(null);

//   useEffect(() => {
//     if (!vantaEffect) {
//       setVantaEffect(
//         FOG({
//           el: vantaRef.current,
//           THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.0,
//           minWidth: 200.0,
//            baseColor: 0xffffff,         
//           highlightColor: 0xf5f3ff,    
//           midtoneColor: 0xfef9ff,     
//           lowlightColor: 0xf9f4ff,    

//           blurFactor: 0.5,             
//           speed: 0.8,
//         })
//       );
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, [vantaEffect]);

//   return <div ref={vantaRef} className="absolute inset-0 -z-10" style={{ backgroundColor: "#fef7ff" }}/>;
// }
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

// Optional: define a minimal type for Vanta instance
type VantaEffectInstance = {
  destroy: () => void;
};

export default function VantaFogBackground() {
  const [vantaEffect, setVantaEffect] = useState<VantaEffectInstance | null>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0xffffff,
          highlightColor: 0xf5f3ff,
          midtoneColor: 0xfef9ff,
          lowlightColor: 0xf9f4ff,
          blurFactor: 0.5,
          speed: 0.8,
        }) as VantaEffectInstance
      );
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 -z-10"
      style={{ backgroundColor: "#fef7ff" }}
    />
  );
}
