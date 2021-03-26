export type Location = {
  lat: number;
  lng: number;
}

export type OptionsMonth = {
  location: Location;
  date?: string;
}

export type OptionsRange = {
  location: Location;
  startDate: string;
  endDate: string;
}

export type CrimeSpot = {
  location: CrimeDataLocation;
  crimes: CrimeSummery[]
}

export type CrimeSummery = {
  id: number;
  category: string;
  outcome: string
  month: string;
  location: Location
}

export type CrimeDataLocation = { 
  latitude: number;
  street: {
    id: number;
    name: string;
  };
  longitude: number;
}

export type CrimeDataPoint = {
  category: string;
  location_type: string;
  location: CrimeDataLocation;
  context: string;
  outcome_status: {
    category: string;
    date: string;
  };
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
};
