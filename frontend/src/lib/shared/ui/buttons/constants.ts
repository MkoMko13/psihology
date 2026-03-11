export type Variant = 'primary' | 'outline';

export const variants: Record<Variant, string> = {
  primary: `
		bg-secondary text-white
    py-1 px-8
    rounded-lg
`,
  outline: `
		bg-secondary text-white
		py-1 px-8
		rounded-lg
`,
};