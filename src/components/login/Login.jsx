import logo from "../../assets/img/IcoLogo.png";
import "./Login.css";
import React from "react";
import UserService from "../../services/user.service";
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
      .then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setFormError('Adresse mail ou mot de passe incorrecte.');
        }
      });
  }
  if(redirect){
      return <Redirect to="/home" />;
  }
  return (
    <div className="LoginPage grid grid-rows-1 place-content-center">
      <div className="LoginPageBox border-4 border-white m-auto p-4 text-center bg-gray-200 rounded-xl shadow-xl">
        <div className="LogoIcoTop items-center m-5 shadow-md">
          <img src={logo} alt="logo_ImmoCo" className="LogoIcoPicture" />
        </div>
        <div className=" grid grid-rows-4">
          <form onSubmit={(e) => submitForm(e)}>
            <h1 className="uppercase text-center align-middle text-blue-800 text-opacity-75 font-bold text-2xl font-sans">
              immoco
            </h1>
            <input
              type="email"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              className="LoginMail grid  row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
              placeholder="@"
            />
            <p>{mailError}</p>
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={password}
              className="LoginPassword grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
              placeholder="mot de passe"
            />
            <p>{formError}</p>
            <input
              type="submit"
              value="Connexion"
              className="LoginPageButton text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
