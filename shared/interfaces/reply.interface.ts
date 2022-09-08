export default interface Reply {
  _id: string;
  content: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  originalUser: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  
  createdAt: string;
}
