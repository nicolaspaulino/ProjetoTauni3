import Adm from '../models/Admin.js';
import bcrypt from 'bcrypt';

const admController = {

  criarAdminPadrao: async () => {
    try {
      const adminExistente = await Adm.findOne({ where: { name: "admin" } });

      if (!adminExistente) {
        const hashedPassword = await bcrypt.hash("123", 10);

        await Adm.create({ 
          name: "admin", 
          password: hashedPassword 
        });

        console.log("Administrador padrão criado: admin / 123");
      } else {
        console.log("ℹ Administrador padrão já existe");
      }
    } catch (error) {
      console.error("Erro ao criar admin padrão:", error);
    }
  },

  PaginaAdm: (req, res) => {
    res.render('admin');
  },

  addNewAdm: async (req, res) => {
    const { name, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await Adm.create({ name, password: hashedPassword });

      res.send("Sucesso ao registrar administrador!");
    } catch (error) {
      console.error("Erro ao registrar-se:", error);
      res.status(500).send('Erro ao registrar-se.');
    }
  },

  PaginaAdmLogin: (req, res) => {
    res.render('loginAdm');
  },

  authentication: async (req, res) => {
    const { name, password } = req.body;

    try {
      const admin = await Adm.findOne({ where: { name } });

      if (!admin) {
        return res.render("loginAdm", { 
          error: 'Nome ou senha incorretos!' 
        });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.render("loginAdm", { 
          error: 'Nome ou senha incorretos!' 
        });
      }

      req.session.isAdmLoggedIn = true;
      req.session.admin = admin;

      return req.session.save(() => {
        res.redirect('/adm/dashboard'); 
      });

    } catch (error) {
      console.error("Erro ao autenticar admin:", error);
      res.status(500).send('Erro ao autenticar admin.');
    }
  },

  getDashboard: (req, res) => {
    if (req.session.isAdmLoggedIn) {
      return res.render("principaladm", { 
        layout: "mainAdm",
        name: req.session.admin.name
      });
    }

    res.redirect('/adm');
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error(err);
      res.redirect('/adm');
    });
  }

};

admController.criarAdminPadrao();

export default admController;
