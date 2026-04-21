'use client';
import { useState, useContext, createContext } from 'react';
import './Modal.css';
import { User } from '@/app/lib/definitions';
import { logoutUser } from '../_actions/user-actions';
import { useRouter } from 'next/navigation';
import NavMenu from '../_components/NavBar/NavRight/NavMenu/NavMenu';

interface NavMenuContextType {
    navMenuOpen: boolean;
    setNavMenuOpen: (open: boolean) => void;
    closeNavMenu: () => void;
    handleLogout: () => void;
    OpenNavMenu: () => void;
}

const NavMenuContext = createContext<NavMenuContextType>({
    navMenuOpen: false,
    setNavMenuOpen: () => { },
    closeNavMenu: () => { },
    handleLogout: () => { },
    OpenNavMenu: () => { }
});

export function NavMenuProvider({ children, user }: { children: React.ReactNode, user: User }) {
    const router = useRouter();
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result instanceof Error) {
            setError(result);
        } else {
            router.push('/');
        }
    }

    const closeNavMenu = () => {
        setNavMenuOpen(false);
    };

    const OpenNavMenu = () => {
        setNavMenuOpen(true);
    }

    const contextValue = {
        closeNavMenu, // function to close the nav menu
        navMenuOpen,
        setNavMenuOpen,
        handleLogout,
        OpenNavMenu
    };

    return (
        <NavMenuContext.Provider value={contextValue}>
            {children}
            {navMenuOpen && <NavMenu user={user} handleLogout={handleLogout} />}
        </NavMenuContext.Provider>
    );
}

export const useNavMenu = () => useContext(NavMenuContext);
