import Search from "../components/Search";
import {
  Favorite as FavoritesIcon,
  FavoriteOutlined as FavoritesOutlinedIcon,
  Search as SearchIcon,
  SearchOutlined as SearchIconOutlined
} from "@material-ui/icons";
import Favorites from "../components/Favorites";

export const pathMap = {
  "/": { label: "Search", component: Search },
  "/favorites": { label: "Favorites", component: Favorites }
};

export const pathnameToIcon = {
  "/": { default: SearchIconOutlined, selected: SearchIcon },
  "/favorites": { default: FavoritesOutlinedIcon, selected: FavoritesIcon }
};

export const pathNames = Object.keys(pathMap);
