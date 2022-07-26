import React from 'react';
import commentInteface from '../../shared/interfaces/comment.interface';

const SingleComment = ({ comment }: { comment: commentInteface }) => {
  return (
    <div className="w-ful max-w-full  border-t-2 p-5 m-b-10">
      <div className="">
        <span className=" font-header mr-3 text-xl">
          {comment.user.firstName}
        </span>
        ~<span className=" font-normal text-sm">24/07/2022</span>
      </div>
      <div className=" w-full max-w-full ">
        <p className="dark:text-slate-300 break-words">{comment.content}</p>
      </div>
      <button className="mr-3 mt-4 group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
        <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
          Reply
        </span>
      </button>
    </div>
  );
};

export default SingleComment;
