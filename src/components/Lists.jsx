import { useSyncExternalStore } from 'react';

// Projects and gallery photos with filter tabs. The tabs and the grid sit in different
// parts of the page, so they share the selected filter through this tiny store.
const filters = { projects: 'all', photos: 'all' };
const listeners = new Set();
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const setFilter = (group, value) => { filters[group] = value; listeners.forEach((fn) => fn()); };
const useFilter = (group) => useSyncExternalStore(subscribe, () => filters[group]);

const TABS = {
  projects: [['all', 'All'], ['apartment', 'Apartments'], ['home', 'Independent homes'], ['kitchen', 'Kitchens']],
  photos: [['all', 'All'], ['bedroom', 'Bedrooms'], ['living', 'Living rooms'], ['kitchen', 'Kitchens'], ['wardrobe', 'Wardrobes']]
};

export const PROJECTS = [
  { name: 'My Home Tarkshaya', place: 'Kokapet, Hyderabad', scope: 'Apartment interiors', type: 'apartment' },
  { name: 'NSL East County', place: 'Uppal, Hyderabad', scope: 'Apartment interiors', type: 'apartment' },
  { name: 'NCL Sindhu', place: 'Kompally, Hyderabad', scope: 'Apartment interiors', type: 'apartment' },
  { name: 'Mr. K. Raju’s independent home', place: 'Bhimavaram, Andhra Pradesh', scope: 'Complete home makeover', type: 'home' },
  { name: 'Mr. Krishna Murthy & Mrs. Divya’s home', place: 'Alwal, Hyderabad', scope: 'Complete home interiors', type: 'home' },
  { name: 'Beautifully crafted modular kitchens', place: 'Alwal, Hyderabad', scope: 'Modular kitchen', type: 'kitchen' }
];

export const PHOTOS = [
  { type: 'bedroom', file: 'bedroom-1', caption: 'Master bedroom' },
  { type: 'kitchen', file: 'kitchen-1', caption: 'L-shaped kitchen' },
  { type: 'living', file: 'living-1', caption: 'TV unit with display' },
  { type: 'wardrobe', file: 'wardrobe-1', caption: 'Floor-to-ceiling wardrobe' },
  { type: 'bedroom', file: 'bedroom-3', caption: 'Upholstered headboard wall' },
  { type: 'kitchen', file: 'kitchen-2', caption: 'Kitchen with breakfast counter' },
  { type: 'living', file: 'living-2', caption: 'Marble-finish TV wall' },
  { type: 'wardrobe', file: 'wardrobe-2', caption: 'Sliding wardrobe & study' },
  { type: 'bedroom', file: 'bedroom-4', caption: 'Bedroom with window seat' }
];

export function FilterTabs({ group }) {
  const current = useFilter(group);
  return (
    <div className="tabs" role="group" aria-label={group === 'projects' ? 'Filter projects' : 'Filter photos'}>
      {TABS[group].map(([value, label]) => (
        <button key={value} type="button" aria-pressed={current === value} onClick={() => setFilter(group, value)}>{label}</button>
      ))}
    </div>
  );
}

export function ProjectGrid() {
  const f = useFilter('projects');
  return (
    <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      {PROJECTS.filter((p) => f === 'all' || p.type === f).map((p) => (
        <div className="col" key={p.name}>
          <article className="pcard h-100">
            <div className="ph ph-empty"><span className="tag">Add project photo</span></div>
            <div className="body">
              <span className="eyebrow" style={{ fontSize: 11 }}>{p.place}</span>
              <h3>{p.name}</h3>
              <p>{p.scope}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export function PhotoGrid() {
  const f = useFilter('photos');
  return (
    <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      {PHOTOS.filter((p) => f === 'all' || p.type === f).map((p) => (
        <div className="col" key={p.file}>
          <div className="ph" style={{ aspectRatio: '3/2' }}>
            <img src={`/img/${p.file}.jpg`} alt={`${p.caption} by Deeraj Interiors`} loading="lazy" />
            <span className="cap">{p.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
