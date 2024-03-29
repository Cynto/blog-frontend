import React, { useState } from 'react';
import commentInterface from '../../shared/interfaces/comment.interface';
import replyInterface from '../../shared/interfaces/reply.interface';
import userObjInterface from '../../shared/interfaces/userObj.interface';
import ReplyForm from './ReplyForm';

const SingleReply = ({
  reply,
  userObj,
  refreshReplies,
  setRefreshReplies,
  getReplies,
  comment,
  getComments,
}: {
  reply: replyInterface;
  userObj: userObjInterface | null | undefined;
  refreshReplies: boolean;
  setRefreshReplies: Function;
  getReplies: Function;
  comment: commentInterface;
  getComments: Function;
}) => {
  const [displayDeleteConfirm, setDisplayDeleteConfirm] =
    useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleDelete = async (replyId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${comment.post}/comments/${comment._id}/replies/${replyId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const data = await response.json();
    if (data.status === 204) {
      console.log('reply deleted');
      getReplies();
    }
  };

  return (
    <div className="reply w-ful max-w-full  border-t-2 p-5 m-b-10 relative">
      {reply.user._id === userObj?._id && !displayDeleteConfirm ? (
        <button
          className="absolute right-5"
          onClick={() => setDisplayDeleteConfirm(true)}
          data-testid="delete-reply-initial"
        >
          <span
            className="material-symbols-outlined font-extralight"
            title="Delete comment"
          >
            delete
          </span>
        </button>
      ) : null}
      {reply.user._id === userObj?._id && displayDeleteConfirm && (
        <>
          <button
            className="absolute right-5 text-red-600"
            onClick={() => {
              setDisplayDeleteConfirm(false);
              handleDelete(reply._id);
            }}
            data-testid="delete-reply-confirm"
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
      )}

      <div className="">
        <span className=" font-header mr-3 text-xl">
          {reply.user.firstName}
        </span>
        ~{new Date(reply.createdAt).toLocaleDateString()}
        <span className="mr-2"></span>
        {new Date(reply.createdAt).toLocaleTimeString().slice(0, 5)}
      </div>
      <div className="pb-1">
        <span className="italic text-gray-500 ">
          Replying to {reply.originalUser.firstName}
        </span>
      </div>
      <div className=" w-full max-w-full ">
        <p className="dark:text-slate-300 break-words font-normal">
          {reply.content}
        </p>
      </div>
      {userObj ? (
        <button
          className=" mt-3  border-slate-900 dark:border-0 rounded    font-bold"
          onClick={() => setIsReplying(!isReplying)}
          data-testid="reply-to-reply-button"
        >
          <span className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
            Reply
          </span>
        </button>
      ) : null}

      {isReplying && (
        <ReplyForm
          originalUser={reply.user}
          comment={comment}
          setIsReplying={setIsReplying}
          setRefreshReplies={setRefreshReplies}
          getComments={getComments}
        />
      )}
    </div>
  );
};

export default SingleReply;
