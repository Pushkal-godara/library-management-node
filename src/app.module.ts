import { UserModule } from './user/user.module'; 
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';
import { AdminModule } from './admin/admin.module';
import { AuditlogModule } from './auditlog/auditlog.module';
import { CatalogModule } from './catalog/catalog.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FineModule } from './fine/fine.module';
import { LibrarianModule } from './librarian/librarian.module';
import { NotificationModule } from './notification/notification.module';
import { ReservationModule } from './reservation/reservation.module';

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
    UserModule, BookModule, LoanModule, AdminModule, AuditlogModule, CatalogModule, FeedbackModule, FineModule, LibrarianModule, NotificationModule, ReservationModule
  ],
})
export class AppModule {}
