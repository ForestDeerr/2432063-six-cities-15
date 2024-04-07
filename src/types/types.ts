export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  host: Host;
  location: Location;

  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  images: string[];

  previewImage: string;
  cardBookmarks: string;
};

export type OffersType = OfferType[];

export type CityMap = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Host = {
  hostName: string;
  isPro: boolean;
  avatarUrl: string;
};

export type City = {
  name: string;
  location: Location;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: user;
}

export type Reviews = Review[];

export type user = {
userName: string;
avatarUrl: string;
isPro: boolean;
}

export type CityList = {
  Paris: string;
  Cologne: string;
  Brussels: string;
  Amsterdam: string;
  Hamburg: string;
  Dusseldorf: string;
};

