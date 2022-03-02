import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.onOldPassword = this.onOldPassword.bind(this);
    this.onConfirmPassword = this.onConfirmPassword.bind(this);
   
    this.state = {
      redirect : "",
      userReady: false,
      password: "",
      oldpassword: "",
      confirmpassword: "",
      message: ""
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
      this.setState({ redirect: "/home" });
      // this.props.history.push("/home");
      // window.location.reload();
    }
 
    this.setState({ currentUser: currentUser, userReady: true })
  }

  onPassword(e) {
    console.log(this);
    this.setState({
      password: e.target.value
    });
  }

  onOldPassword(e) {
    this.setState({
      oldpassword: e.target.value
    });
  }
  onConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value
    });
  }
  validateForm = () => {
    return (
      this.state.oldpassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmpassword
    );
  }
  gohome = () => {
    this.props.history.push("/profile");
    window.location.reload();
  }
  handlePassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    console.log(this.validateForm());
    if (!this.validateForm()){
      this.setState({
        loading: false
      });
      return;
    }
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.changepassword(this.state.currentUser, this.state.oldpassword, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.redirect) {
      console.log(this.state.redirect)
      // return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="col-md-12">
        {(this.state.userReady) ?
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handlePassword}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="oldpassword">Old Password</label>
              <Input
                type="text"
                className="form-control"
                name="oldpassword"
                value={this.state.oldpassword}
                onChange={this.onOldPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New password</label>
              <Input
                type="text"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <Input
                type="password"
                className="form-control"
                name="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.onConfirmPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
            
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Change Password</span>
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={this.gohome}
              >
                <span>Cancel</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>: null}
      </div>
    );
  }
}
