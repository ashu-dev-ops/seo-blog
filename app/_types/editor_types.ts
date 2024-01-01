export interface UserType {
  _id: string;
  email: string;
  password: string;
  role: string;
  tags: string[];
  category: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  teamId: string;
  firstName: string;
  lastName: string;
  domain: string;
}

export interface CategoryType {
  name: string;
  slug: string;
  by?: UserType;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface TagsType {
  name: string;
  slug: string;
  by?: UserType;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}
