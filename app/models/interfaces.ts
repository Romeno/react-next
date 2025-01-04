export interface Produto {
  id?: number;
  title: string;
  description: string;
  price?: number;
  image: string;
}

export interface Tecnologia {
  title: string;
  description: string;
  image: string;
  rating: number;
  price?: number;
  id?: number;
}
