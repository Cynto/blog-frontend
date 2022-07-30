import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import userObjInterface from '../../shared/interfaces/userObj.interface';
import Link from 'next/link';
import commentInterface from '../../shared/interfaces/comment.interface';
import TextareaAutosize from 'react-textarea-autosize';
import CommentForm from './CommentForm';

const CommentSection = ({
  post,
  userObj,
}: {
  post: blogPostObjInterface;
  userObj: userObjInterface | null | undefined;
}) => {
  console.log(post);
  
  const [comments, setComments] = useState<commentInterface[]>([]);

  
  const getComments = async () => {
    const response = await fetch(
      `http://localhost:4000/posts/${post._id}/comments`
    );
    const json = await response.json();
    json.comments = json.comments.reverse()
    setComments(json.comments);
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="w-screen dark:bg-gray-900 dark:text-slate-100 flex justify-center max-w-screen">
      <div className="md:w-2/3 max-w-[630px]  border-t-2 grid grid-cols-1 justify-items-center p-5">
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
            <CommentForm post={post} getComments={getComments} />
            
          </div>
        )}
        <div className=" w-full  pt-10 border-2">
          {comments.map((comment: commentInterface, index) => (
            <SingleComment comment={comment} userObj={userObj} getComments={getComments} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
