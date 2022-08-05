import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';
@Module({
  imports: [
  
   MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: MONGO_CONNECTION,
    }),
  }),
 
   ]

})
export class AppModule  {}
