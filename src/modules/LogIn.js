import { connect } from "react-redux";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
// eslint-disable-next-line
// import { mapStateToProps } from './mappers';
// eslint-disable-next-line
const LogInModule = ({ navigation }) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
  });

  const inputField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // console.log("state",state);

  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <section className="zl_login_section">
          <div className="zl_login_content container">
            <div className="zl_login_heading_text">
              <h3 className="zl_login_heading">Login</h3>
              <p className="zl_login_peregraph">
                This is login for Coin Crankerz Customers only{" "}
              </p>
            </div>
            <div className="zl_login_row row">
              {inputField.map((inputValue, i) => (
                <div
                  className="zl_login_col_3 col-lg-3 col-md-6"
                  key={inputValue}
                >
                  <div className="zl_login_input_content position-relative">
                    <p className="zl_login_input_text">{inputValue}</p>
                    <input
                      type="text"
                      className="zl_login_input"
                      name={`input${inputValue}`}
                      placeholder="________"
                    />
                  </div>
                </div>
              ))}

              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">2</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="input1"
                    value="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">3</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">4</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">5</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">6</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">7</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">8</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">9</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">10</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">11</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
              <div className="zl_login_col_3 col-lg-3 col-md-6">
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">12</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    placeholder="________"
                  />
                </div>
              </div>
            </div>
            <div className="zl_login_btn">
              <LoginButton />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default connect(null, null)(LogInModule);
