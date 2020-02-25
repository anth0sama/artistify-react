import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return <div className="card shadow-box cover">
    <Link to={`/albums/${data._id}`}>
      <div className="link title">{data.title}</div>
      <img src={data.cover} className="cover" alt="cover"/>
    </Link>
    
    <IconFav />


  </div >
}
