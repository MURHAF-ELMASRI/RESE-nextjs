import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { makeStyles } from 'tss-react/mui';

const PitchIcon = new Icon({
  iconUrl:
    'https://www.citypng.com/public/uploads/preview/football-pitch-vector-icon-png-11650334091wcpj9wmvdn.png',
  iconSize: [30, 50],
  iconAnchor: [13, 41],
  popupAnchor: [0, -41],
});

interface Props {
  location: [number, number];
}

function Map(props: Props) {
  const { location } = props;

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={PitchIcon} position={location}></Marker>
    </MapContainer>
  );
}

export default memo(Map);

const useStyles = makeStyles()(() => ({}));
