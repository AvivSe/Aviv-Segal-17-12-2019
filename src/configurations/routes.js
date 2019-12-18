import Home from "../components/Home";
import {Bookmark as BookmarkIcon, Home as HomeIcon} from "@material-ui/icons";
import Bookmarks from "../components/Bookmarks";

export const pathMap = {
  '/' : { label: 'Home', component: Home, Icon: HomeIcon },
  '/bookmarks': { label: 'Bookmarks', Bookmarks: Bookmarks ,Icon: BookmarkIcon }
};
export const pathNames = Object.keys(pathMap);
