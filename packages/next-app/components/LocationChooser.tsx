import dynamic from 'next/dynamic';

const LocationChooser = dynamic(
  () => import('components/serverComponent/SSRLocationChooser'),
  { ssr: false }
);

export default LocationChooser;
