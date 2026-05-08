// import ImageKit from 'imagekit-javascript';

// const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
// console.log('publicKey being sent:', publicKey); // if undefined, this is the bug

// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
// });

// export default imagekit;

// app/api/upload-auth/route.ts
import { getUploadAuthParams } from '@imagekit/next/server';

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  });
}
