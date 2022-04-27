import { Avatar, AvatarGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import { Link } from "react-router-dom";

const Contributors = observer(() => {
  const {
    octokitStore: { activeMemebers },
  } = useStore();

  if (!activeMemebers.length) return <></>;
  return (
    <AvatarGroup
      max={8}
      style={{ alignItems: "center" }}
      componentsProps={{
        additionalAvatar: {
          style: {
            width: 32,
            height: 32,
          },
        },
      }}
    >
      {activeMemebers.map((c) => (
        <Link
          to={`user/${c.login}`}
          key={c.id}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Avatar
            key={c.id}
            alt={c.login}
            src={c.avatarURL}
            sx={{ width: 32, height: 32 }}
          />
        </Link>
      ))}
    </AvatarGroup>
  );
});

export default Contributors;
