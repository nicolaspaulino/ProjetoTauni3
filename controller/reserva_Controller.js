import Res from '../models/reserva.js';

const ReservaController = {


    PaginaReserva: (req, res) => {
        res.render('reserva', { layout: 'mainUser' });
    },

    addNewReserve: async (req, res) => {
        const {nome, E_mail, data, hora, qnt  } = req.body;
        try {
            await Res.create({ nome, E_mail, data, hora, qnt  });
            res.send("Sucesso ao enviar a mensagem!")
        } catch (error) {
            console.error("Erro ao adicionar mensagem:", error);
            res.status(500).send('Erro ao adicionar mensagem.');
        }
    },

};

export default ReservaController;
