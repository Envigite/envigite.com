'use client';

import { HoverImageLink } from '../effects/HoverImageLinks';

export const HoverImageLinksDemo = () => {
  return (
    <div className="w-full rounded-lg bg-neutral-950 p-4 md:w-[900px] md:p-8">
      <div className="mx-auto max-w-5xl">
        <HoverImageLink
          heading="Portafolio"
          subheading="Mis últimos trabajos"
          imgSrc="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydGZvbGlvfGVufDB8fDB8fHww"
          href="#"
        />
        <HoverImageLink
          heading="Servicios"
          subheading="¿En qué puedo ayudarte?"
          imgSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
          href="#"
        />
        <HoverImageLink
          heading="Contacto"
          subheading="Hablemos de negocios"
          imgSrc="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2670&auto=format&fit=crop"
          href="#"
        />
      </div>
    </div>
  );
};
