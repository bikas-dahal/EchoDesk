'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Color = 'blue' | 'green' | '';

type ColorPreferencesContextType = {
    colorMode: Color;
    setColorMode: (colorMode: Color) => void;
};

const ColorPreferencesContext = createContext<ColorPreferencesContextType | undefined>(undefined);

export const useColorPreferences = () => {
    const context = useContext(ColorPreferencesContext);

    if (!context) {
        throw new Error('useColorPreferences must be used within a ColorPreferencesProvider');
    }

    return context;
};

export const ColorPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
    const [colorMode, setColorMode] = useState<Color>('blue'); // Default color mode

    const [ismounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Retrieve color mode from localStorage after component mounts
        const storedColorMode = localStorage.getItem('colorMode') as Color;
        if (storedColorMode) {
            setColorMode(storedColorMode);
        }
        setIsMounted(true);
    }, []);


    const handleSetColorMode = (newColorMode: Color) => {
        localStorage.setItem('colorMode', newColorMode);
        setColorMode(newColorMode);
    };

    const value = {
        colorMode,
        setColorMode: handleSetColorMode,
    }

    if (!ismounted) return null;

    return (
        <ColorPreferencesContext.Provider value={value}>
            {children}
        </ColorPreferencesContext.Provider>
    );
};
