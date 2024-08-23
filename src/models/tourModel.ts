export type TourType = {
  id: string;
  name: string;
  city: string;
  initial_date: string;
  end_date: string;
  duration: number;
  price_per_person: number;
  peoples: number;
  max_people: number;
  min_age: number;
  overview: string;
  location: string;
  ulrImg: string;
}

export const tour: TourType = {
  id: "",
  name: "",
  city: "",
  initial_date: "",
  end_date: "",
  duration: 0,
  price_per_person: 0,
  peoples: 0,
  max_people: 0,
  min_age: 0,
  overview: "",
  location: "",
  ulrImg: "",
};
