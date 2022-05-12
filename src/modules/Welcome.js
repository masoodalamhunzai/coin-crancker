import React from "react";
import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
class WelcomeModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="zl_welcome_slide_step_btns"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    return (
      <>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <>
            {isAuthenticated && (
              <div style={{ float: "right" }}>
                <Link to="/dashboard" className="mr-1">
                  Dashboard
                </Link>
                <LogoutButton className="ml-1" />
              </div>
            )}

            <section className="zl_welcome_slide_section">
              <div className="zl_welcome_slide_content container">
                <img
                  src="assets/image/welcome-round-shap1.svg"
                  alt="round-shap"
                  className="round_shap_img_one"
                />
                <img
                  src="assets/image/welcome-round-shap2.svg"
                  alt="round-shap"
                  className="round_shap_img_two"
                />
                <img
                  src="assets/image/light-welcome-round-shap1.png"
                  alt="round-shap"
                  className="round_shap_light_img_one"
                />
                <img
                  src="assets/image/light-welcome-round-shap2.png"
                  alt="round-shap"
                  className="round_shap_light_img_two"
                />
                <React.Fragment>
                  {/*render the form steps and pass required props in*/}

                  {/* {this.previousButton()} */}
                  <h2 className="zl_welcome_slide_heading">
                    Welcome to the Fam!
                  </h2>
                  <p className="zl_welcome_slide_peregraph">Coin Crankerz.</p>
                  {isAuthenticated && this.nextButton()}
                </React.Fragment>
              </div>
              {!isAuthenticated && <LoginButton />}
            </section>
          </>
        )}
      </>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="zl_welcome_slide_img">
      <img
        src="assets/image/welcome-slider1.png"
        alt="wizard-img"
        className="img-fluid zl_dark_theme_slide_img"
      />
      <img
        src="assets/image/light-welcome-slider1.png"
        alt="wizard-img"
        className="img-fluid zl_light_theme_slide_img"
      />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="zl_welcome_slide_img">
      <img
        src="assets/image/welcome-slider2.png"
        alt="wizard-img"
        className="img-fluid zl_dark_theme_slide_img"
      />
      <img
        src="assets/image/light-welcome-slider2.png"
        alt="wizard-img"
        className="img-fluid zl_light_theme_slide_img"
      />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="zl_welcome_slide_img">
        <img
          src="assets/image/welcome-slider3.png"
          alt="wizard-img"
          className="img-fluid zl_dark_theme_slide_img"
        />
        <img
          src="assets/image/light-welcome-slider3.png"
          alt="wizard-img"
          className="img-fluid zl_light_theme_slide_img"
        />
      </div>
      <Link to={"/dashboard"} className="zl_welcome_slide_step_btns">
        Get Started
      </Link>
      <Link to={"/login"} className="zl_welcome_slide_already_wallet">
        I already have wallet
      </Link>
    </React.Fragment>
  );
}
export default withAuth0(WelcomeModule);
