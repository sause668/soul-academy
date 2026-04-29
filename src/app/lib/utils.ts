import { useEffect, useRef, useState } from 'react'

export function useIsClient() {
  const [isClient, setClient] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}

export function useMenu() {
  const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLDivElement>(null);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (ulRef.current && !ulRef.current.contains(event.target as Node)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showMenu]);

    return { showMenu, setShowMenu, ulRef };
}