import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import MyBookmarks from "./MyBookmarks/MyBookmarks";
import AddBookmark from "./AddBookMark.ts/AddBookmark";
import Login from "./Login/Login";

interface IApp {
  classes: {
    [key: string]: any;
  };
}

const styles = {
  root: {
    flexGrow: 1
  },
  menuItem: {
    display: "inline-block"
  },
  menuItemLink: {
    color: "#fff",
    textDecoration: "none"
  }
};

const App: React.SFC<IApp> = ({ classes }) => (
  <div className={classes.root}>
    <CssBaseline />
    <Router>
      <>
        <AppBar position="static">
          <Toolbar>
            <ul>
              <MenuItem className={classes.menuItem}>
                <Link className={classes.menuItemLink} to="/">
                  Home
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Link className={classes.menuItemLink} to="/add-bookmark">
                  Add Bookmark
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Link className={classes.menuItemLink} to="/my-bookmarks">
                  My Bookmarks
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <Link className={classes.menuItemLink} to="/login">
                  Login
                </Link>
              </MenuItem>
            </ul>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={MyBookmarks} />
        <Route path="/add-bookmark/" component={AddBookmark} />
        <Route path="/my-bookmarks/" component={MyBookmarks} />
        <Route path="/login/" component={Login} />
      </>
    </Router>
  </div>
);

export default withStyles(styles)(App);
