import { AntDesign } from "@expo/vector-icons";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
	Box,
	Center,
	Divider,
	HStack,
	Icon,
	NativeBaseProvider,
	Pressable,
	Text,
	VStack,
} from "native-base";
import React, { useContext } from "react";
import Login from "../pages/Login";
import { UsuarioContext } from "../components/context";
import Alunos from "../pages/Alunos";
import CadastrarUsuario from "../pages/CadastrarUsuario";


const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
	switch (screenName) {
		case "Alunos":
			return "user";
		case "Login":
			return "login";
		case "Materia":
			return "book";
		case "Cadastro de usuário":
			return "adduser"
		case "Spam":
			return "alert-circle";
		default:
			return undefined;
	}
};

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="6" my="2" mx="1">
				<Box px="4">
					<Text bold color="gray.700">
						{props.usuario?.nome}
					</Text>
					<Text
						fontSize="14"
						mt="1"
						color="gray.500"
						fontWeight="500"
					>
						{props.usuario?.email}
					</Text>
				</Box>
				<VStack divider={<Divider />} space="4">
					<VStack space="3">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								bg={
									index === props.state.index
										? "rgba(6, 182, 212, 0.1)"
										: "transparent"
								}
								onPress={(event) => {
									props.navigation.navigate(name);
								}}
								key={index}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index
												? "primary.500"
												: "gray.500"
										}
										size="5"
										as={<AntDesign name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index
												? "primary.500"
												: "gray.700"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
}
function MyDrawer({ usuario }) {
	return (
		<Box safeArea flex={1}>
			<Drawer.Navigator
				drawerContent={(props) => (
					<CustomDrawerContent usuario={usuario} {...props} />
				)}
				screenOptions={{headerShown: usuario ? true : false}}
			>
				<Drawer.Screen name="Login" component={Login} />
				<Drawer.Screen name="Alunos" component={Alunos} />
				<Drawer.Screen name="Materia" component={Login} />
				<Drawer.Screen name="Cadastro de usuário" component={CadastrarUsuario} />
			</Drawer.Navigator>
		</Box>
	);
}
export default function App() {
	const { usuario } = useContext(UsuarioContext);
	return (
		<NavigationContainer>
			<MyDrawer usuario={usuario} />
		</NavigationContainer>
	);
}
