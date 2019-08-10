const axios = require('axios');
const Dev = require('./../models/Dev');

module.exports = {
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