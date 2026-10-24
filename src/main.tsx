import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silently intercept any remaining Vite HMR WebSocket connection errors
if (typeof window !== 'undefined') {
  const isViteWs = (args: any[]) => {
    return args.some((a) => {
      const msg = String(a?.message || a?.reason || a || '');
      return (
        msg.includes('WebSocket') ||
        msg.includes('websocket') ||
        msg.includes('[vite]') ||
        msg.includes('vite-hmr')
      );
    });
  };

  const origError = console.error;
  console.error = (...args) => {
    if (isViteWs(args)) return;
    origError.apply(console, args);
  };

  const origWarn = console.warn;
  console.warn = (...args) => {
    if (isViteWs(args)) return;
    origWarn.apply(console, args);
  };

  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event?.reason?.message || event?.reason || '');
    if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('[vite]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = String(event?.message || event?.error?.message || '');
    if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('[vite]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);

