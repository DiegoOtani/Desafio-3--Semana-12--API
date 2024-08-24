export type ReviewType = {
  id: string;
  name: string;
  email: string;
  comment: string;
  services: number;
  locations: number;
  amenities: number;
  prices: number;
  food: number;
  room_comfort_quality: number;
  average: number;
  date_review: string;
  tour_id: string;
};

export const review: ReviewType = {
  id: "",
  name: "",
  email: "",
  comment: "",
  services: 0,
  locations: 0,
  amenities: 0,
  prices: 0,
  food: 0,
  room_comfort_quality: 0,
  average: 0,
  date_review: "",
  tour_id: "",
};