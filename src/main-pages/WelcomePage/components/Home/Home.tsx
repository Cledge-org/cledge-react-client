// In a Next.js page or component file
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './home.module.scss'; // Import our SCSS module

export default function Home() {
  return (
    <div className="container-fluid main-background">
      <div className="gradient-overlay"></div>
      <div className="gradient-overlay"></div>

      <header className="d-flex justify-content-between align-items-center">
        <div className="logo">cledge.</div>
        <div>
          <button className="btn login-button">Login</button>
          <button className="btn sign-up-button">Sign Up</button>
        </div>
      </header>

      <main className="hero-section">
        <h1>Meet the Future of <br/>College Advising</h1>
        <p>Navigate the maze of college admissions with ease. From pinpointing your ideal college matches to crafting a standout application, our intelligent platform and advisors are your allies in unlocking the door to your educational future. Ready to transform your college journey? Dive in and discover the Cledge advantage today!</p>
        <div>
          <button className="btn sign-up-free-button">Sign Up Free</button>
          <button className="btn learn-more-button">Learn more</button>
        </div>
      </main>
    </div>
  );
}
