import { CSSProperties } from 'react';
import classes from './Switch.module.scss';

interface SwitchProps {
  id: string;
  value: boolean;
  label?: string;
  action: () => void;
  trackActiveColor?: string;
  trackInactiveColor?: string;
}

export default function Switch({
  id = 'switch',
  value,
  action,
  label,
  trackActiveColor,
  trackInactiveColor,
}: SwitchProps) {
  const style: any = {};
  if (trackActiveColor) {
    style['--track-active'] = trackActiveColor;
  }
  if (trackInactiveColor) {
    style['--track-inactive'] = trackInactiveColor;
  }
  return (
    <label htmlFor={id} className={classes['gui-switch']} style={style}>
      {label}
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={value}
        onChange={action}
      />
    </label>
  );
}
