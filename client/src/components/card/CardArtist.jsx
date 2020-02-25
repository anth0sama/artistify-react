import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return (
    <div className="card shadow-box">
      <div className="color" 
      style={{backgroundColor:data.style.color}}>
        </div>

      <Link to={`/artists/${data._id}`}>
        <div className="link title">{data.name}</div>
      </Link>
      <IconFav/>


    </div >



  )
}
