import { cn } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="relative z-50 flex h-6 w-[30px] cursor-pointer flex-col justify-between"
    >
      {/* Barra Superior */}
      <span
        className={cn(
          'block h-[3px] w-full origin-center rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && 'translate-y-2.5 rotate-45'
        )}
      />

      {/* Barra Central */}
      <span
        className={cn(
          'block h-[3px] w-full rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && 'translate-x-4 opacity-0'
        )}
      />

      {/* Barra Inferior */}
      <span
        className={cn(
          'block h-[3px] w-full origin-center rounded-sm bg-white transition-all duration-400 ease-in-out',
          isOpen && '-translate-y-[11px] -rotate-45'
        )}
      />
    </div>
  );
};
