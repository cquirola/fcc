const DocumentacionService = require('../../services/comunidad.services/documentacion.service');
const service = new DocumentacionService();


const create = async ( req, res ) => {
    try {
        const { body, file } = req;
        const response = await service.createWithFile(body, file);
        res.json({ success: true, data: response});

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, file } = req;
        const response = await service.updateWithFile(id, body, file);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



module.exports = {
    create, get, getById, update, _delete
};
