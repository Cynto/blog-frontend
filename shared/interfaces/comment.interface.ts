import replyInterface from './reply.interface';
export default interface CommentInterface {
  _id: string;
  content: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
  replies: replyInterface[];
}
