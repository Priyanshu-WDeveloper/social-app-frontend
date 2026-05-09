import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { axiosInstance } from '../../lib/axios';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const token = await result.user.getIdToken();

    const res = await axiosInstance.post('/api/auth/oauth', {
      token,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const facebookLogin = async () => {
  const result = await signInWithPopup(auth, facebookProvider);

  const token = await result.user.getIdToken();

  const { data } = await axiosInstance.post('/api/auth/oauth', {
    token,
  });

  return data;
};
