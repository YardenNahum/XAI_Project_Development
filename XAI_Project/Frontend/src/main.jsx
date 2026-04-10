import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import AboutPage from '../Components/Pages/AboutPage.jsx';
import FinalPage from '../Components/Pages/FinalPage.jsx';
import DomainPage from '../Components/Pages/SystemsPage.jsx';
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // Redirects the root path (/) to the about page
        index: true,
        element: <Navigate to="/about" replace />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "thank-you",
        element: <FinalPage />
      },
      {
        path: ":domainId",
        element: <DomainPage />
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
