import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios  from 'axios';
import './style.css';

const yup = require("yup");


export default function Login() {
    const navigate = useNavigate();

    const doLogin = (values) => {
        axios.post('http://localhost:3001/login', {
            email: values.email,
            password: values.password
        })
        .then((response) => {
            if(response.data.msg !== 'Usuário logado'){
                alert(response.data.msg);
            }else{
                navigate('/homepage');
            }           
        });
}


const validarLogin = yup.object().shape({
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
                onSubmit={doLogin}
                validationSchema={validarLogin}
            >
            <div className="login">
                <div className="login-triangle"></div>
                    <h2 className="login-header">Login</h2>
                    <Form className="login-container">
                        <p><Field name="email" placeholder="Email" /></p>
                        <ErrorMessage
                            component="span"
                            name="email"                            
                        />
                        <p><Field name="password" type="password" placeholder="Senha"  /></p>
                        <ErrorMessage
                            component="span"
                            name="password"                            
                        />
                    <button type="submit" className="login-btn" >LOGAR</button>
                    <button type="button" className="register-btn" onClick={()=>{navigate("/cadastro")}}>CADASTRO</button>
                    </Form>
                    <h1></h1>
            </div>
            </Formik>
        </div>
    )
}