import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css_files/landing.css";
import "../css_files/landing_design.css";
import CloseIcon from "@mui/icons-material/Close";
import created_notes_img from "../css_files/final_created.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import Spinner from "./Spinner";

const Landing = () => {
  const [credentials, setcredentials] = useState({
    docex_id: "",
    password: "",
  });
  const [credentials_signup, setcredentials_signup] = useState({
    docex_id: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const handle_submit_login = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(`https://doc-ex.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docex_id: credentials.docex_id,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);

      const response2 = await fetch(
        `https://doc-ex.vercel.app/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "auth-token": json.authtoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docex_id: credentials.docex_id,
            password: credentials.password,
          }),
        }
      );
      const userData = await response2.json();
      console.log(userData);

      localStorage.setItem("user_info", userData.docex_id);

      setloading(false);
      navigate("/home");
    } else {
      setloading(false);
      navigate("/");
      alert("Invalid credentials!!");
    }
  };

  const onchange_login_credentials = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handle_submit_signup = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(
      `https://doc-ex.vercel.app/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docex_id: credentials_signup.docex_id,
          password: credentials_signup.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/home");

      setloading(false);
    } else {
      setloading(false);
      alert("Invalid credentials!!");
    }
  };
  const onchange_signup_credentials = (e) => {
    setcredentials_signup({
      ...credentials_signup,
      [e.target.name]: e.target.value,
    });
    console.log(credentials_signup);
  };

  const open_signup_modal = () => {
    let modal = document.getElementById("signup_modal_id");
    let back = document.getElementById("back_for_signup_id");
    modal.style.display = "flex";
    back.style.display = "flex";
  };
  const close_signup_modal = () => {
    let modal = document.getElementById("signup_modal_id");
    let back = document.getElementById("back_for_signup_id");
    modal.style.display = "none";
    back.style.display = "none";
  };
  useEffect(() => {
    close_signup_modal();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <div className="parent_landing">
        <p className="logo_landing">DocEx</p>
        <p className="head_para">
          your go-to platform for hassle-free note management..
        </p>
        <p className="head_content">
          {" "}
          With DocEx, you can easily create, edit, and delete notes with just a
          few clicks. We've simplified the sign-in process; no personal
          information required!
        </p>
        <div className="body_landing">
          <div className="body_back_landing">
            <div className="log_signup">
              <p className="do_to_id">Go to your DocEx ID</p>
              <form className="login_form" action="">
                <input
                  onChange={onchange_login_credentials}
                  className="login_docex_id"
                  type="text"
                  id="docex_id"
                  name="docex_id"
                  placeholder="Enter DocEx ID.."
                  required
                />
                <div className="pass_submit_back">
                  <input
                    onChange={onchange_login_credentials}
                    className="login_password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password.."
                    required
                  ></input>
                  <button onClick={handle_submit_login} className="goto_login">
                    Go
                  </button>
                </div>
              </form>
              <p className="user_creation_message">
                To Create a new DocEx ID{" "}
                <button
                  onClick={open_signup_modal}
                  className="click_to_create_user"
                >
                  Click Here
                </button>
              </p>
            </div>
            <p className="docex_details_landing">
              It's all about simplicity and ease, no need to strain your brain.
              Experience the future of note-taking with intuitive features
              designed for you. Join our community of users who trust DocEx to
              streamline their note-keeping tasks.
            </p>
          </div>
          <div className="created_notes_back_div_landing">
            <img src={created_notes_img} alt="" className="created_notes_img" />
            <p className="created_notes_para">
              DocEx's 'Created Notes' feature allows you to capture and manage
              your content effortlessly. Take charge of your note-taking
              experience with DocEx and enjoy the convenience of organized,
              easily retrievable notes at your fingertips.
            </p>
          </div>
        </div>

        <div className="footer_back_div">
          <div className="flexbox_footer">
            <a
              href="https://www.linkedin.com/in/aditya-dev-08b4251a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="takeme"
            >
              <LinkedInIcon
                sx={{ fontSize: 29, color: "black" }}
                className="contact_img_footer linkedin"
              />
            </a>
            <a
              href="mailto:your-email@iamadityadevpro@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="takeme"
            >
              <MailIcon
                sx={{ fontSize: 29, color: "black" }}
                className="contact_img_footer mail"
              />
            </a>
            <a
              href="https://github.com/iamAdityaDev"
              target="_blank"
              rel="noopener noreferrer"
              className="takeme"
            >
              <GitHubIcon
                sx={{ fontSize: 29, color: "black" }}
                className="contact_img_footer github"
              />
            </a>
            <a
              href="https://www.instagram.com/iam_aditya_dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="takeme"
            >
              <InstagramIcon
                sx={{ fontSize: 29, color: "black" }}
                className="contact_img_footer instagram"
              />
            </a>
          </div>
        </div>
      </div>

      {/* signup component */}
      <div className="back_for_signup" id="back_for_signup_id"></div>
      <div className="signup_back_landing" id="signup_modal_id">
        <div className="signup_modal">
          <CloseIcon onClick={close_signup_modal} className="close_sign_up" />
          <p className="create_here">Create Here</p>
          <p className="signup_info">
            Signing up for Docex is a breeze, no personal info needed! Just
            choose a unique Docex ID and a secure password, and you're ready to
            start saving and organizing your notes hassle-free.
          </p>

          <form action="" className="signup_form">
            <p className="create_docex_id_p">Create a unique DocEx ID</p>
            <input
              onChange={onchange_signup_credentials}
              className="signup_docex_id"
              type="text"
              name="docex_id"
              placeholder="ex. institute_note__iiitdwd.."
              required
            />
            <p className="create_docex_id_pass_p">Create your password</p>
            <input
              onChange={onchange_signup_credentials}
              className="signup_password"
              type="password"
              name="password"
              required
            ></input>
            <button onClick={handle_submit_signup} className="goto_signup">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Landing;
