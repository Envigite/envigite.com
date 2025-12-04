import { useState } from 'react';
import { HamburgerButton } from '../buttons/HamburgerButton';

export const HamburgerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />;
};
