import { NativeBaseProvider } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { UsuarioProvider } from "./components/context";
import Menu from "./components/Menu";

export default function App() {
	return (
		<UsuarioProvider>
			<NativeBaseProvider>
				<Menu />
				<StatusBar
					backgroundColor="blue"
					style="ligth"
					barStyle="dark-content"
				/>
			</NativeBaseProvider>
		</UsuarioProvider>
	);
}
