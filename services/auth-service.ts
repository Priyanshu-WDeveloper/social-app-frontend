import {
  AuthCredentials,
  SignupPayload,
  UserProfile,
} from '@/types/auth';
import { axiosInstance } from '../lib/axios';

const fakeProfile: UserProfile = {
  id: 'user-01',
  name: 'Avery Quinn',
  username: 'averyq',
  avatar: '/avatar.svg',
};

export async function login(payload: AuthCredentials) {
  const res = await axiosInstance.post('/api/auth/login', {
    identifier: payload.identifier,
    password: payload.password,
  });

  return res.data;
}

export async function signup(payload: SignupPayload) {
  const res = await axiosInstance.post('/api/auth/register', {
    email: payload.email,
    password: payload.password,
    fullName: payload.fullName,
    username: payload.username,
  });

  return res.data;
}

export async function sendResetLink(email: string) {
  const res = await axiosInstance.post('/api/auth/forgot-password', {
    email,
  });

  return res.data;
}

// export async function resetPassword(token: string, password: string) {
export async function resetPassword(password: string) {
  const res = await axiosInstance.post('/api/auth/reset-password', {
    password,
  });

  return res.data;
}
