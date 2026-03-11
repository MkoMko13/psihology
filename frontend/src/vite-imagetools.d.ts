type VitePicture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

declare module './raw/doc1.jpg?w=640;1024;1200&format=webp;jpeg&as=picture' {
  const value: VitePicture;
  export default value;
}

declare module './raw/doc2.jpg?w=640;1024;1200&format=webp;jpeg&as=picture' {
  const value: VitePicture;
  export default value;
}

declare module './raw/doc3.jpg?w=640;1024;1200&format=webp;jpeg&as=picture' {
  const value: VitePicture;
  export default value;
}

declare module './raw/doc4.jpg?w=640;1024;1200&format=webp;jpeg&as=picture' {
  const value: VitePicture;
  export default value;
}

declare module './raw/doc5.jpg?w=640;1024;1200&format=webp;jpeg&as=picture' {
  const value: VitePicture;
  export default value;
}

declare module './raw/doc1.jpg?w=200&format=webp&as=url' {
  const value: string;
  export default value;
}

declare module './raw/doc2.jpg?w=200&format=webp&as=url' {
  const value: string;
  export default value;
}

declare module './raw/doc3.jpg?w=200&format=webp&as=url' {
  const value: string;
  export default value;
}

declare module './raw/doc4.jpg?w=200&format=webp&as=url' {
  const value: string;
  export default value;
}

declare module './raw/doc5.jpg?w=200&format=webp&as=url' {
  const value: string;
  export default value;
}

declare module '*.jpg?*as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*.jpg?*as=url' {
  const value: string;
  export default value;
}

declare module '*.jpeg?*as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*.jpeg?*as=url' {
  const value: string;
  export default value;
}

declare module '*.png?*as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*.png?*as=url' {
  const value: string;
  export default value;
}

declare module '*.webp?*as=picture' {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}

declare module '*.webp?*as=url' {
  const value: string;
  export default value;
}

declare module '*.jpg?*' {
  const value: unknown;
  export default value;
}

declare module '*.jpeg?*' {
  const value: unknown;
  export default value;
}

declare module '*.png?*' {
  const value: unknown;
  export default value;
}

declare module '*.webp?*' {
  const value: unknown;
  export default value;
}
