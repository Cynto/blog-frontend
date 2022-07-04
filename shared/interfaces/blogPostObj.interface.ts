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
  comments: [];
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
