import React from "react";
import UserService from "../services/user.service";

const UserContext = React.createContext();

function InitializeUserContext({children}) {
    const [user, setUser] = React.useState(null);
    const userStorage = JSON.parse(localStorage.getItem('user'));
    React.useEffect(() => {
        console.log(userStorage);
        if(userStorage && userStorage.token){
            UserService.getMe().then((res) => {
                const userInfo = {
                    id: res.data.id,
                    role: res.data.user_type.value
                }
                setUser(userInfo);
            });
        }else{
            setUser(null);
        }
    }, [setUser, userStorage]);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function UseUserContext(){
    const context = React.useContext(UserContext);
    return context;
}

export {UseUserContext, InitializeUserContext};
