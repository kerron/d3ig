import { observer } from "mobx-react-lite";
import MainSearch from "../Search/MainSearch";
import { useStore } from "../../hooks/useStore";
import LOC from "../Graphs/LOC";

const Entry: React.FC = observer(() => {
  const {
    uiStore: { hasData },
  } = useStore();
  return <>{!hasData ? <MainSearch /> : <LOC />}</>;
});

export default Entry;
