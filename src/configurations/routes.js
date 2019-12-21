import Home from "../components/Home";
import {
  Favorite as FavoritesIcon,
  FavoriteOutlined as FavoritesOutlinedIcon,
  Home as HomeIcon,
  HomeOutlined as HomeIconOutlined
} from "@material-ui/icons";
import Favorites from "../components/Favorites";

export const pathMap = {
  "/": { label: "Home", component: Home },
  "/favorites": { label: "Favorites", component: Favorites }
};

export const pathnameToIcon = {
  "/": { default: HomeIconOutlined, selected: HomeIcon },
  "/favorites": { default: FavoritesOutlinedIcon, selected: FavoritesIcon }
};

export const pathNames = Object.keys(pathMap);
