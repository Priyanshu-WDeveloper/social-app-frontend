import {
  AuthCredentials,
  SignupPayload,
  UserProfile,
} from '@/types/auth';

const fakeProfile: UserProfile = {
  id: 'user-01',
  name: 'Avery Quinn',
  username: 'averyq',
  avatar: '/avatar.svg',
};

export async function login(payload: AuthCredentials) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (payload.password.length < 8) {
    throw new Error('Invalid credentials');
  }

  return { user: fakeProfile, token: 'mock-session-token' };
}

export async function signup(payload: SignupPayload) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    user: {
      ...fakeProfile,
      name: payload.fullName,
      username: payload.username,
    },
    token: 'mock-session-token',
  };
}

export async function sendResetLink(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: `Reset link sent to ${email}` };
}

export async function resetPassword(token: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true, message: 'Password updated successfully' };
}
