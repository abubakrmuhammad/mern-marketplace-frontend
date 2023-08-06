import { CircularProgress } from '@mui/material';

function DefaultLoader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '2rem',
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default DefaultLoader;
