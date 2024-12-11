import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Book } from '../book/entities/books.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Auditlog } from '../auditlog/entities/auditlog.entity';
import { Catalog } from '../catalog/entities/catalog.entity';
import { Feedback } from '../feedback/entities/feedback.entity';
import { Fine } from '../fine/entities/fine.entity';
import { Librarian } from '../librarian/entities/librarian.entity';
import { Notification } from '../notification/entities/notification.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Role } from 'src/auth/entities/role.entity';
import { Permission } from 'src/auth/entities/permission.entity';
import { RolePermission } from 'src/auth/entities/role-permission.entity';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1004',
  database: process.env.DB_NAME || 'library_manager',
  models: [
    User, 
    Book, 
    Loan, 
    Admin, 
    Auditlog, 
    Catalog, 
    Feedback, 
    Fine, 
    Librarian, 
    Notification, 
    Reservation,
    Role,
    Permission,
    RolePermission,
  ],
  autoLoadModels: true,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
};