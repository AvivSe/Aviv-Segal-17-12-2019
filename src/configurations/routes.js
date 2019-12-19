import Home from "../components/Home";
import {
  Bookmarks as BookmarksIcon,
  BookmarksOutlined as BookmarksOutlinedIcon,
  Home as HomeIcon,
  HomeOutlined as HomeIconOutlined
} from "@material-ui/icons";
import Bookmarks from "../components/Bookmarks";

export const pathMap = {
  "/": { label: "Home", component: Home },
  "/bookmarks": { label: "Bookmarks", component: Bookmarks }
};

export const pathnameToIcon = {
  "/": { default: HomeIconOutlined, selected: HomeIcon },
  "/bookmarks": { default: BookmarksOutlinedIcon, selected: BookmarksIcon }
};

export const pathNames = Object.keys(pathMap);
