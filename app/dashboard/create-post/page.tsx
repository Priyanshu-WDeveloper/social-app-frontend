// import CreatePostForm from '@/components/post/create-post-form';
// import PostPreview from '@/components/post/post-preview';
import Card from '@/components/ui/card';

export default function CreatePostPage() {
  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.9fr]">
      <div className="space-y-6">
        <Card className="p-6 bg-slate-900/90">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
              Create post
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Share your story with the community.
            </h1>
            <p className="text-slate-400">
              Build your post, add media, schedule it, and preview how
              it will look live.
            </p>
          </div>
        </Card>
        {/* <CreatePostForm /> */}
      </div>
      <div className="space-y-6">
        <Card className="p-6 bg-slate-900/90">
          <h2 className="text-xl font-semibold text-white">
            Live preview
          </h2>
          <p className="mt-2 text-slate-400">
            Watch content update in real time as you type and upload
            media.
          </p>
        </Card>
        {/* <PostPreview /> */}
      </div>
    </div>
  );
}
