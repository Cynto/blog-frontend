import React, { useState } from 'react';
import commentInterface from '../../shared/interfaces/comment.interface';
import userObjInterface from '../../shared/interfaces/userObj.interface';
import ReplyForm from './ReplyForm';
import ReplySection from './ReplySection';

const SingleComment = ({
  comment,
  userObj,
  getComments,
}: {
  comment: commentInterface;
  userObj: userObjInterface | null | undefined;
  getComments: Function;
}) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [refreshReplies, setRefreshReplies] = useState<boolean>(false);
  const [displayDeleteConfirm, setDisplayDeleteConfirm] =
    useState<boolean>(false);

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/posts/${comment.post}/comments/${comment._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.status === 204) {
      console.log('comment deleted');
      getComments();
    }
  };

  return (
    <>
      <div className="w-ful max-w-full  border-t-2 p-5 m-b-10 relative">
        {comment.user._id === userObj?._id && !displayDeleteConfirm ? (
          <button
            className="absolute right-5"
            onClick={() => setDisplayDeleteConfirm(true)}
          >
            <span
              className="material-symbols-outlined font-extralight"
              title="Delete comment"
            >
              delete
            </span>
          </button>
        ) : null}
        {comment.user._id === userObj?._id && displayDeleteConfirm ? (
          <>
            <button
              className="absolute right-5 text-red-600"
              onClick={() => {
                setDisplayDeleteConfirm(false);
                handleDelete();
              }}
            >
              <span
                className="material-symbols-outlined font-extralight"
                title="Confirm deletion"
              >
                delete
              </span>
            </button>
            <div className="hidden md:block absolute right-12">
              <span>Click again to confirm deletion</span>
            </div>
          </>
        ) : null}
        <div className="">
          <span className=" font-header mr-3 text-xl">
            {comment.user.firstName}
          </span>
          ~
          <span className=" font-normal text-sm">
            {new Date(comment.createdAt).toLocaleDateString()}
            <span className="mr-2"></span>
            {new Date(comment.createdAt).toLocaleTimeString().slice(0, 5)}
          </span>
        </div>
        <div className=" w-full max-w-full ">
          <p className="dark:text-slate-300 break-words font-normal">
            {comment.content}
          </p>
        </div>
        {userObj ? (
          <button
            className=" mt-3  border-slate-900 dark:border-0 rounded    font-bold"
            onClick={() => setIsReplying(!isReplying)}
          >
            <span className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
              Reply
            </span>
          </button>
        ) : null}

        {isReplying ? (
          <ReplyForm
            originalUser={comment.user}
            comment={comment}
            setIsReplying={setIsReplying}
            setRefreshReplies={setRefreshReplies}
            getComments={getComments}
          />
        ) : null}
        {comment.replies[0] ? (
          <ReplySection
            comment={comment}
            refreshReplies={refreshReplies}
            setRefreshReplies={setRefreshReplies}
            userObj={userObj}
            getComments={getComments}
          />
        ) : null}
      </div>
    </>
  );
};

export default SingleComment;
