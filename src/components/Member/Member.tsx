import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

const Member = () => {
  const { username } = useParams();
  const {
    octokitStore: { currentUser, setCurrentUser },
  } = useStore();
  useEffect(() => {
    if (username) {
      setCurrentUser(username);
    }
  }, [username, setCurrentUser]);

  useEffect(() => {
    console.log("user ui", currentUser.lastContributed);
  }, [currentUser]);

  return <div>{username}</div>;
};

export default Member;
