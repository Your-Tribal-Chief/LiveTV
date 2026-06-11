export interface Channel {
  id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
}

export interface Category {
  name: string;
  count: number;
}
