import { User } from "../../models/UserSchema.js";

export const UserService = {

    internalFields: ["-_internal", "-_tags", "-__v"],

    get: (id) => {
        return User.findById(id)
            .select(UserService.internalFields)
    },

    create: (data) => User.create(data),

    update: async (id, data) => {
        try {

            console.log(`data: ${JSON.stringify(data)}`);

            if (data.name) {
                Object.entries(data.name).forEach(([ key, value]) => {
                    data[`name.${key}`] = value;
                })
                delete data.name
            }

            console.log(`data: ${JSON.stringify(data)}`);

            return await User.findByIdAndUpdate(
                id,
                {$set: data},
                {new: true}
            ).select(UserService.internalFields)

        } catch ( err ){
            throw err;
        }
    },

    delete: (id) => User.findByIdAndDelete(id)

};