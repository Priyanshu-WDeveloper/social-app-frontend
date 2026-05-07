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
import { create } from 'zustand';

interface PostStore {
  open: boolean;
  step: number;
  content: string;
  audience: string;
  media: string[];

  setOpen: (open: boolean) => void;
  setStep: (step: number) => void;
  setContent: (content: string) => void;
  setAudience: (audience: string) => void;
  addMedia: (url: string) => void;
  removeMedia: (index: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  open: false,
  step: 1,
  content: '',
  audience: 'Public',
  media: [],

  setOpen: (open) => set({ open }),
  setStep: (step) => set({ step }),
  setContent: (content) => set({ content }),
  setAudience: (audience) => set({ audience }),

  addMedia: (url) =>
    set((state) => ({
      media: [...state.media, url],
    })),

  removeMedia: (index) =>
    set((state) => ({
      media: state.media.filter((_, i) => i !== index),
    })),
}));
