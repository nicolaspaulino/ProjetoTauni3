import express from 'express';
import CardapioController from '../controller/cardapio_Controller.js';

const router = express.Router();

router.get("/", CardapioController.listallprodutos);
router.get("/gerenciar", CardapioController.listallGerenciador);

router.post("/addproduto", CardapioController.addProduto);
router.get("/formAdd", CardapioController.paginagaAdd);

router.get("/editar/:id", CardapioController.paginaEditar);
router.post("/editar/:id", CardapioController.editarProduto);

router.get("/excluir/:id", CardapioController.excluirProduto);

router.get("/CardapioUser", CardapioController.listallprodutosUser);
router.post("/pedido", CardapioController.fazerPedido);

router.get("/pedidos/gerenciar", CardapioController.listarPedidos);
router.post("/pedidos/status/:id", CardapioController.atualizarStatus);
router.get("/pedidos/excluir/:id", CardapioController.excluirPedido);

export default router;
