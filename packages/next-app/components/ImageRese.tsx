import makeStyle from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { memo } from 'react';

interface Props {
  width: number;
  src: StaticImageData;
  className?: string;
}

function ImageRese(props: Props) {
  const { width, src, className } = props;
  const classes = useStyle();

  return (
    <div className={classNames(classes.container, className)} style={{ width }}>
      <Image src={src} objectFit="cover" />
    </div>
  );
}

export default memo(ImageRese);

const useStyle = makeStyle((theme) => ({
  container: {
    margin: '32px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
}));
