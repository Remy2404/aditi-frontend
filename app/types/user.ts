export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  address?: string;
  createdAt: Date;
  bio:string;
}