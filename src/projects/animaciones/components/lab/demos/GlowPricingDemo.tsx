'use client';

import GlowPricing from '../effects/GlowPricing';

export function GlowPricingDemo() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-neutral-950 px-4 py-12">
      <div className="w-full max-w-5xl">
        <GlowPricing />
      </div>
    </div>
  );
}
