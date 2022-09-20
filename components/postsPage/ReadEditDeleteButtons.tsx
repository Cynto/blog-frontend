import React from 'react';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import UserObj from '../../shared/interfaces/userObj.interface';
import BasicButton from '../BasicButton';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const ReadEditDeleteButtons = ({
  userObj,
  post,
}: {
  userObj: false | UserObj | null;
  post: blogPostObjInterface;
}) => {
  const { width } = useWindowDimensions();
  return (
    <div className="w-full flex justify-between">
      <Link href={`/loading/${post.url}`}>
        <a>
          <BasicButton callback={() => {}} text={width >= 800 ? 'Read Article' : 'Read'} />
        </a>
      </Link>

      {(userObj && userObj.isAdmin) ||
      (userObj && userObj._id === post.user._id) ? (
        <>
          <Link href={`/posts/edit/${post.url}`}>
            <a>
              <BasicButton callback={() => {}} text={width >= 800 ? 'Edit Article' : 'Edit'} />
            </a>
          </Link>
          <Link href={`/posts/delete/${post.url}`}>
            <a>
              <BasicButton callback={() => {}} text={width >= 800 ? 'Delete Article' : 'Delete'} />
            </a>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default ReadEditDeleteButtons;
