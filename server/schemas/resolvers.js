const { AuthenticationError } = require('apollo-server-errors');
const { User } = require('../models');
const { signToken } = require("../utils/auth")

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
                const user = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

                return user;
            }

            throw new AuthenticationError('Login to continue!');
        }
    },
    Mutation: {
        addUser: (parent, args) => {
            const newUser = User.create(args);
            const token = signToken(newUser)

            return { newUser, token };
        },

        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }

    }
};

module.exports = resolvers;