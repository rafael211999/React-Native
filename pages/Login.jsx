import axios from "axios";
import {
	Alert,
	Button,
	CloseIcon,
	HStack,
	IconButton,
	Input,
	Text,
	VStack,
	Collapse,
} from "native-base";
import React, { useContext, useState } from "react";
import "react-native-gesture-handler";
import { Container } from "../components/Container";
import { UsuarioContext } from "../components/context";
import Title from "../components/Title";


const Login = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [mostrarMensagemErro, setMostrarMensagemErro] = useState(false);
	const { setUsuario } = useContext(UsuarioContext);

	const eferuarLogin = () => {
		axios
			.post("https://secret-headland-69654.herokuapp.com/logar", {
				email,
				senha,
			})
			.then((result) => {
				setUsuario(result.data);
				navigation.navigate('Alunos')
			})
			.catch((erro) => {
				setMostrarMensagemErro(true);
			});
	};

	return (
		<Container>
			<Title> Serratec app</Title>
			<Collapse isOpen={mostrarMensagemErro}>
				<Alert w="100%" status={"error"} mt="5">
					<VStack space={2} flexShrink={1} w="100%">
						<HStack
							flexShrink={1}
							space={2}
							justifyContent="space-between"
						>
							<HStack space={2} flexShrink={1}>
								<Alert.Icon mt="1" />
								<Text fontSize="md" color="coolGray.800">
									{"Usuário ou senha incorretos"}
								</Text>
							</HStack>
							<IconButton
								variant="unstyled"
								icon={
									<CloseIcon size="3" color="coolGray.600" />
								}
								onPress={() => {
									setMostrarMensagemErro(false);
								}}
							/>
						</HStack>
					</VStack>
				</Alert>
			</Collapse>
			<Input
				mx="3"
				placeholder="Seu e-mail"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ marginTop: 20 }}
				onChangeText={setEmail}
				value={email}
				keyboardType="default"
			/>
			<Input
				mx="3"
				placeholder="Sua senha"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ margin: 20 }}
				onChangeText={setSenha}
				value={senha}
				Type="password"
				secureTextEntry={true}
			/>
			<Button size="lg" onPress={() => eferuarLogin()}>
				Login
			</Button>
			<Button
				style={{ marginTop: 20 }}
				size="lg"
				onPress={() => {
					navigation.navigate("Cadastro de usuário");
				}}
			>
				Cadastro
			</Button>
		</Container>
	);
};

export default Login;
