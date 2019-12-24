import React from "react";
import Search from "../components/Search";
import {
  Search as HomeIcon,
  SearchOutlined as HomeIconOutlined
} from "@material-ui/icons";
import Favorites from "../components/Favorites";
import {ReactComponent as FolderFavoriteSvg } from "../assets/folder-favorites.svg";
import {IconHelper} from "../components/styled";

function FavoriteFolder(props){
  return <IconHelper as={FolderFavoriteSvg} {...props}/>
}

export const pathMap = {
  "/": { label: "Search", component: Search },
  "/favorites": { label: "Favorites", component: Favorites }
};

export const pathnameToIcon = {
  "/": { default: HomeIconOutlined, selected: HomeIcon },
  "/favorites": { default: FavoriteFolder, selected: FavoriteFolder }
};

export const pathNames = ["/", "/favorites"];
