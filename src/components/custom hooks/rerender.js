import React, { useState } from "react";

const Rerender = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export default Rerender;
