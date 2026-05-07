import { create } from 'zustand';
import { PostDraft } from '@/types/post';

type PostState = {
  draft: PostDraft;
  setDraft: (draft: Partial<PostDraft>) => void;
  resetDraft: () => void;
};

const initialDraft: PostDraft = {
  content: '',
  audience: 'public',
  feeling: 'Excited',
  location: 'Home',
  pollQuestion: '',
  scheduledAt: undefined,
  media: [],
  isDraft: true,
};

export const usePostStore = create<PostState>((set) => ({
  draft: initialDraft,
  setDraft: (draft) =>
    set((state) => ({ draft: { ...state.draft, ...draft } })),
  resetDraft: () => set({ draft: initialDraft }),
}));
