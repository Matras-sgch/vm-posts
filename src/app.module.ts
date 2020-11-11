import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaneModule } from './plane/plane.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth-nest-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
    PlaneModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
