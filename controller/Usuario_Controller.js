import User from '../models/Usuario.js';
import bcrypt from 'bcrypt';

const UserController = {

    criarUserPadrao: async () => {
        try {
          const UserExist = await User.findOne({ where: { nome: "bianca" } });
    
          if (!UserExist) {
            const hashedPassword = await bcrypt.hash("123", 10);
    
            await User.create({ 
              nome: "bianca", 
              senha: hashedPassword 
            });
    
            console.log("User padrão criado: bianca / 123");
          } else {
            console.log("ℹ User padrão já existe");
          }
        } catch (error) {
          console.error("Erro ao criar user padrão:", error);
        }
      },

    PaginaUser: (req, res) => {
        res.render('usuarios');
    },

    addNewUser: async (req, res) => {
        const { nome, senha } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(senha, 10);
    
            await User.create({ 
                nome, 
                senha: hashedPassword 
            });
            console.log("Usuario: " + nome + " criado com sucesso!")
            res.redirect('/user');
        } catch (error) {
            console.error("Erro ao registrar-se:", error);
            res.status(500).send('Erro ao registrar-se.');
        }
    },
    
    PaginaUserLogin: (req, res) => {
        res.render('loginUser');
    },

    authentication: async (req, res) => {
        const { nome, senha } = req.body;
    
        try {
            const user = await User.findOne({ where: { nome } });
    
            if (!user) {
                return res.render("loginUser", {
                    error: 'Usuário ou senha inválida'
                });
            }
            const isMatch = await bcrypt.compare(senha, user.senha);
    
            if (isMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
    
                return req.session.save(err => {
                    res.redirect('/user/dashboard');
                });
            }
    
            return res.render("loginUser", {
                error: 'Usuário ou senha inválida'
            });
    
        } catch (err) {
            console.error(err);
            res.render('loginUser', { error: 'Ocorreu um erro no login.' });
        }
    },

    getDashboard: (req, res) => {
        if (req.session.isLoggedIn) {
            return res.render('principaluser', {
                layout: "mainUser",
                username: req.session.user.nome
            });
        }
        res.redirect('/user');
    },
    
    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) console.error('Erro ao fazer logout:', err);
            res.redirect('/user');
        });
    }

};

UserController.criarUserPadrao();
export default UserController;
