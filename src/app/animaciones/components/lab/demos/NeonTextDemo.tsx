'use client';

import { NeonText } from '../effects/NeonText';

export const NeonTextDemo = () => {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-neutral-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="z-10">
        <NeonText>Proximamente</NeonText>
      </div>
    </div>
  );
};
