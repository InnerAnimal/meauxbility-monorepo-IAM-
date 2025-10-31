'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // pages that should default to dark theme
  const darkPages = ['/about-us', '/community', '/resources'];

  // set initial theme and active link
  useEffect(() => {
    const theme = darkPages.some((p) => pathname.includes(p)) ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [pathname]);

  // listen for scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // toggle mobile menu
  const toggleMenu = () => setMenuOpen((o) => !o);

  // close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/pages/about-us', label: 'About' },
    { href: '/pages/mobility-grants-programs', label: 'Programs' },
    { href: '/pages/community', label: 'Community' },
    { href: '/pages/resources', label: 'Resources' },
    { href: '/pages/get-involved', label: 'Connect' }
  ];

  return (
    <>
      <header
        id="nav"
        className={`nav${scrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="nav-container">
          <Link href="/" className="nav-logo" aria-label="Meauxbility Home">
            <picture>
              <source
                srcSet="https://cdn.shopify.com/s/files/1/0685/1654/4672/files/meauxbility_logo_540.webp?v=1760648661"
                type="image/webp"
              />
              <Image
                src="https://cdn.shopify.com/s/files/1/0685/1654/4672/files/meauxbility_logo_540.png?v=1760648662"
                alt="Meauxbility"
                width={180}
                height={180}
                priority
              />
            </picture>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-menu">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link${
                      pathname === href || (href === '/' && pathname === '/')
                        ? ' active'
                        : ''
                    }`}
                    aria-current={
                      pathname === href || (href === '/' && pathname === '/')
                        ? 'page'
                        : undefined
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pages/donate" className="nav-donate">
                  Impact
                </Link>
              </li>
            </ul>
          </nav>

          <button
            id="burger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className={`burger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        id="mobileMenu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="mobile-nav">
          {links.map(({ href, label }) => (
            <li className="mobile-item" key={href}>
              <Link
                href={href}
                className={`mobile-link${
                  pathname === href || (href === '/' && pathname === '/')
                    ? ' active'
                    : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/pages/donate" className="mobile-donate">
          Impact
        </Link>
      </nav>
    </>
  );
}
