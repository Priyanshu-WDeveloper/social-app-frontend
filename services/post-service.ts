import { MediaAsset, PostDraft, PostPreview } from '@/types/post';
import { axiosInstance } from '../lib/axios';

const previewTemplate: PostPreview = {
  id: 'post-001',
  author: {
    name: 'Avery Quinn',
    username: 'averyq',
    avatar: '/avatar.svg',
  },
  content:
    'A clean space to share your ideas and connect with people who care about creativity and culture.',
  audience: 'Public',
  media: [],
  likes: 134,
  comments: 28,
  shares: 12,
  createdAt: 'Just now',
};
type PostDraftM = {
  content: string;
  media: MediaAsset[];
};
export async function fetchDraft() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    draft: {
      content: '',
      audience: 'public' as const,
      feeling: 'Happy',
      location: 'Remote',
      pollQuestion: '',
      scheduledAt: undefined,
      media: [],
      isDraft: true,
    },
  };
}

// export async function publishPost(draft: PostDraft) {
// export async function publishPost(draft: PostDraftM) {
//   const res = await axiosInstance.post('/api/posts/upload', {
//     content: draft.content,
//     media: draft.media,
//   });

//   return res.data;
// }

export async function publishPost(content: string, media: File[]) {
  const formData = new FormData();

  formData.append('content', content);

  media.forEach((file) => {
    formData.append('media', file);
  });

  const res = await axiosInstance.post('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

export async function getPosts() {
  const res = await axiosInstance.get('/api/posts');

  return res.data;
}

export function mockUploadMedia(file: File): Promise<MediaAsset> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url =
        typeof reader.result === 'string' ? reader.result : '';
      resolve({
        id: `${Date.now()}-${file.name}`,
        type: file.type.startsWith('video') ? 'video' : 'image',
        url,
      });
    };
    reader.readAsDataURL(file);
  });
}
