import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { getBookmarks, deleteBookmark } from "../services/services";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { IGetBookmarksResponse } from "../interfaces";

interface IMyBookmarksState {
  search: string;
  results: IGetBookmarksResponse[];
  success?: string;
  error?: Error;
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
  },
  itemUrl: {
    flex: 1
  },
  messages: {
    marginLeft: "20px"
  },
  deleteButton: {
    marginLeft: "10px"
  }
};

class MyBookmarks extends React.Component<{}, IMyBookmarksState> {
  state = {
    search: "",
    results: [{ url: "", category: "", id: "" }],
    success: undefined,
    error: undefined
  };

  componentDidMount = async () => {
    const results = await getBookmarks({ category: "" });

    if (Array.isArray(results)) {
      this.setState({ results: results as IGetBookmarksResponse[] });
    } else {
      this.setState({ error: results.error });
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.currentTarget.value
    });
  };

  handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const itemId = event.currentTarget.id;

    confirmAlert({
      title: "Confirm to delete url",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteBookmark(parseInt(itemId, 10));

            if (result.message) {
              this.setState({ success: result.message, error: undefined });
            } else {
              this.setState({ error: result.error, success: undefined });
            }
          }
        },
        {
          label: "No",
          onClick: () => false
        }
      ],
      childrenElement: () => <div />,
      willUnmount: () => {}
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await getBookmarks({ category: this.state.search });

    if (Array.isArray(results)) {
      this.setState({ results: results as IGetBookmarksResponse[] });
    } else {
      this.setState({ error: results.error });
    }
  };

  render() {
    const { classes } = this.props;
    const { results, error, success } = this.state;

    return (
      <>
        <Typography
          className={classes.marginTop}
          align={"center"}
          component="h1"
          variant="h5"
          gutterBottom
        >
          My Bookmarks
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            id="search"
            label="Search by: "
            className={classes.input}
            value={this.state.search}
            onChange={this.handleInputChange}
            variant="outlined"
            margin="normal"
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
          <List component="nav">
            {results.map(result => {
              const link = result.url.startsWith("http")
                ? result.url
                : `https://${result.url}`;

              return (
                result &&
                result.url !== "" && (
                  <ListItem key={result.url}>
                    <a className={classes.itemUrl} href={link} target="_blank">
                      {result.url}
                    </a>{" "}
                    -&nbsp; <small>{result.category}</small>
                    <Button
                      variant="outlined"
                      className={classes.deleteButton}
                      color={"primary"}
                      id={result.id}
                      onClick={this.handleDeleteClick}
                    >
                      Delete
                    </Button>
                  </ListItem>
                )
              );
            })}
          </List>
          <div className={classes.messages}>
            {success && <Typography color={"primary"}>{success}</Typography>}
            {error && <Typography color={"error"}>{error}</Typography>}
          </div>
        </section>
      </>
    );
  }
}

export default withStyles(styles)(MyBookmarks);
