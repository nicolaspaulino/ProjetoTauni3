import Cardapio from "../models/Cardapio.js"
import Pedido from "../models/pedido.js";
import ItemPedido from "../models/itempedido.js";


const CardapioController = {

    listallprodutos: async (req, res) => {
        try {
            const mensagens = await Cardapio.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.render('cardapio', {
                cardapio: mensagens.map(msg => msg.toJSON())
            });              
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
            res.status(500).send('Erro ao buscar mensagens.');
        }
    },

    paginagaAdd: async (req, res) => {
        res.render("formularioAddproduto")
    },

    listallGerenciador: async (req, res) => {
        try {
            const mensagens = await Cardapio.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.render('PaginaGerenciar', {
                layout: "mainAdm",
                cardapio: mensagens.map(msg => msg.toJSON())
            });              
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
            res.status(500).send('Erro ao buscar mensagens.');
        }
    },

    addProduto: async (req, res) => {
        const { produto, tipo, preco } = req.body;
        try {
            await Cardapio.create({ tipo, produto, preco });
            res.send("Produto adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            res.status(500).send("Erro ao adicionar produto.");
        }
    },

    paginaEditar: async (req, res) => {
        try {
            const item = await Cardapio.findByPk(req.params.id);
            if (!item) return res.send("Item não encontrado!");
            res.render("gerenciarproduto", {
                layout: "mainAdm",
                item: item.toJSON(),
            });
        } catch (error) {
            console.error("Erro ao buscar item:", error);
            res.status(500).send("Erro ao buscar item.");
        }
    },

    editarProduto: async (req, res) => {
        const { produto, tipo, preco } = req.body;
        try {
            await Cardapio.update(
                { produto, tipo, preco },
                { where: { id: req.params.id } }
            );
            res.redirect("/cardapio/gerenciar");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).send("Erro ao atualizar produto.");
        }
    },

    excluirProduto: async (req, res) => {
        try {
            await Cardapio.destroy({ where: { id: req.params.id } });
            res.redirect("/cardapio/gerenciar");
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            res.status(500).send("Erro ao excluir produto.");
        }
    },

    listallprodutosUser: async (req, res) => {
      try {
          const mensagens = await Cardapio.findAll({
              order: [['createdAt', 'DESC']]
          });
          res.render('cardapioUser', {
              layout: "mainUser",
              cardapio: mensagens.map(msg => msg.toJSON())
          });              
      } catch (error) {
          console.error("Erro ao buscar mensagens (usuário):", error);
          res.status(500).send('Erro ao buscar mensagens.');
      }
  },

  fazerPedido: async (req, res) => {
    const { itens } = req.body;

    try {

        console.log("BODY RECEBIDO:", req.body);
        console.log("ITENS:", req.body.itens);

      let total = 0;
      itens.forEach(item => total += item.quantidade * item.preco);
  
      const pedido = await Pedido.create({ total });
  
      for (const item of itens) {
        await ItemPedido.create({
          produto: item.produto,
          quantidade: item.quantidade,
          preco: item.preco,
          pedidoId: pedido.id,
        });
      }
  
      res.send("Pedido realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer pedido:", error);
      res.status(500).send("Erro ao fazer pedido.");
    }
  },

  listarPedidos: async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: ItemPedido,
            order: [['createdAt', 'DESC']]
        });

        res.render("gerenciarPedidos", {
            layout: "mainAdm",
            pedidos: pedidos.map(p => p.toJSON())
        });

    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
        res.status(500).send("Erro ao listar pedidos.");
    }
},

atualizarStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await Pedido.update(
            { status },
            { where: { id } }
        );

        res.redirect("/cardapio/pedidos/gerenciar");

    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).send("Erro ao atualizar status.");
    }
},

excluirPedido: async (req, res) => {
    const { id } = req.params;

    try {
        await Pedido.destroy({
            where: { id }
        });

        res.redirect("/cardapio/pedidos/gerenciar");

    } catch (error) {
        console.error("Erro ao excluir pedido:", error);
        res.status(500).send("Erro ao excluir pedido.");
    }
}

}
export default CardapioController;
