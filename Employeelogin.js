import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {setToken} from './Auth.js'
import "./login.css";
 
const EmployeeLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const [error, setError] = useState('')
    const navigate = useNavigate()
     
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/Adminlogin", {
          username: username,
          password: password,
        })
        .then(res => {
            console.log(res);
            if(res.data.Status === 'Success') {
        console.log(res.data.Token);
        setToken(res.data.Token)
                navigate('/');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          login(e);
        }
      };
    
    return (
        <div className="container login-container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-3">
              <form onKeyDown={handleKeyPress} className="login-form">
                <div className="text-center mb-3">
                  <img
                    src="images/logo.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: "40%", height: "auto" }}
                  />
                  <p>Office of the City Engineer</p>
                  <p>Employee</p>
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group mb-2 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      style={{ color: "black" }}
                    />
                  </button>
                </div>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={login}
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 mb-0">
                    Login as{" "}
                    <a href="Adminlogin" className="link-success">
                      Admin
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
   
export default EmployeeLogin;