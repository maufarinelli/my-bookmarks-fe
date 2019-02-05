import * as React from "react";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { login } from "../services/services";

interface ILoginState {
  username: string;
  password: string;
  error: string;
  success: string;
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
  }
};

class Login extends React.Component<
  any,
  ILoginState & { [key: string]: string }
> {
  state = {
    username: "",
    password: "",
    error: "",
    success: ""
  };

  public handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    event.preventDefault();

    try {
      const response = await login({ username, password });
      let message;

      if (response.error) {
        message = response.error;
        if (response.error.response && response.error.response.data) {
          message = response.error.response.data.message;
        }
        throw new Error(message);
      }

      this.setState({ success: response.message, error: "" });
    } catch (error) {
      this.setState({ error: error.message, success: "" });
    }
  };

  public render() {
    const { classes } = this.props;
    const { username, password, error, success } = this.state;

    return (
      <>
        <Typography
          className={classes.marginTop}
          align={"center"}
          component="h1"
          variant="h5"
          gutterBottom
        >
          Login
        </Typography>
        <div className="container row">
          <div className="jumbotron col-sm-12 pull-center">
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                name="username"
                label="Username: "
                className={classes.input}
                value={username}
                onChange={this.handleInputChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="password"
                name="password"
                label="Password: "
                className={classes.input}
                value={password}
                onChange={this.handleInputChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button variant="contained" color={"primary"} type="submit">
                Submit
              </Button>
            </form>
            {success && success !== "" && (
              <Typography component="p" color="primary">
                {success}
              </Typography>
            )}
            {error && error !== "" && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Login);
