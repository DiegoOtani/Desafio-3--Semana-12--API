export type Country = {
  id: string;
  name: string;
  continent: string;
  urlImg: string;
}

export type CountryUpdate = {
  name: string | undefined;
  continent: string | undefined;
  urlImg: string | undefined;
}