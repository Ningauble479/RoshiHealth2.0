const { User } = require('./mongooseModels');
const { PubSub } = require('apollo-server');

//bcrypt stuff
const bcrypt = require('bcrypt');
const saltRounds = 10;

const USER_ADDED = 'USER_ADDED';

const pubsub = new PubSub();

const resolvers = {
    Subscription: {
        userAdded: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: () => pubsub.asyncIterator([USER_ADDED]),
        },
      },
    Query: {
        getUsers: async () => await User.find({}).exec()
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                pubsub.publish(USER_ADDED, { userAdded: args });
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        },
        updateUser: async (_, args) => {
            try {
                let response = await User.findOneAndUpdate(
                    {'_id': args.id},
                    {'userName': args.userName, 'email': args.email},
                    (err, data)=>{
                        if(err) return err
                        return {success: true, Data: data}

                    }

                    );
                return response;
            } catch (e) {
                return e.message
            }
        }
    },

};

module.exports = resolvers