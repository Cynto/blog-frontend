import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });
import validateCreationForm from '../../vanillaTypescript/validateCreationForm';

const Create: NextPage = () => {
  const [errors, setErrors] = useState<
    | {
        value: String;
        msg: String;
        param: String;
        location: String;
      }[]
    | []
  >([]);
  const [content, setContent] = useState('');

  const userObj = useSelector((state: any) => state.userObj);
  const editorRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const title = data.title;
    const image = data.image || '';
    const tags = data.tags
      ? data.tags
      : {
          value: '',
        };
    const published = data.published || false;
    const featured = data.featured || false;

    console.log({
      title: title.value,
      image: image.value,
      tags: tags.value,
      published: published.value,
      featured: featured.value,
      content,
    });

    const response = await fetch(
      'https://bloggy-api-cynto.herokuapp.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: title.value,
          image: image.value,
          tags: tags.value.split(', '),
          published: published.value === 'true',
          featured: featured.value === 'true',
          content,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.post) {
      router.push(`/${json.post.url}`);
    } else {
      setErrors(json.errors);
    }
  };
  const inputClass =
    'text-slate-800 grid grid-cols-2 gap-4 mb-4 w-full p-3 bg-slate-100 border-[1px] dark:border-2  rounded-sm dark:border-slate-100 focus:outline-none focus:border-gray-900 dark:focus:border-red-800 ';
  const labelClass = 'text-lg';

  useEffect(() => {
    if (userObj === null) {
      router.push('/');
    }
  }, [userObj]);

  return (
    <>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="md:pt-32 md:pb-16 w-full grid content-center justify-center relative min-h-screen ">
        <Image
          src="/backgrounds/create_post_background.jpg"
          layout="fill"
          objectFit="cover"
          alt="background"
          priority
        />
        <form
          className="z-[1] blur-0 grid shadow lg:w-[700px] xl:w-[800px]  pt-10 px-10 pb-5  bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-100"
          onSubmit={(e) => {
            e.preventDefault();
            validateCreationForm(e.target, content, handleSubmit, setErrors);
          }}
          method="POST"
        >
          <h1 className="text-4xl font-bold pb-6">Create Blog Post</h1>
          <label htmlFor="title" className={labelClass}>
            Title <span>*</span>
            <input type="title" id="title" className={inputClass} required />
          </label>
          <label htmlFor="image" className={labelClass}>
            Image URL *
            <input type="text" id="image" className={inputClass} required />
          </label>
          <label htmlFor="content" className={labelClass}>
            Content <span>*</span>
            <Editor
              id="content"
              textareaName="content"
              apiKey="43kem55nzyn2unpp405bl6tbi63lr06vcg3u0169qhwe0xpr"
              onInit={(evt, editor: any) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
          </label>
          <label htmlFor="tags" className={`mt-5 ${labelClass}`}>
            Tags (Seperate tags with a comma and a space) *
            <input
              data-testid="tags-input"
              type="text"
              id="tags"
              className={inputClass}
            />
          </label>
          <div
            className="py-1 bg-white dark:bg-gray-900 grid-flow-row  grid justify-center mb-4"
            style={{
              gridTemplateColumns: '50%',
            }}
          >
            <h3 className="flex items-center justify-center text-center cursor-default text-xl font-normal">
              Publish on Creation
            </h3>
            <div className="bg-gray-200 grid grid-cols-2 auto-cols-max py-1 px-2 ">
              <div className="">
                <input
                  type="radio"
                  id="publishedTrue"
                  name="published"
                  value="true"
                  className="peer hidden"
                />
                <label
                  htmlFor="publishedTrue"
                  className="block cursor-pointer select-none  p-1  text-center text-slate-800 peer-checked:bg-white dark:peer-checked:bg-gray-900 dark:peer-checked:text-slate-100 peer-checked:font-bold "
                >
                  Yes
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="publishedFalse"
                  name="published"
                  value="false"
                  className="peer hidden"
                  defaultChecked
                />
                <label
                  htmlFor="publishedFalse"
                  className="block cursor-pointer select-none  p-1 text-center text-slate-800 peer-checked:bg-white dark:peer-checked:bg-gray-900 dark:peer-checked:text-slate-100 peer-checked:font-bold"
                >
                  {' '}
                  No
                </label>
              </div>
            </div>
          </div>
          <div
            className="py-1 bg-white dark:bg-gray-900 grid-flow-row  grid justify-center mb-4"
            style={{
              gridTemplateColumns: '50%',
            }}
          >
            <h3 className="flex items-center justify-center text-center cursor-default text-xl font-normal">
              Set as Featured Post
            </h3>
            <div className="bg-gray-200 grid grid-cols-2 auto-cols-max py-1 px-2 ">
              <div className="">
                <input
                  type="radio"
                  id="featuredTrue"
                  name="featured"
                  value="true"
                  className="peer hidden"
                />
                <label
                  htmlFor="featuredTrue"
                  className="block cursor-pointer select-none  p-1 text-center text-slate-800 peer-checked:bg-white dark:peer-checked:bg-gray-900 dark:peer-checked:text-slate-100 peer-checked:font-bold"
                >
                  Yes
                </label>
              </div>

              <div className="">
                <input
                  type="radio"
                  id="featuredFalse"
                  name="featured"
                  value="false"
                  className="peer hidden"
                  defaultChecked
                />

                <label
                  htmlFor="featuredFalse"
                  className="block cursor-pointer select-none  p-1 text-center text-slate-800 peer-checked:bg-white dark:peer-checked:bg-gray-900 dark:peer-checked:text-slate-100 peer-checked:font-bold"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {errors[0]?.msg !== '' ? (
            <ul className="mt-0">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 mt-0 mb-1">
                  {' '}
                  {error.msg}
                </li>
              ))}
            </ul>
          ) : null}

          <button
            type="submit"
            data-testid="create-post"
            className="mt-5 bg-gray-800 hover:bg-gray-900 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-800 text-slate-100 font-bold  rounded p-3 text-xl cursor-pointer"
          >
            Create Post
          </button>
        </form>
      </main>
    </>
  );
};

export default Create;
