import { createRoot } from 'react-dom/client'
import './index.css'
import "@fontsource/kalam";
import "@fontsource/yellowtail";
import "@fontsource/kaushan-script";
import App from './App.jsx'
import { ToastProvider } from './components/common/Toast';

createRoot(document.getElementById('root')).render(
    <ToastProvider>
      <App />
    </ToastProvider>
)