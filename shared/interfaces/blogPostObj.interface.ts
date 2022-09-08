import Comment from "./comment.interface";
export default interface blogPostObj {
  _id: string;
  title: string;
  url: string;
  content: string;
  image: string;
  tags: string[];
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  comments: Comment[];
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
