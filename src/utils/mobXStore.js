import React from "react";
import { MobXProviderContext } from "mobx-react";

export default function mobXStore() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return React.useContext(MobXProviderContext);
}
