import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration to prevent clamping onto new route heights
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/experience/')) {
      // Navigated to a detail page -> always scroll to top (0, 0)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (pathname === '/') {
      // Navigated back to main portfolio home page
      const savedPos = sessionStorage.getItem('portfolio_home_scroll_y');
      const fromDetail = sessionStorage.getItem('portfolio_from_detail');

      if (savedPos !== null || fromDetail === 'true') {
        const targetY = savedPos !== null ? parseInt(savedPos, 10) : null;

        // Function to perform scroll restoration
        const restoreScroll = () => {
          if (targetY !== null && !isNaN(targetY)) {
            window.scrollTo({ top: targetY, behavior: 'instant' });
          } else {
            const expElement = document.getElementById('experience');
            if (expElement) {
              expElement.scrollIntoView({ behavior: 'instant' });
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }
        };

        // Execute immediate scroll restoration and retry across initial layout frames
        restoreScroll();
        const frameId = requestAnimationFrame(restoreScroll);
        const timer1 = setTimeout(restoreScroll, 50);
        const timer2 = setTimeout(() => {
          restoreScroll();
          // Clean up storage after restoration completes
          sessionStorage.removeItem('portfolio_from_detail');
          sessionStorage.removeItem('portfolio_home_scroll_y');
        }, 150);

        return () => {
          cancelAnimationFrame(frameId);
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [pathname]);

  return null;
}
