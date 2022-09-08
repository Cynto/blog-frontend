import Reply from './reply.interface';
export default interface Comment {
  _id: string;
  content: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  post: string;
  createdAt: string;
  replies: Reply[];
}
