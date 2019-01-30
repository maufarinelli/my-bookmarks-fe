import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { getBookmarks } from "../services/services";

interface IMyBookmarksState {
  search: string;
  results: { url: string; category: string }[];
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
    display: "block"
  },
  itemUrl: {
    flex: 1
  }
};

class MyBookmarks extends React.Component<any, IMyBookmarksState> {
  state = {
    search: "",
    results: [{ url: "", category: "" }],
    error: undefined
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.currentTarget.value
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await getBookmarks({ category: this.state.search });

    if (results) {
      this.setState({ results });
    } else {
      this.setState({ error: results });
    }
  };

  render() {
    const { classes } = this.props;
    const { results } = this.state;

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
            margin="normal"
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
                  </ListItem>
                )
              );
            })}
          </List>
        </section>
      </>
    );
  }
}

export default withStyles(styles)(MyBookmarks);
