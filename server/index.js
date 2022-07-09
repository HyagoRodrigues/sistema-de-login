const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const saltRounds = 10;



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'acesso123',
    database: 'loginsystem'
})

app.use(express.json());
app.use(cors());



//cadastrando usuário
    app.post('/cadastrar', async (req, res) => {
        const { nome, email, password } = req.body;
        

        db.query("SELECT * FROM loginsystem.usuarios WHERE email = ?", [email], (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            if(result.length === 0){
                bcrypt.hash(password, saltRounds, (err, hash) =>{
                    db.query(
                        "INSERT INTO loginsystem.usuarios (nome, email, password) VALUES (?, ?, ?)",
                        [nome, email, hash],
                        (err, result) => {
                            if(err){
                                console.log(err);
                                res.status(500).send(err);
                            }
                            res.send({msg: "Usuário cadastrado com sucesso!"});
                        }
                    );
                });
            }else{
                res.send({msg: "Email já cadastrado!"});
            }
    });
});


//logando usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM loginsystem.usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
          }
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (error) {
                res.send(error);
                res.status(500).send(error);
              }
              if (response) {
                res.send({ msg: "Usuário logado" });
                res.status(200)
            
              } else {
                res.send({ msg: "Senha incorreta" });
                res.status(401);
              }
            });
          } else {
            res.send({ msg: "Usuário não registrado!" });
            res.status(401);
          }
        });;
});    


app.listen(3001, () => {
    console.log('Server running on port 3001');
});