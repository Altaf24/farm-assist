import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = "pk_test_ZXhjaXRlZC1kcnVtLTU4LmNsZXJrLmFjY291bnRzLmRldiQ"; // Replace with your key

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Define the appearance object for customizing Clerk components
const appearance = {
  variables: {
    colorPrimary: '#611BBD', // Custom primary color (e.g., purple)
    colorText: '#333',       // Text color
    fontFamily: 'Inter, sans-serif', // Custom font
  },
  elements: {
    formButtonPrimary: {     // Style the primary button
      backgroundColor: '#611BBD',
      color: '#fff',
      fontSize: '14px',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#49247A', // Darker shade on hover
      },
    },
  },
  layout: {
    socialButtonsPlacement: 'bottom', // Place social buttons below the form
    logoPlacement: 'inside',          // Position the logo inside the form
  },
};

function ClerkProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      afterSignInUrl="/"
      afterSignOutUrl="/"
      appearance={appearance} // Add the appearance prop here
    >
      {children}
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithNavigate>
        <App />
      </ClerkProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);