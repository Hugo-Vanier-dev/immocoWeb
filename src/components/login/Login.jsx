
import logo from '../../assets/img/IcoLogo.png'; 
import './Login.css';

function LoginPage() {
    return(
        <div className="LoginPage grid grid-cols-3 grid-flow-col">
            <div className="LoginPageBox border-4 border-white m-auto p-4 text-center bg-gray-200 rounded-xl shadow">
                <div className="LogoIco items-center m-5 shadow-md" >
                    <img src={logo} alt="logo_ImmoCo" className="LogoIcoPicture" />
                </div>
                <div className=" grid grid-rows-4">
                    <a className="uppercase text-center align-middle text-blue-800 underline text-opacity-75 font-bold text-2xl font-sans">immoco</a>
                    <input type="text" className="LoginMail grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center" placeholder="@" />
                    <input type="text" className="LoginPassword grid row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center" placeholder="mot de passe" />
                    <input type="button" value="Connexion" className="LoginPageButton text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow " />
                </div>
            </div>
        </div>
    )
}

export default LoginPage