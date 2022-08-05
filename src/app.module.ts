import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { UsersController } from './service/controllers/users.controller';
import { WalletController } from './service/controllers/wallet.controllers';
import { PaymentsController } from './service/controllers/payments.controllers';

@Module({
  imports: [
    ServiceModule  ,
    AuthModule,
   MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: MONGO_CONNECTION,
    }),
  }),
 
   ]

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GetUserMiddleware)
    .forRoutes(
      UsersController,
      WalletController,
      PaymentsController
    )
  }


}
