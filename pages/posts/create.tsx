import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/CreatePost.module.scss';
import { Editor } from '@tinymce/tinymce-react';
import Header from '../../components/Header';
import useUserObject from '../../hooks/useUserObject';
import useDidMountEffect from '../../hooks/useDidMountEffect';

const Create: NextPage = () => {
  const [errors, setErrors] = useState<
    [
      {
        value: String;
        msg: String;
        param: String;
        location: String;
      }
    ]
  >([{ msg: '', value: '', param: '', location: '' }]);
  const [content, setContent] = useState('');
  const [count, setCount] = useState(0);

  const userHookObject = useUserObject();
  const { userObj } = userHookObject;

  const editorRef = useRef(null);
  const firstUpdate = useRef(true);

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

    const response = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        image: image.value,
        tags: tags.value.split(', '),
        published: published.value,
        featured: featured.value,
        content,
      }),
    });
    const json = await response.json();

    if (json.post) {
      router.push(`/posts/${json.post._id}`);
    } else {
      setErrors(json.errors);
    }
  };

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
      <Header userObj={userObj} />

      <main className={styles.main}>
        <Image
          src="https://uca3892d2045b4c59e30bd55644f.previews.dropboxusercontent.com/p/thumb/ABg1y-xI-rzHbzdxzL7TRG1Jf3XL0ECJksyCslu9EuR39ZYwiw8jBH38aUI-4dzMpVTmd1y5VYblL1GgBp_0GXk9QuQ2hEgqjHLbaS4XR8ZPQXeqnAGrf0utFAy9Zq0pdXWrhVAjuRpcs8jBTttcYbqK6rL_eVB1k9gNebJy9aItuLyNLbFQSi2RDkoO2WFuOJiVfXYgAR-WykYLagV0cRVYxDnKTxNBTRDqa7bx3lU79AOqPn3SQkQP65vm8GHNBmSevNGRGmMNXejsmf_EHQF8nqXiJ9k5XV3Z8jtwYyspdWULvU1wIR7Day9gRD8tCVgVw8LoB8JirQHOmbpGpu2JbLK_Em2wRRRox5mm3BCutLYzmeZ_uQ-RsqTJHmhgJ-JegOtgeX-WuRLZWdRS5H1qDY8F2T3KGIWsGxOn4e2dOA/p.jpeg"
          layout="fill"
          objectFit="cover"
          alt="background"
        />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.target);
          }}
          method="POST"
        >
          <h1>Create Blog Post</h1>
          <label htmlFor="title" className={styles.label}>
            Title <span className={styles.required}>*</span>
            <input type="title" id="title" className={styles.input} required />
          </label>
          <label htmlFor="image" className={styles.label}>
            Image URL (Optional)
            <input type="text" id="image" className={styles.input} />
          </label>
          <label htmlFor="content" className={styles.label}>
            Content <span className={styles.required}>*</span>
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
          <label htmlFor="tags" className={styles.label}>
            Tags (Seperate tags with a comma and a space)
            <input
              data-testid="tags-input"
              type="text"
              id="tags"
              className={styles.input}
            />
          </label>
          <div className={styles.publishedContainer}>
            <h3>Publish on Creation</h3>
            <label htmlFor="publishedTrue" className={styles.label}>
              Yes
              <input
                type="radio"
                id="publishedTrue"
                name="published"
                value="true"
                className={styles.radio}
              />
            </label>
            <label htmlFor="publishedFalse">
              No
              <input
                type="radio"
                id="publishedFalse"
                name="published"
                value="false"
                className={styles.radio}
                defaultChecked
              />
            </label>
          </div>
          <div className={styles.featuredContainer}>
            <h3>Set as Featured Post</h3>
            <label htmlFor="featuredTrue">
              Yes
              <input
                type="radio"
                id="featuredTrue"
                name="featured"
                value="true"
                className={styles.radio}
              />
            </label>
            <label htmlFor="featuredFalse">
              No
              <input
                type="radio"
                id="featuredFalse"
                name="featured"
                value="false"
                className={styles.radio}
                defaultChecked
              />
            </label>
          </div>

          {errors[0].msg !== '' ? (
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="error">
                  {' '}
                  {error.msg}
                </li>
              ))}
            </ul>
          ) : null}

          <button type="submit" data-testid="create-post">
            Create Post
          </button>
        </form>
      </main>
    </>
  );
};

export default Create;
