import { memo, ReactElement } from "react";

export default memo(Maybe);

function Maybe(props: { isRendered: boolean; children: ReactElement }){
  const { children, isRendered } = props;

  return isRendered ? children : null;
}
