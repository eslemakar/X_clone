import { useOutletContext } from "react-router-dom";
import Aside from "./aside";
import Nav from "./nav";
import Main from "./main";
const Feed = () => {
  const user = useOutletContext();
  return (
    <div className="h-screen bg-primary overflow-hidden text-secondary grid grid-cols-[0.6fr_minmax(100px,1390px)_0.0001fr]">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
