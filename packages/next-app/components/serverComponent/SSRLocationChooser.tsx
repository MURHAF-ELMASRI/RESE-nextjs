import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Coord } from '@rese/common/types/Coord';
import useBoolean from 'hooks/useBoolean';
import { Icon, Map } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React, { useCallback, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { makeStyles } from 'tss-react/mui';
import ButtonRese from '../ButtonRese';
import TextFieldRese from '../TextFieldRese';


interface Props {
  submit: (value: Coord) => void;
  name: string;
  title: string;
  value: Coord;
  color?: 'primary' | 'secondary';
}

const DefaultIcon = new Icon({
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
  iconAnchor: [12, 41],
});

export default React.memo(LocationChooser)

function LocationChooser(props: Props) {
  const { submit, color="primary", title, value } = props;
  const { isOpen, open, close } = useBoolean();

  return (
    <Box width="100%" height="100%">

      <TextFieldRese
        name=""
        title={title}
        value={`${value.lat}, ${value.lng}`}
        variant="outlined"
        iconClick={open}
        icon="mdi:map-marker"
        color={color}
      />
      <Dialog open={isOpen} onClose={close}>
        <Component close={close} location={value} submit={submit}></Component>
      </Dialog>
    </Box>
  );
}

interface DialogProps {
  location: Coord;
  submit: (value: Coord) => void;
  close: () => void;
}

const Component = (props: DialogProps) => {
  const { submit, close } = props;
  const [location, setLocation] = useState<Coord>(props.location);
  const { classes } = useStyles();
  const mapRef = useRef<Map>(null);

  const whenReady = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  const chooseLocation = useCallback((coord: Coord) => setLocation(coord), []);

  const handleSubmit = useCallback(() => {
    close();
    submit(location);
  }, [close, location, submit]);

  return (
    <>
      <DialogTitle>Choose Location</DialogTitle>
      <DialogContent>
        <Box width={500} height={600} className={classes.map}>
          <MapContainer
            ref={mapRef}
            center={location}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            whenReady={whenReady}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker icon={DefaultIcon} position={location}></Marker>
            <MapConfig onClick={chooseLocation} />
          </MapContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonRese onClick={close} label="Close" color="gray" />
        <ButtonRese onClick={handleSubmit} label="Submit" />
      </DialogActions>
    </>
  );
};

const MapConfig = (props: { onClick: (x: Coord) => void }) => {
  useMapEvents({
    click(e) {
      props.onClick(e.latlng);
    },
  });
  return null;
};

const useStyles = makeStyles()((theme) => ({
  map: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
  },
}));
