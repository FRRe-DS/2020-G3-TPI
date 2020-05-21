const { Router } = require("express");


module.exports = ( { ConsultaController } ) => {
    const router = Router();
    
    router.get('/', ConsultaController.getConsultas.bind(ConsultaController));
    router.post("/", ConsultaController.createConsulta.bind(ConsultaController));

    return router;
}