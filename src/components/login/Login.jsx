import logo from "../../assets/img/icoLogo.png";
import "./Login.css";
import React from "react";
import UserService from "../../shared/services/user.service";
import { Redirect } from "react-router-dom";

function LoginPage() {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState('');
  const [password, setPass] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  function submitForm(e) {
    e.preventDefault();
    if (!mailregex.test(mail)) {
      setMailError('L\'adresse mail que vous avez entré n\'est pas correct.');
    } else {
      setMailError('');
    }
    const data = {
      mail: mail,
      password: password,
    };
    UserService.login(data)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data));
        } else {
          setFormError('Adresse mail ou mot de passe incorrecte.');
        }
        UserService.getMe().then(res => {
          console.log(res.data);
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            setRedirect(true);
          } else {
            setFormError('Adresse mail ou mot de passe incorrecte.');
          }
        })
      })
      .catch((error) => {
          console.log(error);
          setFormError('Adresse mail ou mot de passe incorrecte.')
      });
  }
  if (redirect) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="LoginPage flex">
      <div className="LoginPageBox justify-between border-4 border-white m-auto p-4 text-center bg-gradient-to-t from-gray-50 to-gray-300 rounded-xl shadow-xl">
        <div className="LogoIcoLogin m-5 shadow-md">
          <img src={logo} alt="logo_ImmoCo" className="LogoIcoPicture" />
        </div>
        <div className="">
          <form onSubmit={(e) => submitForm(e)}>
            <h1 className="uppercase text-center align-middle text-blue-800 text-opacity-75 font-bold text-2xl font-sans">
              immoco
            </h1>
            <input
              type="email"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              className="LoginMail grid grid-cols-1 justify-center border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
              placeholder="@"
            />
            <p>{mailError}</p>
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={password}
              className="LoginPassword  grid grid-cols-1 justify-center border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
              placeholder="mot de passe"
            />
            <p>{formError}</p>
            <input
              type="submit"
              value="Connexion"
              className="LoginPageButton text-green-200 hover:text-yellow-50 uppercase w-1/2 grid grid-cols-1 font-bold pt-2 pb-2 rounded-2xl bg-gradient-to-t from-green-400 to-green-300 border-2 border-green-200 hover:bg-gradient-to-t hover:from-green-500 hover:to-green-300 hover:border-yellow-50 shadow hover:shadow-sm "
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
