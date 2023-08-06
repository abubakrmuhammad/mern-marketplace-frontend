import { useMemo, useState } from 'react';

function useLoading(initialValue = false) {
  const [loading, setLoading] = useState(initialValue);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading(prev => !prev);

  const loader = useMemo(
    () => ({
      startLoading,
      stopLoading,
      toggleLoading,
    }),
    [],
  );

  return [loading, loader];
}

export default useLoading;
