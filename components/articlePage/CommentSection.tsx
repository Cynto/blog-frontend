import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import userObjInterface from '../../shared/interfaces/userObj.interface';
import Link from 'next/link';
import commentInterface from '../../shared/interfaces/comment.interface';
import TextareaAutosize from 'react-textarea-autosize';

const CommentSection = ({
  post,
  userObj,
}: {
  post: blogPostObjInterface;
  userObj: userObjInterface | null | undefined;
}) => {
  console.log(post);
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
  const [comments, setComments] = useState<commentInterface[]>([]);

  const handleSubmit = async (data: any) => {
    console.log(data.comment.value);
    const userComment = data.comment;
    const response = await fetch(
      `http://localhost:4000/posts/${post._id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: userComment.value,
          post: post._id,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.comment) {
      console.log('comment added');
    } else {
      setErrors(json.errors);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${post._id}/comments`)
      .then((res) => res.json())
      .then((json) => {
        setComments(json.comments);
      });
  }, []);
  return (
    <div className=" dark:bg-gray-900 dark:text-slate-100 flex justify-center">
      <div className="w-2/3  border-t-2 grid auto-rows-min justify-items-center p-5">
        <h3 className="dark:text-slate-100 text-2xl font-header ">Comments</h3>

        {!userObj ? (
          <div className="grid text-center">
            <span className="text-xl font-bold font-normal mb-3 mt-2">
              Join the conversation
            </span>
            <span className="font-normal">
              Sign in to comment, reply and react
            </span>
            <div>
              <Link href="/login">
                <button className="mr-3 group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
                  <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                    Login
                  </span>
                </button>
              </Link>
              or
              <Link href="/register">
                <button className="ml-3 my-5  border-slate-900 dark:border-0 rounded    font-bold">
                  <span className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                    Register
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full p-2">
            <span className="block text-xl mb-3">
              You&apos;re signed in, <b>{userObj.firstName}</b>
            </span>
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
              />
              <button
                type="submit"
                className="mr-3 group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold"
              >
                <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                  Post
                </span>
              </button>
              <button className="ml-3 my-5  border-slate-900 dark:border-0 rounded    font-bold">
                <span className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                  Cancel
                </span>
              </button>
            </form>
          </div>
        )}
        <div className=" max-w-[calc(623px-2.5rem)] pt-10 border-2">
          {comments.map((comment: commentInterface, index) => (
            <SingleComment comment={comment} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
