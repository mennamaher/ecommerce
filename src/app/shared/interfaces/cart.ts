export interface cart
{
  status: string;
  numOfCartItems: number;
  data: Data;
}

interface Data{
  _id: string;
  cartOwner: string;
  products: Product2[];
  createAt: string;
  updatedAt: string;
  _v:number;
  totalCartPrice: number;
}

interface Product2{
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product
{

  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  }

  interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string

  }

