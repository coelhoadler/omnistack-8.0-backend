const Dev = require('./../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers; // usuário logado
        const { devId } = req.params; // usuário que vai receber o like

        const loggedDev = await Dev.findById(user);
        const targertDev = await Dev.findById(devId);

        if (!targertDev) {
            return res.status(400).json({error: "O dev não foi localizado :("});
        }

        loggedDev.dislikes.push(targertDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
        
    }
};