export interface Produto {
    id?: number;
    title: string;
    description: string;
    price?: number;
    image: string;
    type?: string;
  }

export interface Tecnologia {
    title: string;
    description: string;
    image: string;
    rating: number;
    price?: number;
    id?: number;
    type: string;
  }