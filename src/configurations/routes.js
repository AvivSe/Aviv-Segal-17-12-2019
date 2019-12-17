import Home from "../components/Home";
import {Bookmark as BookmarkIcon, Home as HomeIcon} from "@material-ui/icons";
import Favorites from "../components/Favorites";

export const pathMap = {
  '/' : { label: 'Home', component: Home, Icon: HomeIcon },
  '/favorites': { label: 'Favorites', Favorites ,Icon: BookmarkIcon }
};
export const pathNames = Object.keys(pathMap);
