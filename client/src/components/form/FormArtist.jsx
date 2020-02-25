import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import apiHandler from "./../../api/APIHandler";




class FormArtist extends Component {
  state = {
    name: "",
    styles: [],
    style: "",
    description: "",
    isBand: false
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      apiHandler
        .post("/artists", {
          name: this.state.name,
          description: this.state.description,
          style: this.state.style,
          isBand: this.state.isBand
        });
      this.props.history.push("/admin/artists");

    } catch (err) {

      // this.props.history.push("/artists");
    }

  }

  componentDidMount() {
    apiHandler
      .get("/styles")
      .then(apiRes => {
        this.setState({ styles: apiRes.data.styles })
      })
      .catch(apiErr => console.error(apiErr));
  }

  updateState = e => {
    // if (e.target.name === "avatar") return;
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="form"
        onChange={this.updateState}
        onSubmit={this.handleSubmit}>
        <h1 className="title">Create artist</h1>


        <label className="label" for="name">name</label>
        <input className="input" id="name" type="text" name="name" />


        <label className="label" for="description">description</label>
        <textarea className="input" id="description" type="text" name="description">
        </textarea>


        <label className="label" for="style">Style</label>
        <select name="style" id="style" >
          <option value="-1" disabled selected>Choose a style</option>
          {this.state.styles.map((style, i) => (
            <option key={i} value={style._id} >{style.name}</option>
          ))}


        </select>
        {/* <option class="input" id="style" type="text" name="style" placeholder="put style here" /> */}

        <br />

        <label className="label">is band ?</label>
        <div className="row">
          <label for="is-band">yes</label>
          <input id="is-band" type="radio" name="isBand" value="yes" />
          <label for="is-not-band">no</label>
          <input id="is-not-band" type="radio" name="isBand" value="no" />


        </div>
        <button className="btn">ok</button>

      </form>
    )
  }
}

export default withRouter(FormArtist);
