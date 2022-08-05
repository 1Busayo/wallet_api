import { Module } from "@nestjs/common";
 import { MongooseModule } from "@nestjs/mongoose";
 import { UsersRepo } from "./repositories/users.repo";
import { UsersController } from "./controllers/users.controller";
import { UsersSchema } from "./schemas/users.schema";
import { WalletController } from "./controllers/wallet.controllers";
import { WalletRepo } from "./repositories/wallet.repo";
import { WalletSchema } from "./schemas/wallet.schema";
import { PaymentSchema } from "./schemas/payment.schema";
import { PaymentsRepo } from "./repositories/payment.repo";
import { PaymentsController } from "./controllers/payments.controllers";
import { RefundSchema } from "./schemas/refund.schema";
import { RefundsRepo } from "./repositories/refund.repo";


@Module({
    imports:[
       MongooseModule.forFeature([
        {name: "Users", schema: UsersSchema},
        {name:"Wallets", schema: WalletSchema},
         {name:"Payments", schema: PaymentSchema},
         {name:"Refunds", schema: RefundSchema}
         

       ])
       
    ],
    
    controllers:[
        UsersController,
        WalletController,
         PaymentsController
         
        
    ],
    providers:[
       UsersRepo,
       WalletRepo,
       PaymentsRepo,
       RefundsRepo
      
 ]
})
export class ServiceModule {

}