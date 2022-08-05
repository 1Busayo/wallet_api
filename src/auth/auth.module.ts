import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UsersSchema } from 'src/service/schemas/users.schema';
import { AuthController } from './auth.controller';

@Module({
imports:[
    MongooseModule.forFeature([
        {name:"Users" , schema: UsersSchema}
    ])
],

    controllers:[
        AuthController
    ]
})
export class AuthModule {
     
}