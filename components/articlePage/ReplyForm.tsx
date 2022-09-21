import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import commentInterface from '../../shared/interfaces/comment.interface';

const ReplyForm = ({
  comment,
  setRefreshReplies,
  originalUser,
  setIsReplying,
  getComments,
}: {
  comment: commentInterface;
  setRefreshReplies: Function;
  originalUser: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  setIsReplying: Function;
  getComments: Function;
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
  
  const handleSubmit = async (data: any) => {
    const userReply = data.reply;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${comment.post}/comments/${comment._id}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: userReply.value,
          comment: comment._id,
          originalUser,
        }),
      }
    );
    const json = await response.json();

    if (json.reply) {
      userReply.value = '';
      console.log('reply added');
      setRefreshReplies(true);
      getComments();
      setIsReplying(false);
    } else {
      setErrors(json.errors);
    }
  };

  return (
    <form
      className="mt-5 px-2 "
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.target);
      }}
    >
      <TextareaAutosize
        className="w-full border-[1px] border-slate-500  resize-none p-2 outline-slate-500 dark:bg-slate-500"
        maxLength={240}
        placeholder="Write a reply..."
        name="reply"
        minLength={5}
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
        className="ml-3 mt-5  border-slate-900 dark:border-0 rounded    font-bold"
        type="button"
      >
        <span
          className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out"
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </span>
      </button>
    </form>
  );
};

export default ReplyForm;
