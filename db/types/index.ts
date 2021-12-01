export enum Gender {
  male = 'male',
  female = 'female',
  org = 'org',
}

export interface RawLaureate {
  id: string | number
  born?: string
  bornCity?: string
  bornCountry?: string
  bornCountryCode?: string
  died?: string
  diedCity?: string
  diedCountry?: string
  diedCountryCode?: string
  firstname: string
  gender: Gender
  prizes: RawPrize[]
  // Not applicable for insitutions
  surname?: string
}

export interface Laureate extends RawLaureate {
  id: number
  prizes: Prize[]
}

export interface RawPrize {
  affiliations?: Affiliation[]
  category: string
  motivation: string
  share: string | number
  year: string | number
}

export interface Prize extends RawPrize {
  share: number
  year: number
}

export interface Affiliation {
  city?: string
  country?: string
  name: string
}
