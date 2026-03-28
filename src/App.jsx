import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Lab from './components/Lab';
import Timeline from './components/Timeline';
import Thinking from './components/Thinking';
import DataPulse from './components/DataPulse';
import Contact from './components/Contact';
import BlogPost from './components/BlogPost';
import AllPosts from './components/AllPosts';
import AllProjects from './components/AllProjects';
import ProjectPost from './components/ProjectPost';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Toggles from './components/Toggles';

// Extracted the single-page portfolio layout into a dedicated Home component.
function Home() {
  return (
    <>
      <Navbar />
      <main className="text-black dark:text-gray-200 transition-colors duration-300">
        <Hero />
        <Lab />
        <Timeline />
        <Thinking />
        <DataPulse />
        <Contact />
      </main>
    </>
  );
}

// Router boundary injecting the Home view and dynamic BlogPost sub-pages.
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Toggles />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectPost />} />
            <Route path="/post/:code" element={<BlogPost />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
