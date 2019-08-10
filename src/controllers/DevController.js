const axios = require('axios');
const Dev = require('./../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, // não seja o mesmo usuário
                { _id: { $nin: loggedDev.likes } }, // não pode ser usuários que dei like
                { _id: { $nin: loggedDev.dislikes } } // não pode ser usuários que dei dislike
            ]
        });

        return res.json(users);
    },
    async store(req, res) {
        const { username: user } = req.body;
        const url = `https://api.github.com/users/${user}`;
        const usersExists = await Dev.findOne({ user });

        if (usersExists) {
            return res.json(usersExists);
        }

        const response = await axios.get(url);
        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar
        });

        return res.json(dev);
    }
}

// boas práticas para construão de uma API
// INDEX, SHOW, STORE, UPDATE, DELETE (5) = máximo de métodos que a gente pode ter em um controller