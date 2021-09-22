import logo from "../../assets/img/icoLogo.png";
import "./Login.css";
import React from "react";
import { Redirect } from "react-router-dom";
import authService from "../../shared/services/auth.service";
import { setRefreshTime } from "../../shared/services/instanceAxios";

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
    authService.login(data)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data));
          authService.getMe().then(res => {
            if (res.data) {
              localStorage.setItem('user', JSON.stringify(res.data));
              setRedirect(true);
              window.location.reload();
            } else {
              setFormError('Adresse mail ou mot de passe incorrecte.');
            }
          })
        } else {
          setFormError('Adresse mail ou mot de passe incorrecte.');
        }
        
      })
      .catch((error) => {
          console.log(error);
          setFormError('Adresse mail ou mot de passe incorrecte.')
      });
  }
  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="LoginPage flex justify-center items-center">
      <div className="LoginPageBox p-4 bg-gray-300 rounded-xl shadow-sm">
        <div className="LogoIcoLogin">
          <img src={logo} alt="logo_ImmoCo" className="LogoIcoPicture" />
        </div>
        <div className="">
          <form onSubmit={(e) => submitForm(e)}>
            <h1 className="uppercase text-center align-middle text-blue-600 text-opacity-75 font-bold text-2xl font-sans">
              immoco
            </h1>            
            <div>Email</div>
            <input
              type="email"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              className="LoginMail grid grid-cols-1 justify-center bg-white m-2 p-2 rounded-md text-center"
              placeholder="@"
            />
            <p>{mailError}</p>
            <div>Mot de passe</div>
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={password}
              className="LoginPassword  grid grid-cols-1 justify-center bg-white m-2 p-2 rounded-md text-center"
              placeholder="mot de passe"
            />
            <p>{formError}</p>
            <input
              type="submit"
              value="Connexion"
              data-cy="LoginPageButton"
              className="LoginPageButton text-white uppercase w-1/2 grid grid-cols-1 font-bold pt-2 pb-2 rounded-2xl bg-blue-400 hover:bg-gradient-to-t hover:bg-blue-500 shadow-md "
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
