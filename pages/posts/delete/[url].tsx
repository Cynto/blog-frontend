import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../../components/Header'), {
  ssr: false,
});
import BasicButton from '../../../components/BasicButton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ProcessingOverlay from '../../../components/ProcessingOverlay';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `https://bloggy-api-cynto.herokuapp.com/posts/${context.params.url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  if (!data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
    },
  };
}

const PostDelete = ({ post }: { post: any }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState<boolean>(false);
  const userObj = useSelector((state: any) => state.userObj);

  const handleDelete = async () => {
    setProcessing(true);
    const response = await fetch(`http://localhost:4000/posts/${post._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await response.json();

    // if post is deleted, redirect to posts page
    if (json.status === 204) {
      router.push('/posts');
    }
    setProcessing(false);
  };
  const cancel = () => {
    router.back();
  };

  useEffect(() => {
    if (!userObj.initial && !userObj.isAdmin) {
      router.push('/');
    }
  }, [userObj]);


  return (
    <>
      <ProcessingOverlay processing={processing} />
      <Header />
      <main className="pt-[4.6rem] h-screen flex justify-center items-center relative">
        <Image
          src="/backgrounds/delete_background.jpg"
          alt="Delete Background"
          layout="fill"
          className=""
          priority
        />

        <div className="max-w-[400px] grid justify-center justify-items-center p-8 z-10 bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-100 shadow-2xl">
          <h1 className="text-3xl font-header justify-self-center">
            Confirm Deletion
          </h1>
          <p className="py-1">This action cannot be undone.</p>
          <span className="pb-5">
            Post Title: <strong>{post.title}</strong>
          </span>
          <div className="flex gap-5 ">
            <BasicButton text={'Delete'} callback={handleDelete} />
            <BasicButton text={'Cancel'} callback={cancel} />
          </div>
        </div>
      </main>
    </>
  );
};

export default PostDelete;
