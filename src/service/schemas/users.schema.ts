import * as mongoose from 'mongoose';

import * as bcrypt from 'bcrypt';




export const UsersSchema = new mongoose.Schema({




    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallets'
    }

});

UsersSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});
