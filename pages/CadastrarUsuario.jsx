import axios from "axios";
import {
	Actionsheet,
	AlertDialog,
	Button,
	Input,
	useDisclose,
} from "native-base";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { Container } from "../components/Container";
import Title from "../components/Title";

const CadastrarUsuario = ({ navigation }) => {
	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const { isOpen, onOpen, onClose } = useDisclose();
	const [isOpenCreated, setIsOpenCreated] = useState(false);
	const cancelRef = React.useRef(null);
	// const [resposta, setResposta] = useState();

	const cadastrar = () => {
		axios
			.post("https://secret-headland-69654.herokuapp.com/usuario", {
				nome,
				email,
				senha,
			})
			.then((response) => {
				if (response.status === 201) {
					setIsOpenCreated(true);
					onClose();
					limparCampos();
				}
			});
	};

	const limparCampos = () => {
		setNome("");
		setEmail("");
		setSenha("");
	};

	return (
		<Container>
			<Title>Novo usuário</Title>

			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpenCreated}
				onClose={() => setIsOpenCreated(false)}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Usuário criado</AlertDialog.Header>
					<AlertDialog.Body>
						O usuário criado com sucesso
					</AlertDialog.Body>
				</AlertDialog.Content>
			</AlertDialog>

			<Actionsheet isOpen={isOpen} onClose={onClose} size="full" />

			<Input
				mx="3"
				placeholder="Nome"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ marginTop: 20 }}
				onChangeText={setNome}
				value={nome}
				keyboardType="default"
			/>
			<Input
				mx="3"
				placeholder="E-mail"
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
				placeholder="Senha"
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
			<Button
				style={{ marginTop: 20 }}
				size="lg"
				onPress={() => {
					cadastrar();
					navigation.goBack();
				}}
			>
				Cadastrar
			</Button>
		</Container>
	);
};

export default CadastrarUsuario;
