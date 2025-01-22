import React from 'react';
import { CircularProgressbar } from "react-circular-progressbar";

interface ProgressProps {
  progress: number;
}

const ProgressBar = React.memo(({ progress }: ProgressProps) => {


  return (
    <CircularProgressbar
      value={progress}
      styles={{
        root: { width: 20, flex: 1 },
        path: {
          stroke: '#7159c1',
        },
        trail: {
          stroke: '#A9A9A9',
        },
        text: {
          fill: '#000',
          fontSize: '12px',
          dominantBaseline: 'central',
          textAnchor: 'middle',
        },
      }}
      strokeWidth={14}
      className="mt-2"
    />
  );
});
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }