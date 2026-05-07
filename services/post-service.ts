import { MediaAsset, PostDraft, PostPreview } from '@/types/post';

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

export async function publishPost(draft: PostDraft) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    post: {
      ...previewTemplate,
      content: draft.content || previewTemplate.content,
      media: draft.media,
      audience: draft.audience,
      createdAt: 'Moments ago',
    },
  };
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
