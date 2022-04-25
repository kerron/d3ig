import { useParams } from "react-router-dom";

const Member = () => {
  const { username } = useParams();
  return <div>{username}</div>;
};

export default Member;
