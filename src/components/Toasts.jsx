import { createContext, useCallback, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Success / error pop-ups used across the site and the admin panel.
const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

const ICON = { success: '✓', danger: '!', info: 'i' };

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const notify = useCallback((message, variant = 'success') => {
    const id = Date.now() + Math.random();
    setItems((list) => [...list.slice(-3), { id, message, variant }]);
  }, []);
  const close = (id) => setItems((list) => list.filter((t) => t.id !== id));
  return (
    <Ctx.Provider value={notify}>
      {children}
      <ToastContainer position="bottom-center" className="p-3 di-toasts" containerPosition="fixed">
        {items.map((t) => (
          <Toast key={t.id} onClose={() => close(t.id)} delay={t.variant === 'danger' ? 5000 : 3000} autohide className={`di-toast-${t.variant}`}>
            <Toast.Body className="d-flex align-items-center gap-2">
              <span className="di-toast-ic" aria-hidden="true">{ICON[t.variant] || 'i'}</span>
              <span className="flex-grow-1" role={t.variant === 'danger' ? 'alert' : 'status'}>{t.message}</span>
              <button type="button" className="btn-close btn-close-white ms-2" aria-label="Close" onClick={() => close(t.id)} />
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
}
