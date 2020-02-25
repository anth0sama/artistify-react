import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import IconAvatarAdmin from "./../icon/IconAvatarAdmin";
import apiHandler from "./../../api/APIHandler";



class FormUpdateAlbum extends Component {
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





  handleSubmit = async e => {
    e.preventDefault();

    const fd = new FormData();
    // create a form data (programatic form, to send the file as binary)
    fd.append("title", this.state.title);
    fd.append("artist", this.state.artist);
    fd.append("description", this.state.description);
    fd.append("label", this.state.label);
    fd.append("releaseDate", this.state.releaseDate);
    fd.append("cover", this.state.avatar);

    try {
      await apiHandler.patch(`/albums/${this.props.match.params.id}`, fd);
  
      this.props.history.push("/admin/albums");
    } catch (err) {
    }
  };




  componentDidMount() {
    apiHandler
    .get(`/albums/${this.props.match.params.id}`)
    .then(apiRes => {
        this.setState(apiRes.data);
        this.setState({avatar:apiRes.data.cover, tmpAvatar:apiRes.data.cover })
        console.log(this.state);
        
    })
    .catch(apiErr => console.error(apiErr));



    Promise.all([apiHandler.get("/artists"),apiHandler.get("/labels")])
    .then(apiRes => {      
      this.setState({ artists: apiRes[0].data.artists , labels: apiRes[1].data.labels })
    })
    .catch(apiErr => console.error(apiErr));
  }



  handleImage = e => {
    // console.log("Signup@handle image", e.target.files[0]);
    this.setState({ avatar: e.target.files[0] }, () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // when the fileREader ends  ...
        const baseString = reader.result; // get the image as a base64 encoded string
        this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
      };
      reader.readAsDataURL(this.state.avatar); // read the file from the local disk
    });
  };

  updateState = e => {
    // if (e.target.name === "avatar") return;
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
        <form className="form"
          onChange={this.updateState}
          onSubmit={this.handleSubmit}>
 
          <label className="label" for="title">title</label>
          <input className="input" id="title" type="text" name="title" value={this.state.title}/>


          <label className="label" for="artist">artist</label>
          <select name="artist" id="artist" value={this.state.artist}>
            {this.state.artists.map((artist, i) => (
              <option key={i} value={artist._id} >{artist.name}</option>
            ))}
          </select>
          <br />


          <label className="label" for="label">label</label>
          <select name="label" id="label" value={this.state.label}>
            {this.state.labels.map((label, i) => (
              <option key={i} value={label._id} >{label.name}</option>
            ))}
          </select>
          <br />

          <label className="label" for="releaseDate">releaseDate</label>
          <input className="input" id="releaseDate" type="date" name="releaseDate" value={this.state.releaseDate}/>


          <label className="label" htmlFor="avatar">
          cover
          </label>
          <IconAvatarAdmin avatar={this.state.tmpAvatar} clbk={this.handleImage}/>


          <label className="label" for="description">description</label>
          <textarea className="input" id="description" type="text" name="description" value={this.state.description}>
          </textarea>


          <button className="btn">ok</button>

        </form>
    );
  }
}

export default withRouter(FormUpdateAlbum);
