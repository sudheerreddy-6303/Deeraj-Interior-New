import { useCallback, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';

/**
 * Bootstrap confirm dialog. Usage:
 *   const [confirm, confirmEl] = useConfirm();
 *   if (await confirm({ title: 'Delete product?', body: '…', ok: 'Delete', danger: true })) { … }
 *   return <>{confirmEl}…</>;
 */
export default function useConfirm() {
  const [state, setState] = useState(null);
  const resolver = useRef(null);
  const confirm = useCallback((opts) => new Promise((resolve) => { resolver.current = resolve; setState(opts); }), []);
  const close = (v) => { setState(null); if (resolver.current) resolver.current(v); resolver.current = null; };
  const el = (
    <Modal show={!!state} onHide={() => close(false)} centered size="sm" className="di-modal">
      <Modal.Header closeButton className="border-0 pb-0"><Modal.Title as="h3" className="fs-5">{state && state.title}</Modal.Title></Modal.Header>
      {state && state.body && <Modal.Body className="pt-2">{state.body}</Modal.Body>}
      <Modal.Footer className="border-0">
        <button type="button" className="btn btn-outline" onClick={() => close(false)}>{(state && state.cancel) || 'Keep'}</button>
        <button type="button" className={'btn ' + (state && state.danger ? 'btn-danger' : 'btn-primary')} onClick={() => close(true)}>{(state && state.ok) || 'Confirm'}</button>
      </Modal.Footer>
    </Modal>
  );
  return [confirm, el];
}
