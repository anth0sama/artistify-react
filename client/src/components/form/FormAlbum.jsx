import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import IconAvatarAdmin from "./../icon/IconAvatarAdmin";
import apiHandler from "./../../api/APIHandler";


const artists = [1, 2, 3]
const labels = [1, 2, 3]

class FormAlbum extends Component {
  state = {
    title: "",
    avatar: "",
    tmpAvatar: "",
    artists: [],
    artist: "",
    description: "",
    labels: [],
    label: "",
    releaseDate: ""
  }

  componentDidMount() {
    Promise.all([apiHandler.get("/artists"),apiHandler.get("/labels")])
    .then(apiRes => {      
      this.setState({ artists: apiRes[0].data.artists , labels: apiRes[1].data.labels })
    })
    .catch(apiErr => console.error(apiErr));
  }


  updateState = e => {
    // if (e.target.name === "avatar") return;
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <form action="/album" method="post" className="form"
          onChange={this.updateState}
          onSubmit={e => e.preventDefault()}>
          


          <label className="label" for="title">title</label>
          <input className="input" id="title" type="text" name="title" value="test artist" />


          <label className="label" for="artist">artist</label>
          <select name="artist" id="artist" >
            <option value="-1" disabled selected>Choose an artist</option>
            {this.state.artists.map((artist, i) => (
              <option key={i} value={artist.name} >{artist.name}</option>
            ))}
          </select>
          <br />


          <label className="label" for="label">label</label>
          <select name="label" id="label" >
            <option value="-1" disabled selected>Choose a label</option>
            {this.state.labels.map((label, i) => (
              <option key={i} value={label.name} >{label.name}</option>
            ))}
          </select>
          <br />

          <label className="label" for="releaseDate">releaseDate</label>
          <input className="input" id="releaseDate" type="date" name="releaseDate" />


          <label className="label" htmlFor="avatar">
            avatar
          </label>
          <IconAvatarAdmin avatar={this.state.tmpAvatar} clbk={this.handleImage} />


          <label className="label" for="artist">description</label>
          <textarea className="input" id="artist" type="text" name="artist">
          </textarea>


          <button className="btn">ok</button>

        </form>
        <LabPreview name="albumForm" isSmall />
      </React.Fragment>
    );
  }
}

export default withRouter(FormAlbum);
