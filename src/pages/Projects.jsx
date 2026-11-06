import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';
import { FilterTabs, ProjectGrid } from '../components/Lists.jsx';

// Projects page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Projects() {
  const ref = usePage('projects');
  return (
    <div ref={ref} className="page" id="p-projects" data-page="projects">
      <section>
        <div className="wrap">
          <div className="hero3d">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / Our Projects"}
              </span>
              <p className="eyebrow" style={{ marginTop: "18px" }}>Our projects</p>
              <h1 className="h1">
                {"Transforming spaces with "}
                <em className="hl">{"elegance & style"}</em>
              </h1>
              <p className="lead">
                Apartments, independent homes and kitchens across Hyderabad and Andhra Pradesh — from My Home Tarkshaya in Kokapet to NCL Sindhu in Kompally.
              </p>
            </div>
            <div className="stage" id="st-projects">
              <div className="s-load">Loading 3D projects…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D · our apartment projects
              </div>
              <div className="s-cap">
                {"Apartment communities we have "}
                <b>worked in</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "64px" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Completed work</p>
              <h2 className="h2">Recent projects</h2>
            </div>
            <FilterTabs group="projects" />
          </div>
          <ProjectGrid />
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">YouTube shorts</p>
              <h2 className="h2">
                {"Quick glimpses "}
                <span className="hl">of our work</span>
              </h2>
            </div>
            <a className="btn btn-outline" href="https://www.youtube.com/">Watch on YouTube</a>
          </div>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
            <div className="col">
              <div className="card">
                <h3>We build lives with the best interiors</h3>
                <p>How we transform homes.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>Wall elevation with Helios stone</h3>
                <p>Premium stone elevations.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>Modular work with multi-boring</h3>
                <p>Precision in our factory.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>From concept to creation</h3>
                <p>Ideas becoming homes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
