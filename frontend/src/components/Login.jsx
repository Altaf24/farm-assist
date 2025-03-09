import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

export default function Login() {
  return (
    <>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <ClerkSignUp />
      </div>
      <style>{`
        .signup-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 64px); /* Full height minus navbar height */
          margin-top: 64px; /* Pushes content below the navbar */
        }
      `}</style>
    </>
  );
}
