import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { mountPage, showDesignFor } from '../three/engine.js';
import { initReveal, initTabs, initHeroSlider } from './effects.js';

const TITLES = {
  home: 'Deeraj Interiors | Interior Design & Modular Furniture, Hyderabad',
  about: 'About Us | Deeraj Interiors',
  services: 'Services | Deeraj Interiors',
  factory: 'Modular Factory | Deeraj Interiors',
  projects: 'Our Projects | Deeraj Interiors',
  gallery: '3D Designs & Gallery | Deeraj Interiors',
  partner: 'Partner With Us | Deeraj Interiors',
  store: 'Online Store | Deeraj Interiors',
  contact: 'Contact Us | Deeraj Interiors'
};

/**
 * Attaches the 3D stages, scroll animations and page widgets once a page has rendered,
 * and removes them when the visitor leaves the page.
 */
export default function usePage(name) {
  const ref = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    document.title = TITLES[name] || TITLES.home;
    const root = ref.current;
    if (!root) return undefined;
    const cleanups = [mountPage(name), initReveal(root), initTabs(root), initHeroSlider(root)];
    return () => cleanups.forEach((f) => f && f());
  }, [name]);

  // gallery sub-links pick the matching 3D design category
  useEffect(() => { if (name === 'gallery') showDesignFor(hash); }, [name, hash]);

  return ref;
}
