import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import apiHandler from "./../../api/APIHandler";




class FormUpdateArtist extends Component {
    state = {
        name: "",
        styles: [],
        style: "",
        description: "",
        isBand: "",
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {

            apiHandler
                .patch(`/artists/${this.props.match.params.id}`, {
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
            .get(`/artists/${this.props.match.params.id}`)
            .then(apiRes => {
                this.setState(apiRes.data);
            })
            .catch(apiErr => console.error(apiErr));

        apiHandler
            .get("/styles")
            .then(apiRes => {
                this.setState({ styles: apiRes.data.styles })
            })
            .catch(apiErr => console.error(apiErr));
    }

    updateState = e => {
        if (e.target.name === "isBand") return;
        this.setState({ [e.target.name]: e.target.value });
    };

    updateIsBand = e => {
        this.setState({ isBand: !this.state.isBand });
    };

    render() {
        return (
            <form className="form"
                onChange={this.updateState}
                onSubmit={this.handleSubmit}>
                <h1 className="title">Update artist</h1>


                <label className="label" for="name">name</label>
                <input className="input" id="name" type="text" name="name" value={this.state.name} />


                <label className="label" for="description">description</label>
                <textarea className="input" id="description" type="text" name="description" value={this.state.description}>
                </textarea>


                <label className="label" for="style">Style</label>
                <select name="style" id="style" value={this.state.style}>
                    {this.state.styles.map((style, i) => (
                        <option key={i} value={style._id}
                        >{style.name}</option>
                    ))}


                </select>
               

                <br />

                <label className="label">is band ?</label>
                <div className="row">
                    <label for="is-band">yes</label>
                    <input id="is-band" type="radio" name="isBand" checked={this.state.isBand === true} onChange={this.updateIsBand} />
                    <label for="is-not-band">no</label>
                    <input id="is-not-band" type="radio" name="isBand" checked={this.state.isBand === false} onChange={this.updateIsBand} />
                </div>
                <button className="btn">ok</button>

            </form>
        )
    }
}

export default withRouter(FormUpdateArtist);
