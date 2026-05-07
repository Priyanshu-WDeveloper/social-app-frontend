export type AuthCredentials = {
  identifier: string;
  password: string;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};
