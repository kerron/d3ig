import { observer } from "mobx-react-lite";
import MainSearch from "../Search/MainSearch";
import { useStore } from "../../hooks/useStore";
import Home from "../Home/Home";

const Entry: React.FC = observer(() => {
  const {
    uiStore: { hasData },
  } = useStore();
  return <>{!hasData ? <MainSearch /> : <Home />}</>;
});

export default Entry;
