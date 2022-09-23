import React, { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import blogPostObj from '../../shared/interfaces/blogPostObj.interface';

const CommentForm = ({
  getComments,
  post,
}: {
  getComments: Function;
  post: blogPostObj;
}) => {
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (data: any) => {
    const userComment = textAreaRef.current!.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: userComment,
          post: post._id,
        }),
      }
    );
    const json = await response.json();

    if (json.comment) {
      setErrors([{ msg: '', value: '', param: '', location: '' }]);
      textAreaRef.current!.value = '';
      console.log('comment added');
      getComments();
    } else if (json.errors) {
      setErrors([
        {
          msg: 'Sorry, something went wrong. Please try again.',
          value: '',
          param: '',
          location: '',
        },
      ]);
    }
  };

  const resetTextArea = () => {
    textAreaRef.current!.value = '';
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.target);
      }}
    >
      <TextareaAutosize
        className="w-full border-[1px] border-slate-500  resize-none p-2 outline-slate-500 dark:bg-slate-500"
        maxLength={240}
        placeholder="Write a comment..."
        name="comment"
        minLength={5}
        ref={textAreaRef}
      />
      <button
        type="submit"
        className="mr-3 group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold"
      >
        <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
          Post
        </span>
      </button>
      <button
        type="button"
        className="ml-3 my-5  border-slate-900 dark:border-0 rounded    font-bold"
      >
        <span
          className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out"
          onClick={resetTextArea}
        >
          Cancel
        </span>
      </button>
      {errors[0].msg && (
        <div className="text-red-500 text-sm">{errors[0].msg}</div>
      )}
    </form>
  );
};

export default CommentForm;
