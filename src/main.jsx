import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import AOS from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import 'leaflet/dist/leaflet.css';
import { Toaster } from 'react-hot-toast';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>

      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <RouterProvider router={router}
          fallbackElement={<p>Loading...</p>}
        />
      </AuthProvider>
    </div>
  </StrictMode>,
)
