import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from "axios";
import "./style.css";

const yup = require("yup");

export default function Cadastro(){
    const navigate = useNavigate();

    const Cadastrar = (values) => {
        axios.post("http://localhost:3001/cadastrar",{
            nome: values.nome,
            email: values.email,
            password: values.password
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
        });
    }

    const validarCadastro = yup.object().shape({
        nome: yup
        .string()
        .required("O nome é obrigatório"),
        email: yup
        .string()
        .email("email inválido")
        .required("O email é obrigatório"),
        password: yup
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .required("A senha é obrigatória"),
    });
    

    return(
        <div className="container"> 
        <Formik
        initialValues={{}}
        onSubmit={Cadastrar}
        validationSchema={validarCadastro}
        >
            <div className="login">
            <div className="login-triangle"></div>
                <h2 className="login-header">Registro</h2>
                <Form className="login-container">
                    <p><Field name="nome" placeholder="Nome" /></p>
                    <ErrorMessage
                        component="span"
                        name="nome"
                    />
                    <p><Field name="email" placeholder="Email" /></p>
                    <ErrorMessage
                        component="span"
                        name="email"
                    />
                    <p><Field  name="password" placeholder="Senha"/></p>
                    <ErrorMessage
                        component="span"
                        name="password"
                    />
                <button type="submit" className="login-btn" onSubmit={Cadastrar} >SALVAR</button>
                <button type="button" className="register-btn" onClick={()=>{navigate("/")}}>VOLTAR</button>
                </Form>
        </div>
        </Formik>
            
    </div>
    )
}