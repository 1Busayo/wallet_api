import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';
import { ServiceModule } from './service/service.module';
@Module({
  imports: [
    ServiceModule  ,
   MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: MONGO_CONNECTION,
    }),
  }),
 
   ]

})
export class AppModule  {}
