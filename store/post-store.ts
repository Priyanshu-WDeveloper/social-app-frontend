// import { create } from 'zustand';
// import { PostDraft } from '@/types/post';

// type PostState = {
//   draft: PostDraft;
//   setDraft: (draft: Partial<PostDraft>) => void;
//   resetDraft: () => void;
// };

// const initialDraft: PostDraft = {
//   content: '',
//   audience: 'public',
//   feeling: 'Excited',
//   location: 'Home',
//   pollQuestion: '',
//   scheduledAt: undefined,
//   media: [],
//   isDraft: true,
// };

// export const usePostStore = create<PostState>((set) => ({
//   draft: initialDraft,
//   setDraft: (draft) =>
//     set((state) => ({ draft: { ...state.draft, ...draft } })),
//   resetDraft: () => set({ draft: initialDraft }),
// }));

// import { create } from 'zustand';

// interface PostStore {
//   open: boolean;
//   step: number;
//   content: string;
//   audience: string;
//   media: string[];

//   setOpen: (open: boolean) => void;
//   setStep: (step: number) => void;
//   setContent: (content: string) => void;
//   setAudience: (audience: string) => void;
//   addMedia: (url: string) => void;
//   removeMedia: (index: number) => void;
// }

// export const usePostStore = create<PostStore>((set) => ({
//   open: false,
//   step: 1,
//   content: '',
//   audience: 'Public',
//   media: [],

//   setOpen: (open) => set({ open }),
//   setStep: (step) => set({ step }),
//   setContent: (content) => set({ content }),
//   setAudience: (audience) => set({ audience }),

//   addMedia: (url) =>
//     set((state) => ({
//       media: [...state.media, url],
//     })),

//   removeMedia: (index) =>
//     set((state) => ({
//       media: state.media.filter((_, i) => i !== index),
//     })),
// }));

import { create } from 'zustand';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif';
}

interface PostStore {
  open: boolean;
  step: number;

  content: string;
  audience: 'public' | 'friends' | 'private';
  feeling: string;
  location: string;
  pollQuestion: string;
  scheduledAt: string;
  media: MediaItem[];

  setOpen: (open: boolean) => void;
  setStep: (step: number) => void;

  setContent: (content: string) => void;
  setAudience: (audience: 'public' | 'friends' | 'private') => void;
  setFeeling: (feeling: string) => void;
  setLocation: (location: string) => void;
  setPollQuestion: (pollQuestion: string) => void;
  setScheduledAt: (scheduledAt: string) => void;

  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;

  resetPost: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  open: false,
  step: 1,

  content: '',
  audience: 'public',
  feeling: '',
  location: '',
  pollQuestion: '',
  scheduledAt: '',
  media: [],

  setOpen: (open) => set({ open }),
  setStep: (step) => set({ step }),

  setContent: (content) => set({ content }),
  setAudience: (audience) => set({ audience }),
  setFeeling: (feeling) => set({ feeling }),
  setLocation: (location) => set({ location }),
  setPollQuestion: (pollQuestion) => set({ pollQuestion }),
  setScheduledAt: (scheduledAt) => set({ scheduledAt }),

  addMedia: (media) =>
    set((state) => ({
      media: [...state.media, media],
    })),

  removeMedia: (id) =>
    set((state) => ({
      media: state.media.filter((item) => item.id !== id),
    })),

  resetPost: () =>
    set({
      content: '',
      audience: 'public',
      feeling: '',
      location: '',
      pollQuestion: '',
      scheduledAt: '',
      media: [],
      step: 1,
    }),
}));
