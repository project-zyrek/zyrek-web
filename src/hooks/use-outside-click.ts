import { useEffect } from 'react';

export const useOutsideClick = (refs: React.RefObject<HTMLElement>[], onOutsideClick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const isClickedOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (isClickedOutside) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [refs, onOutsideClick]);
};


