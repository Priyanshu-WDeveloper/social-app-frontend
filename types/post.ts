export type MediaAsset = {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
};

export type PostDraft = {
  content: string;
  audience: 'public' | 'friends' | 'private';
  feeling: string;
  location: string;
  pollQuestion: string;
  scheduledAt?: string;
  media: MediaAsset[];
  isDraft: boolean;
};

export type PostPreview = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  audience: string;
  media: MediaAsset[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
};
