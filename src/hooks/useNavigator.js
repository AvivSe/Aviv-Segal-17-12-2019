import { useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {pathMap} from "../configurations/routes";
export default function useNavigator() {
  const [path, setPath] = useState(useLocation().pathname);
  const history = useHistory();
  function navigate(pathname) {
    console.log("path name", pathname);
    if(!!pathMap[pathname]) {
      history.push(pathname);
      setPath(pathname);
    }
  }

  return [path, navigate];
}
