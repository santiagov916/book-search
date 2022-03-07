const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
            .select('-__v -password')
        },

        user: async (parent, { username }) => {
            const params = username ? { username }: {};
            return User.find(params).sort({ username });
        }
    }
};

module.exports = resolvers;