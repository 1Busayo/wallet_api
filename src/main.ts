import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,ValidationError } from '@nestjs/common';
import {ValidationException} from './filters/validation.exception';

import {HttpExceptionFilter} from './filters/http.filter';
import {FallbackExceptionFilter} from './filters/fallback.filter';
import {ValidationFilter} from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
);


 /* * Apply validation for all inputs globally
  */
 app.useGlobalPipes(new ValidationPipe({
  transform:true,
  skipMissingProperties:true,
  exceptionFactory: (errors: ValidationError[]) => {

      const messages = errors.map(
          error=> `${error.property} has wrong value ${error.value},
          ${Object.values(error.constraints).join(', ')} `
      );

      return new ValidationException(messages);
  }
}));

  await app.listen(process.env.PORT || 3000)
}
bootstrap();
