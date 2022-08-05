import { Module } from "@nestjs/common";
 import { MongooseModule } from "@nestjs/mongoose";
 import { UsersRepo } from "./repositories/users.repo";
import { UsersController } from "./controllers/users.controller";
import { UsersSchema } from "./schemas/users.schema";



@Module({
    imports:[
       MongooseModule.forFeature([
        {name: "Users", schema: UsersSchema},
         

       ])
       
    ],
    
    controllers:[
        UsersController,
         
        
    ],
    providers:[
       UsersRepo,
      
 ]
})
export class ServiceModule {

}