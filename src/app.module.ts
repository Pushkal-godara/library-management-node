import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Book } from './book/entities/books.entity';
import { Loan } from './loan/entities/loan.entity';
import { Admin } from './admin/entities/admin.entity';
import { Auditlog } from './auditlog/entities/auditlog.entity';
import { Catalog } from './catalog/entities/catalog.entity';
import { Feedback } from './feedback/entities/feedback.entity';
import { Fine } from './fine/entities/fine.entity';
import { Librarian } from './librarian/entities/librarian.entity';
import { Notification } from './notification/entities/notification.entity';
import { Reservation } from './reservation/entities/reservation.entity';

import { AppServiceModule } from './app.service.module';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1004',
      database: 'library_manager',
      models: [User, Book, Loan, Admin, Auditlog, Catalog, Feedback, Fine, Librarian, Notification, Reservation],
      autoLoadModels: true,
      synchronize: false,
    }),
    AppServiceModule,
    AuthModule
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
