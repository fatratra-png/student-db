export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  created_at: Date;
}

export interface StudentInput {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}
