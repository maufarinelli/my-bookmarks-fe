import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { addBookmark } from "../services/services";

interface IAddBookmarkState {
  url: string;
  category: string;
  success?: string;
  error?: string;
}

const styles = {
  marginTop: {
    marginTop: "30px"
  },
  form: {
    marginLeft: "20px",
    marginBottom: "20px"
  },
  input: {
    display: "block",
    paddingRight: "20px"
  }
};

class AddBookmark extends React.Component<
  any,
  IAddBookmarkState & { [key: string]: string }
> {
  state = {
    url: "",
    category: "",
    success: "",
    error: ""
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { url, category } = this.state;
    const result = await addBookmark({ url, category });

    if (result) {
      this.setState({ success: result.message });
    } else {
      this.setState({ error: result.message });
    }
  };

  render() {
    const { classes } = this.props;
    const { success, error } = this.state;

    return (
      <>
        <Typography
          className={classes.marginTop}
          align={"center"}
          component="h1"
          variant="h5"
          gutterBottom
        >
          Add Bookmarks
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            id="url"
            name="url"
            label="Url: "
            className={classes.input}
            value={this.state.url}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="category"
            name="category"
            label="Category: "
            className={classes.input}
            value={this.state.category}
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <Button variant="contained" color={"primary"} type="submit">
            Submit
          </Button>
        </form>
        <Divider />
        <section>
          {success && <Typography color={"primary"}>{success}</Typography>}
          {error && <Typography color={"error"}>{error}</Typography>}
        </section>
      </>
    );
  }
}

export default withStyles(styles)(AddBookmark);
