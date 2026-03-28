import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NAV_ITEMS = [
  { key: 'nav.lab',          href: '#lab' },
  { key: 'nav.publications', href: '#publications' },
  { key: 'nav.trajectory',   href: '#timeline' },
  { key: 'nav.about',        href: '#thinking' },
  { key: 'nav.competencies', href: '#pulse' },
  { key: 'nav.contact',      href: '#contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#222] transition-colors duration-300"
        style={{ padding: '20px 0' }}
      >
        <div className="container-main flex items-center justify-between">

          {/* Desktop nav — hidden below lg */}
          <nav className="hidden lg:flex items-center" style={{ gap: '24px' }}>
            {NAV_ITEMS.map((item, idx) => (
              <React.Fragment key={item.key}>
                <a
                  href={item.href}
                  className="font-mono font-bold text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white hover:no-underline transition-all uppercase"
                  style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}
                >
                  {t(item.key)}
                </a>
                {idx < NAV_ITEMS.length - 1 && (
                  <span className="text-gray-300 dark:text-[#222] hidden xl:block" style={{ fontSize: '0.8rem' }}>/</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Spacer on mobile so hamburger is on the right */}
          <div className="lg:hidden" />

          {/* Hamburger button — mobile/tablet only */}
          <button
            className="lg:hidden flex flex-col cursor-pointer"
            style={{ gap: '5px', padding: '4px' }}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span
              className="block bg-black dark:bg-white transition-all duration-300"
              style={{
                width: '24px', height: '2px',
                transform: open ? 'rotate(45deg) translate(4px, 7px)' : 'none',
              }}
            />
            <span
              className="block bg-black dark:bg-white transition-all duration-300"
              style={{
                width: '24px', height: '2px',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block bg-black dark:bg-white transition-all duration-300"
              style={{
                width: '24px', height: '2px',
                transform: open ? 'rotate(-45deg) translate(4px, -7px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <div
        className="fixed inset-0 z-40 bg-white dark:bg-[#0a0a0a] flex flex-col transition-all duration-300 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          paddingTop: '80px',   /* clear the fixed header */
        }}
      >
        <nav className="container-main flex flex-col" style={{ gap: '32px', paddingTop: '48px' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={close}
              className="font-mono font-black text-black dark:text-white hover:text-accent dark:hover:text-accent uppercase transition-colors"
              style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
