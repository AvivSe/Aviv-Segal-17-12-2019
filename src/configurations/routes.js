import Home from "../components/Home";
import {Bookmarks as BookmarksIcon, Home as HomeIcon} from "@material-ui/icons";
import Bookmarks from "../components/Bookmarks";

export const pathMap = {
  '/' : { label: 'Home', component: Home, Icon: HomeIcon },
  '/bookmarks': { label: 'Bookmarks', component: Bookmarks ,Icon: BookmarksIcon }
};
export const pathNames = Object.keys(pathMap);
