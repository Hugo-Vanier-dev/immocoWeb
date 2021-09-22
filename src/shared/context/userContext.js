import React from "react";

const UserContext = React.createContext();

function InitializeUserContext({children}) {
    const [user, setUser] = React.useState(null);
    
    React.useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if(userData){
            setUser(userData);
        }
        
    }, []);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function UseUserContext(){
    const context = React.useContext(UserContext);
    return context;
}

export {UseUserContext, InitializeUserContext};
