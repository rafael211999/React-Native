import React, { createContext, useState } from "react";
//import AsyncStorage from '@react-native-async-storage/async-storage';

//const estadoInicial = await AsyncStorage.getItem('@usuario');

export const UsuarioContext = createContext();
export const UsuarioProvider = ({ children }) => {
	const [usuario, setUsuario] = useState();

	return (
		<UsuarioContext.Provider
			value={{
				usuario,
				setUsuario,
			}}
		>
			{children}
		</UsuarioContext.Provider>
	);
};
