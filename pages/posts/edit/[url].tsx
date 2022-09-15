import type { NextPage } from 'next';
import { useState, useRef, useEffect } from 'react';
import blogPostObjInterface from '../../../shared/interfaces/blogPostObj.interface';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../../components/Header'), {
  ssr: false,
});
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
import { validateCreationForm } from '../../../vanillaTypescript/formValidators';
import { useRouter } from 'next/router';
import ProcessingOverlay from '../../../components/ProcessingOverlay';

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

const EditPost: NextPage<{
  post: blogPostObjInterface;
}> = ({ post }) => {
  const router = useRouter();
  const userObj = useSelector((state: any) => state.userObj);

  const [content, setContent] = useState<string>(post.content);
  const [errors, setErrors] = useState<
    | {
        value: String;
        msg: String;
        param: String;
        location: String;
      }[]
    | []
  >([]);
  const [processing, setProcessing] = useState<boolean>(false);

  const editorRef = useRef(null);

  const inputClass =
    'text-slate-800 grid grid-cols-2 gap-4 mb-4 w-full p-3 bg-slate-100 border-[1px] dark:border-2  rounded-sm dark:border-slate-100 focus:outline-none focus:border-gray-900 dark:focus:border-red-800 ';
  const labelClass = 'text-lg';

  const handleSubmit = async (data: any) => {
    setProcessing(true);
    const title = data.title;
    const image = data.image;
    const tags = data.tags;
    let tagsArray = tags.value ? tags.value.split(',') : [];
    tagsArray = tagsArray.map((tag: string) => {
      return tag.trim();
    });
    const published = data.published || false;
    const featured = data.featured || false;

    const response = await fetch(
      `https://bloggy-api-cynto.herokuapp.com/posts/${post._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: title.value,
          image: image.value,
          tags: tagsArray,
          published: published.value === 'true',
          featured: featured.value === 'true',
          content: content,
        }),
      }
    );
    const dataResponse = await response.json();

    if (dataResponse.errors) {
      setErrors(dataResponse.errors);
      setProcessing(false);
    }
    if (response && response.status === 200 && dataResponse.post) {
      setErrors([]);
      router.push(`/${dataResponse.post.url}`);
      setProcessing(false);
    }
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
      <main className="relative md:pb-16 md:pt-32 grid justify-center">
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

            if (userObj.isAdmin) {
              validateCreationForm(e.target, content, handleSubmit, setErrors);
            }
          }}
          method="POST"
        >
          <h2 className="text-4xl font-bold pb-6">Update Blog Post</h2>
          <label htmlFor="title" className={labelClass}>
            Title *
            <input
              type="title"
              id="title"
              className={inputClass}
              defaultValue={post.title}
              required
            />
          </label>
          <label htmlFor="image" className={labelClass}>
            Image URL *
            <input
              type="text"
              id="image"
              className={inputClass}
              defaultValue={post.image}
              required
            />
          </label>
          <label htmlFor="content" className={labelClass}>
            Content *
            <Editor
              id="content"
              textareaName="content"
              apiKey="43kem55nzyn2unpp405bl6tbi63lr06vcg3u0169qhwe0xpr"
              onInit={(evt, editor: any) => (editorRef.current = editor)}
              initialValue={post.content}
              init={{
                height: 500,
                menubar: false,
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
          </label>
          <label htmlFor="tags" className="mt-5">
            Tags (Seperate tags with a comma and a space) *
            <input
              data-testid="tags-input"
              type="text"
              defaultValue={post.tags}
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
            <h3 className="flex text-center items-center justify-center cursor-default text-xl font-normal">
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
                  defaultChecked={post.published}
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
                  defaultChecked={!post.published}
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
            <h3 className="flex text-center items-center justify-center cursor-default text-xl font-normal">
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
                  defaultChecked={post.featured}
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
                  defaultChecked={!post.featured}
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
            Update Post
          </button>
        </form>
      </main>
    </>
  );
};

export default EditPost;
