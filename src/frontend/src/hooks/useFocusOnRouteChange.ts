import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage focus on route changes for accessibility
 * Moves focus to the main content area when navigating between pages
 */
export const useFocusOnRouteChange = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      mainRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return mainRef;
};
