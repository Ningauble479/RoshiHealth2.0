const User = require('./mongooseModels');
const { PubSub } = require('apollo-server');

//bcrypt stuff

const USER_ADDED = 'USER_ADDED';

const resolvers = {
    Query: {
        getUsers: async (parent, args, context) => {
            if(!context.req.user){
                console.log('wgat')
                return null
            }
            let data = await User.find().exec()
            return data
        },
        currentUser: (parent, args, context) => {
            let data = context.req.user
            return data
        },

    },
    Mutation: {
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
        },
        login: async (parent, { email, password }, context) => {
            const { user } = await context.authenticate('graphql-local', { email, password });
 
            console.log(context.login)
            context.login(user);
            return  {user}
        },
        signup: async (parent, {userName, email, password }, context) => {
          console.log({email: email})
          const userExists = await User.findOne({'email': email}, (err, data)=>{return data});
          console.log(userExists)
          let newUser = new User()
          if (userExists != null) {
            throw new Error('User with email already exists');
          }
    
          newUser.userName = userName
          newUser.email = email
          newUser.password = password
          
          newUser.save((err)=>{
              if(err) return err
          })

          await context.login(newUser);

          return { user: newUser };

        },
    },

};

module.exports = resolvers