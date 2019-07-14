import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});



class SimpleModal extends React.Component {
  state = {
    open: false,
    newName: "",
    discount: ""
  };

   editImageHandler = async event => {
    const imageId = event.currentTarget.value;
    const url = "http://localhost:3000/images/" + imageId;
    console.log(imageId);


    // try {
    //   const response = await axios({
    //     method: "PATCH",
    //     mode: "no-cors",
    //     url: url
    //   });
    // } catch (err) {
    //   throw err;
    // }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Edit</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <label>discount %</label>
            <input onChange={e => this.setState({discount: e.target.value})}/>
            <br/>
            <br/>
            <label>name</label>
            <input />
            <Button onClick={this.editImageHandler}>Submit</Button>

          </div>
        </Modal>

      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
