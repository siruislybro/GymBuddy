import React, {createContext, useState} from 'react';

const UserContext = React.createContext();

// const UserContextProvider = ({ children }) => {
//     const [isDarkTheme, setDarkTheme] = useState(false);
//     // Function to toggle the theme
//     const toggleTheme = () => {
//         setDarkTheme(!isDarkTheme);
//     };

//     // Value to be provided by the UserContext
//     const contextValue = {
//         isDarkTheme,
//         toggleTheme,
//     };

//     return (
//         <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
//     );
// };

export default UserContext;
