import {useHistory} from "react-router-dom";
import {pathMap} from "../configurations/routes";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPath} from "../redux/ui/ui.selectors";
import {navigate} from "../redux/ui/ui.actions";
export default function useNavigator() {
  const path = useSelector(getCurrentPath);
  const dispatch = useDispatch();
  const history = useHistory();

  function _navigate(pathname) {
    if(!!pathMap[pathname]) {
      history.push(pathname);
      dispatch(navigate(pathname));
    }
  }

  return [path, _navigate];
}
