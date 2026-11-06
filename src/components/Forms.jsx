import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useToast } from './Toasts.jsx';

// Website enquiry forms. Every submission is saved to MySQL (enquiries table) and shows
// up in Admin → Enquiries. Bootstrap validation styles + a success / error pop-up.

const PHONE_RE = /^[6-9]\d{9}$/;
const digits = (v) => String(v || '').replace(/\D/g, '').slice(-10);

function useEnquiry(type, fields) {
  const notify = useToast();
  const { pathname } = useLocation();
  const init = Object.fromEntries(fields.map((f) => [f.name, f.options ? (f.placeholderOption ? '' : f.options[0]) : '']));
  const [values, setValues] = useState(init);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const set = (name) => (e) => { setValues((v) => ({ ...v, [name]: e.target.value })); setErrors((er) => ({ ...er, [name]: '' })); };

  const validate = () => {
    const er = {};
    fields.forEach((f) => {
      const v = String(values[f.name] || '').trim();
      if (f.required && !v) er[f.name] = f.requiredMsg || `Please add your ${f.label.replace(' *', '').toLowerCase()}.`;
      else if (f.type === 'tel' && v && !PHONE_RE.test(digits(v))) er[f.name] = 'Please enter a valid 10-digit mobile number.';
      else if (f.type === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) er[f.name] = 'Please enter a valid email address.';
    });
    setErrors(er);
    return !Object.keys(er).length;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) { notify('Please check the highlighted fields.', 'danger'); return; }
    setBusy(true);
    const details = {};
    fields.forEach((f) => { if (!['name', 'phone', 'email', 'message'].includes(f.name) && values[f.name]) details[f.label.replace(' *', '')] = values[f.name]; });
    try {
      await api('/enquiries', { method: 'POST', body: { type, name: values.name, phone: values.phone, email: values.email || '', message: values.message || '', details, page: pathname } });
      setDone(values);
      notify('Thank you! We have received your request.', 'success');
    } catch (err) {
      notify(err.message || 'Could not send right now. Please try again or WhatsApp us.', 'danger');
    } finally {
      setBusy(false);
    }
  };
  return { values, errors, busy, done, set, submit };
}

function Field({ f, form, col = 'col-12' }) {
  const id = `${f.idPrefix}-${f.name}`;
  const err = form.errors[f.name];
  const common = { id, value: form.values[f.name], onChange: form.set(f.name), 'aria-invalid': !!err, 'aria-describedby': err ? id + '-err' : undefined };
  return (
    <div className={col}>
      <div className="field">
        <label htmlFor={id} className="form-label mb-0">{f.label}</label>
        {f.options ? (
          <select className={'form-select' + (err ? ' is-invalid' : '')} {...common}>
            {f.placeholderOption && <option value="">{f.placeholderOption}</option>}
            {f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : f.type === 'textarea' ? (
          <textarea className={'form-control' + (err ? ' is-invalid' : '')} placeholder={f.placeholder} {...common} />
        ) : (
          <input className={'form-control' + (err ? ' is-invalid' : '')} type={f.type || 'text'} placeholder={f.placeholder} autoComplete={f.autoComplete}
            inputMode={f.type === 'tel' ? 'tel' : undefined} {...common} />
        )}
        {err && <div className="invalid-feedback d-block" id={id + '-err'}>{err}</div>}
      </div>
    </div>
  );
}

const Spinner = () => <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />;

/* ---------- Home hero: free consultation ---------- */
const HERO_FIELDS = [
  { name: 'name', label: 'Full name', placeholder: 'Your name', autoComplete: 'name', required: true, idPrefix: 'h' },
  { name: 'phone', label: 'Mobile number', type: 'tel', placeholder: '10-digit mobile number', autoComplete: 'tel', required: true, idPrefix: 'h', requiredMsg: 'Please add your mobile number.' },
  { name: 'property', label: 'Property', options: ['2BHK', '3BHK', '4BHK', 'Villa', 'Independent house', 'Office'], idPrefix: 'h' },
  { name: 'need', label: 'I need', options: ['Full home', 'Kitchen', 'Wardrobes', 'TV unit', 'Renovation'], idPrefix: 'h' }
];
export function HeroForm({ layout = 'card' }) {
  const form = useEnquiry('consultation', HERO_FIELDS);
  if (layout === 'bar') {
    // horizontal "quick consultation" bar used by the Home hero
    return (
      <form className="hx-form" noValidate onSubmit={form.submit}>
        {form.done ? (
          <div className="ok w-100" role="status">Thank you, {form.done.name}. Our design team will call you within 1 hour to plan your free consultation.</div>
        ) : (
          <div className="row g-3 align-items-start">
            <div className="col-12 hx-form-head">
              <h2 className="hx-form-title">Get your free 3D design</h2>
              <span className="offer">10% off your first order</span>
              <p className="note mb-0">A designer calls you back within 1 hour.</p>
            </div>
            <Field f={HERO_FIELDS[0]} form={form} col="col-sm-6 col-lg-3" />
            <Field f={HERO_FIELDS[1]} form={form} col="col-sm-6 col-lg-3" />
            <Field f={HERO_FIELDS[2]} form={form} col="col-6 col-lg-2" />
            <Field f={HERO_FIELDS[3]} form={form} col="col-6 col-lg-2" />
            <div className="col-12 col-lg-2 hx-btn-col">
              <button className="btn btn-primary w-100" type="submit" disabled={form.busy} style={{ minHeight: 48 }}>
                {form.busy ? <><Spinner /> Sending…</> : 'Book free visit'}
              </button>
            </div>
          </div>
        )}
      </form>
    );
  }
  return (
    <form className="h-form" noValidate onSubmit={form.submit}>
      {form.done ? (
        <div className="ok" role="status">Thank you, {form.done.name}. Our design team will call you within 1 hour to plan your free consultation.</div>
      ) : (
        <div className="h-fields">
          <div>
            <span className="offer">10% off your first order</span>
            <h2>Get your free 3D design</h2>
            <p className="note">Tell us about your home. A designer will call you back within 1 hour.</p>
          </div>
          <div className="row g-3">
            <Field f={HERO_FIELDS[0]} form={form} />
            <Field f={HERO_FIELDS[1]} form={form} />
            <Field f={HERO_FIELDS[2]} form={form} col="col-6" />
            <Field f={HERO_FIELDS[3]} form={form} col="col-6" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={form.busy} style={{ width: '100%', minHeight: 52 }}>
            {form.busy ? <><Spinner /> Sending…</> : 'Book my free consultation'}
          </button>
          <p className="note" style={{ textAlign: 'center' }}>No spam · No obligation</p>
        </div>
      )}
    </form>
  );
}

/* ---------- Contact: request a quote ---------- */
const CONTACT_FIELDS = [
  { name: 'name', label: 'Full name *', autoComplete: 'name', required: true, idPrefix: 'c' },
  { name: 'phone', label: 'Phone number *', type: 'tel', autoComplete: 'tel', required: true, idPrefix: 'c', requiredMsg: 'Please add your phone number.' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', idPrefix: 'c' },
  { name: 'property', label: 'Property type', options: ['2BHK', '3BHK', '4BHK', 'Villa', 'Independent house', 'Office / commercial'], idPrefix: 'c' },
  { name: 'centre', label: 'Preferred centre', options: ['Suchitra', 'Nanakramguda', 'Factory visit (Medchal)'], idPrefix: 'c' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Rooms, budget, timeline…', idPrefix: 'c' }
];
export function ContactForm() {
  const form = useEnquiry('quote', CONTACT_FIELDS);
  return (
    <form className="form" noValidate onSubmit={form.submit}>
      {form.done ? (
        <div className="ok" role="status">Thank you. Your quote request has been received. We will contact you on WhatsApp or email shortly.</div>
      ) : (
        <>
          <div><p className="eyebrow">Request a quote</p><h2>Tell us about your space</h2></div>
          <div className="row g-3">
            <Field f={CONTACT_FIELDS[0]} form={form} col="col-sm-6" />
            <Field f={CONTACT_FIELDS[1]} form={form} col="col-sm-6" />
            <Field f={CONTACT_FIELDS[2]} form={form} />
            <Field f={CONTACT_FIELDS[3]} form={form} col="col-sm-6" />
            <Field f={CONTACT_FIELDS[4]} form={form} col="col-sm-6" />
            <Field f={CONTACT_FIELDS[5]} form={form} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={form.busy} style={{ minHeight: 52 }}>
            {form.busy ? <><Spinner /> Sending…</> : 'Request a quote'}
          </button>
          <p className="note">We reply on WhatsApp or email within 1–2 business days.</p>
        </>
      )}
    </form>
  );
}

/* ---------- Modular Factory: B2B collaboration ---------- */
const FACTORY_FIELDS = [
  { name: 'name', label: 'Your Name *', placeholder: 'Full name', autoComplete: 'name', required: true, idPrefix: 'mf' },
  { name: 'company', label: 'Company Name', placeholder: 'Company / Studio', autoComplete: 'organization', idPrefix: 'mf' },
  { name: 'role', label: 'Your Role', placeholderOption: 'Select Role', options: ['Architect', 'Interior Designer', 'Builder / Developer', 'Business Associate', 'Homeowner'], idPrefix: 'mf' },
  { name: 'projectType', label: 'Project Type', placeholderOption: 'Select Type', options: ['Residential Villa', 'Apartment Complex', 'Commercial Office', 'Retail / Showroom', 'Hospitality'], idPrefix: 'mf' },
  { name: 'phone', label: 'Phone *', type: 'tel', placeholder: '+91 XXXXX XXXXX', autoComplete: 'tel', required: true, idPrefix: 'mf', requiredMsg: 'Please add your phone number.' },
  { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '+91 XXXXX XXXXX', idPrefix: 'mf' },
  { name: 'volume', label: 'Expected Volume', placeholder: 'e.g. 10 units, 1 villa', idPrefix: 'mf' },
  { name: 'location', label: 'Your Location', placeholder: 'City / Area', idPrefix: 'mf' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your project requirements...', idPrefix: 'mf' }
];
export function FactoryForm() {
  const form = useEnquiry('collaboration', FACTORY_FIELDS);
  const v = form.done;
  const wa = v ? 'https://wa.me/919000700930?text=' + encodeURIComponent(
    'Hi Deeraj Modulars, I would like to request a collaboration.\nName: ' + v.name + (v.company ? '\nCompany: ' + v.company : '') + (v.role ? '\nRole: ' + v.role : '')
    + (v.projectType ? '\nProject type: ' + v.projectType : '') + '\nPhone: ' + v.phone + (v.volume ? '\nExpected volume: ' + v.volume : '')
    + (v.location ? '\nLocation: ' + v.location : '') + (v.message ? '\nMessage: ' + v.message : '')) : '';
  return (
    <form className="form" noValidate onSubmit={form.submit}>
      {v ? (
        <div>
          <div className="ok" role="status">Thank you. Our team will reach out within 24 hours.</div>
          <a className="btn btn-wa" href={wa} style={{ marginTop: 14, width: '100%' }}>Also send it on WhatsApp</a>
        </div>
      ) : (
        <>
          <div className="row g-3">
            {FACTORY_FIELDS.map((f) => <Field key={f.name} f={f} form={form} col={f.type === 'textarea' ? 'col-12' : 'col-sm-6'} />)}
          </div>
          <button className="btn btn-primary" type="submit" disabled={form.busy} style={{ minHeight: 52 }}>
            {form.busy ? <><Spinner /> Sending…</> : 'Request Collaboration'}
          </button>
        </>
      )}
    </form>
  );
}
