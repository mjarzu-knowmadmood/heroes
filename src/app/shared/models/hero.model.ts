export interface Hero {
  id: string;
  name: string;
}

export interface HeroUpsert {
  id: string | null;
  name: string;
}
