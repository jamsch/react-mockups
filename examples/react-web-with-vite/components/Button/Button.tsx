import type { HTMLAttributes } from 'react';

const colors = {
  primary: '#0070f3',
  secondary: '#f5f5f5',
};

const sizes = {
  small: '1.5rem',
  regular: '2rem',
  medium: '2.25rem',
  large: '3rem',
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color: keyof typeof colors;
  title: string;
  size?: keyof typeof sizes;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        borderRadius: '0.25rem',
        backgroundColor: colors[props.color],
        fontSize: sizes[props.size || 'small'],
      }}
    >
      {props.title}
    </button>
  );
}
