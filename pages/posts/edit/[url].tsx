import type { NextPage } from 'next';
import { useState, useRef, useEffect } from 'react';
import blogPostObjInterface from '../../../shared/interfaces/blogPostObj.interface';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../../components/Header'), {
  ssr: false,
});
import useUserObject from '../../../hooks/useUserObject';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';
const { useRouter } = require('next/router');

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:4000/posts/${context.params.url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

const EditForm: NextPage<{
  post: blogPostObjInterface;
}> = ({ post }) => {
  const router = useRouter();
  const userHookObject = useUserObject();
  const { userObj } = userHookObject;

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

  const editorRef = useRef(null);

  const inputClass =
    'text-slate-800 grid grid-cols-2 gap-4 mb-4 w-full p-3 bg-slate-100 border-[1px] dark:border-2  rounded-sm dark:border-slate-100 focus:outline-none focus:border-gray-900 dark:focus:border-red-800 ';
  const labelClass = 'text-lg';

  const validateFields = (data: any) => {
    let errorsArr: {
      value: String;
      msg: String;
      param: String;
      location: String;
    }[] = [];
    const title = data.title;
    const image = data.image;
    const tags = data.tags;
    const published = data.published;
    const featured = data.featured;

    if (!title.value && !errorsArr.find((e) => e.param === 'title')) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Title is required',
          value: '',
          param: 'title',
          location: 'body',
        },
      ];
    } else if (
      title.value.length > 50 &&
      !errorsArr.find((e) => e.param === 'title')
    ) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Title must have 50 or less characters',
          value: '',
          param: 'title',
          location: 'body',
        },
      ];
    } else if (
      title.value.length < 5 &&
      !errorsArr.find((e) => e.param === 'title')
    ) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Title must have 5 or more characters',
          value: '',
          param: 'title',
          location: 'body',
        },
      ];
    }
    if (!image.value && !errorsArr.find((e) => e.param === 'image')) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Image is required',
          value: '',
          param: 'image',
          location: 'body',
        },
      ];
    }
    function isUrl(s: string) {
      var regexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }
    if (!isUrl(image.value) && !errorsArr.find((e) => e.param === 'image')) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Image URL must be valid',
          value: '',
          param: 'image',
          location: 'body',
        },
      ];
    }
    if (content.length < 10 || content.length > 10000) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'Content must be between 10 and 10000 characters',
          value: '',
          param: 'content',
          location: 'body',
        },
      ];
    }

    let tagsArray = tags.value ? tags.value.split(',') : [];
    tagsArray = tagsArray.map((tag: string) => {
      return tag.trim();
    });

    if (
      (tagsArray.length === 0 || tagsArray.length > 20) &&
      !errorsArr.find((error) => error.param === 'tags')
    ) {
      errorsArr = [
        ...errorsArr,
        {
          msg: 'There must be between 1 and 20 tags',
          value: '',
          param: 'tags',
          location: 'body',
        },
      ];
    }
    if (!errorsArr.find((error) => error.param === 'tags')) {
      if (
        tagsArray.find((tag: string) => {
          if (tag.length > 20) return true;
        }) ||
        tagsArray.find((tag: string) => {
          if (tag.length < 4) return true;
        })
      ) {
        errorsArr = [
          ...errorsArr,
          {
            msg: 'Each tag must have between 4 and 20 characters',
            value: '',
            param: 'tags',
            location: 'body',
          },
        ];
      }
    }

    if (errorsArr.length > 0) {
      setErrors(errorsArr);
    } else {
      setErrors([]);
      handleSubmit(data);
    }
  };

  const handleSubmit = async (data: any) => {
    const title = data.title;
    const image = data.image;
    const tags = data.tags;
    let tagsArray = tags.value ? tags.value.split(',') : [];
    tagsArray = tagsArray.map((tag: string) => {
      return tag.trim();
    });
    const published = data.published || false;
    const featured = data.featured || false;

    const response = await fetch(`http://localhost:4000/posts/${post._id}`, {
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
    });
    const dataResponse = await response.json();
    console.log(dataResponse);
    if (dataResponse.errors) {
      setErrors(dataResponse.errors);
    }
    if (response && response.status === 200) {
      setErrors([]);
      router.push(`/${dataResponse.post.url}`);
    }
  };

  useEffect(() => {}, [post]);

  return (
    <>
      <Header userObj={userObj} />
      <main className="relative md:pb-16 md:pt-32 grid justify-center">
        <Image
          src="/backgrounds/create_post_background.jpg"
          layout="fill"
          objectFit="cover"
          alt="background"
        />
        <form
          className="z-[1] blur-0 grid shadow lg:w-[700px] xl:w-[800px]  pt-10 px-10 pb-5  bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-100"
          onSubmit={(e) => {
            e.preventDefault();
            validateFields(e.target);
          }}
          method="POST"
        >
          <h2 className="text-4xl font-bold pb-6">Update Blog Post</h2>
          <label htmlFor="title" className={labelClass}>
            Title <span className="">*</span>
            <input
              type="title"
              id="title"
              className={inputClass}
              defaultValue={post.title}
              required
            />
          </label>
          <label htmlFor="image" className={labelClass}>
            Image URL <span className="">*</span>
            <input
              type="text"
              id="image"
              className={inputClass}
              defaultValue={post.image}
              required
            />
          </label>
          <label htmlFor="content" className={labelClass}>
            Content <span className="">*</span>
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
            Tags (Seperate tags with a comma and a space)
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

export default EditForm;
