export type Variant = 'primary' | 'outline';
export type Size = 'sm' | 'md' | 'lg';

export const variants: Record<Variant, string> = {
  primary: `uppercase bg-secondary text-white rounded-full`,
  outline: `bg-secondary text-white rounded-lg`,
};

export const sizes: Record<Size, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-17 py-3 text-base',
  lg: 'px-9 py-3 text-lg',
};
