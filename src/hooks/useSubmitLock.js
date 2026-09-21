import { useRef, useState } from 'react';

export default function useSubmitLock() {
  const pending = useRef(false);
  const [loading, setLoading] = useState(false);
  const beginSave = () => {
    if (pending.current) return false;
    pending.current = true;
    setLoading(true);
    return true;
  };
  const finishSave = () => {
    pending.current = false;
    setLoading(false);
  };
  return { loading, beginSave, finishSave };
}
