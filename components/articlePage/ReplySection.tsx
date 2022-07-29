import React, { useEffect, useState } from 'react';
import commentInterface from '../../shared/interfaces/comment.interface';
import replyInterface from '../../shared/interfaces/reply.interface';
import userObjInterface from '../../shared/interfaces/userObj.interface';
import SingleReply from './SingleReply';

const ReplySection = ({
  comment,
  userObj,
  refreshReplies,
  setRefreshReplies,
}: {
  comment: commentInterface;
  userObj: userObjInterface | null | undefined;
  refreshReplies: boolean;
  setRefreshReplies: Function;
}) => {
  const [replies, setReplies] = useState<replyInterface[]>([]);
  const [repliesShown, setRepliesShown] = useState(false);

  

  const getReplies = async () => {
    const response = await fetch(
      `http://localhost:4000/posts/${comment.post}/comments/${comment._id}/replies`
    );
    const json = await response.json();

    if (json.replies) {
      json.replies = await json.replies.map((reply: replyInterface) => {
        reply.content = reply.content.replaceAll('&#x27;', "'");
        return reply;
      });

      setReplies(json.replies);
    }
  };
  useEffect(() => {
    if (repliesShown && !replies.length) {
      getReplies();
    }
  }, [repliesShown]);

  useEffect(() => {
    if (refreshReplies) {
      console.log(refreshReplies);
      getReplies();
      setRefreshReplies(false);
    }
  }, [refreshReplies]);

  return (
    <div>
      <button
        className=" mt-5  border-slate-900 dark:border-0 rounded font-bold "
        onClick={() => {
          setRepliesShown(!repliesShown);
        }}
      >
        <span className="relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
          {repliesShown ? `Hide replies` : 'View replies'}
        </span>
      </button>
      {repliesShown ? (
        <div className="border-l-2 px-2 mt-5 ">
          {replies.map((reply, index) => (
            <SingleReply
              key={index}
              reply={reply}
              userObj={userObj}
              refreshReplies={refreshReplies}
              setRefreshReplies={setRefreshReplies}
              getReplies={getReplies}
              comment={comment}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReplySection;
