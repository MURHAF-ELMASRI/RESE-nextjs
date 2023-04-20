import Image, { StaticImageData } from 'next/image';
import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  maxWidth?: number;
  src: StaticImageData;
  className?: string;
}

function ImageRese(props: Props) {
  const { maxWidth, src, className } = props;
  const { classes,cx } = useStyles();

  return (
    <div className={cx(classes.container, className)} style={{ maxWidth }}>
      <Image src={src} objectFit="cover" />
    </div>
  );
}

export default memo(ImageRese);

const useStyles = makeStyles()(() => ({
  container: {
    margin: '32px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));
