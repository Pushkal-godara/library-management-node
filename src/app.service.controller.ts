import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { LibrarianModule } from "./librarian/librarian.module";
import { AuditlogModule } from "./auditlog/auditlog.module";
import { CatalogModule } from "./catalog/catalog.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { FineModule } from "./fine/fine.module";
import { NotificationModule } from "./notification/notification.module";
import { ReservationModule } from "./reservation/reservation.module";
import { BookModule } from "./book/book.module";
import { LoanModule } from "./loan/loan.module";
import { StudentModule } from "./student/student.module";


@Module({
    imports: [ AuthModule, UserModule, AdminModule, LibrarianModule, AuditlogModule, CatalogModule, FeedbackModule, FineModule, NotificationModule, ReservationModule, BookModule, LoanModule, StudentModule],
    exports: [
        AuthModule, UserModule, AdminModule, LibrarianModule, AuditlogModule, CatalogModule, FeedbackModule, FineModule, NotificationModule, ReservationModule, BookModule, LoanModule, StudentModule
    ],
})
export class AppServiceModule {}