import React, { Component } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardArtist from "../components/card/CardArtist";
import List from "../components/List";
import LabPreview from "../components/LabPreview";
// styles
import "../styles/card.css";

export default class Artists extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    apiHandler.get("/artists").then(apiRes => {
      this.setState({ artists: apiRes.data.artists });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>All Artists</h1>
        <div className="cards">
          {this.state.artists.map((artist, i) => (
            <div key={i}>
              <CardArtist data={artist} />
            </div>
          ))}
        </div>

        {/* {this.state.artists.lenght === 0 && <h1 className="title">you good</h1>} */}

        
      </React.Fragment>
    );
  }
}
