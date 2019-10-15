import React, { Component } from 'react'
// import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { createLead } from 'app/store/actions/my-actions'
// import { createLead } from 'store/actions/my-actions'

class CreateLead extends Component {
  state = {
    title: '',
    content: '',
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createLead(this.state);
    // this.props.history.push('/');
  }
  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Lead</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Lead Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Lead Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>

          <div>
            <input placeholder="Placeholder" s={6} label="First Name" />
            <input s={6} label="Last Name" />
            <input s={12} label="disabled" defaultValue="I am not editable" disabled />
            <input type="password" label="password" s={12} />
            <input type="email" label="Email" s={12} />
          </div>

        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createLead: lead => dispatch(createLead(lead))
  }
}

CreateLead.propTypes = {
  // classes: PropTypes.object.isRequired,
  createLead: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CreateLead)
