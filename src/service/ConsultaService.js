const BaseService = require("./base.service");
const { Consulta } = require("../domain/models");
const axios = require("axios");

class ConsultaService extends BaseService {
    constructor({ UnitOfWork }) {
        super(UnitOfWork.ConsultaRepository, Consulta);
    }
    async getSinResponder(id) {
        const entity = await this._entityRepository.getSinResponder(id);
        return entity;
    }
    async getRespondidas(id) {
        const entity = await this._entityRepository.getRespondidas(id);
        return entity;
    }

    async recibirConsultasId() {
        let consultasID = await axios({
            method: 'get',
            timeout: 5000,
            url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/GetFormulariosIdByEstado/0'
        })
            .catch(error => {
                console.log(error.message)
            });
        return consultasID.data;
    }

    async recibirConsultasCompleta(estado) {
        let consultas;
        if (Number(estado) === 1) {
            consultas = await axios({
                method: 'get',
                timeout: 5000,
                url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/GetFormulariosByEstado/1'
            })
                .catch(error => {
                    console.log(error.message)
                });
        }
        else if (Number(estado) === 2) {
            consultas = await axios({
                method: 'get',
                timeout: 5000,
                url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/GetFormulariosByEstado/2'
            })
                .catch(error => {
                    console.log(error.message);
                })
        }
        else {
            consultas = await axios({
                method: 'get',
                timeout: 5000,
                url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/GetFormulariosByEstado/0'
            })
                .catch(error => {
                    console.log(error.message);
                })
        }
        return consultas.data;
    }

    async setRecibido(id) {
        let formularioId = id;
        await axios({
            method: 'post',
            timeout: 10000,
            url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/SetRecibido',
            data: formularioId
        })
            .catch(error => {
                console.log(error.message);
            })
    }

    async postDiagnostico(id, diag) {
        let formulario = {
            id: id,
            respuesta: diag
        };
        await axios({
            method: 'post',
            timeout: 5000,
            url: 'http://40.118.242.96:12600/api/FormularioParaAnalisis/Update',
            data: formulario
        })
            .catch(error => {
                console.log(error.message);
            });
    }

    async consultaByID(id, consultasNuevas) {
        let consultaSolicitada;
        for (const consulta of consultasNuevas) {
            if (consulta.id === Number(id)) {
                consultaSolicitada = consulta;
            }
        }
        return consultaSolicitada;
    }

    async consultaByDni(dni) {
        let consultasNuevas;
        let consultaSolicitada;
        await this.recibirConsultasCompleta(2)
            .then(consultas => consultasNuevas = consultas)
            .catch(error => {
                res.json({ msg: error.message })
            });
        for (const consulta of consultasNuevas) {
            if (Number(consulta.paciente.nroDeDocumento) === Number(dni)) {
                consultaSolicitada = consulta;
            }
        }
        return consultaSolicitada;
    }
}

module.exports = ConsultaService;
