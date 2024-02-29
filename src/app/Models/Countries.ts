export interface Countries {
  flags: {
    png: string;
    alt: string;
    svg: string;
  };

  capital: string[];

  name: {
    common: string;
    official: string;
  };
}
