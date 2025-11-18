import Fale from '../models/faleconosco.js';

const faleController = {

    PaginaFale: (req, res)=>{
        res.render('formulario', { layout: 'mainUser' }) 
    },

    addNewMessage: async (req, res) => {
        const { nome, email, comentario } = req.body;
        try {
            await Fale.create({ nome, email, comentario });
            res.send("Sucesso ao enviar a mensagem!")
        } catch (error) {
            console.error("Erro ao adicionar mensagem:", error);
            res.status(500).send('Erro ao adicionar mensagem.');
        }
    },

};

export default faleController;
