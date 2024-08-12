import { Injectable } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { LibrarianService } from './librarian/librarian.service';
import { AuditlogService } from './auditlog/auditlog.service';
import { CatalogService } from './catalog/catalog.service';
import { FeedbackService } from './feedback/feedback.service';
import { FineService } from './fine/fine.service';
import { NotificationService } from './notification/notification.service';
import { ReserveService } from './reservation/reservation.service';
import { BookService } from './book/book.service';
import { LoanService } from './loan/loan.service';
import { StudentService } from './student/student.service';


import { CreateUserDto } from './user/dto/user.dto';
import { CreateAdminDto } from './admin/dto/admin.dto';
import { CreateLibrarianDto } from './librarian/dto/librarian.dto';
import { CreateAuditlogDto } from './auditlog/dto/auditlog.dto';
import { CreateCatalogDto } from './catalog/dto/catalog.dto';
import { CreateFeedbackDto } from './feedback/dto/feedback.dto';
import { CreateFineDto } from './fine/dto/fine.dto';
import { CreateNotificationDto } from './notification/dto/notification.dto';
import { CreateReservationDto } from './reservation/dto/reservation.dto';
import { CreateBookDto } from './book/dto/book.dto';
import { CreateLoanDto } from './loan/dto/loan.dto';
import { CreateStudentDto } from './student/dto/student.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly librarianService: LibrarianService,
    private readonly auditlogService: AuditlogService,
    private readonly catalogService: CatalogService,
    private readonly feedbackService: FeedbackService,
    private readonly fineService: FineService,
    private readonly notificationService: NotificationService,
    private readonly reserveService: ReserveService,
    private readonly bookService: BookService,
    private readonly loanService: LoanService,
    private readonly studentService: StudentService
  ) {}


  // Auth Methods
  login(loginDto: any): Promise<any> {
    return this.authService.login(loginDto);
  }

  // User Methods
  getAllUsers(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }

  getUser(id: string): Promise<CreateUserDto> {
    return this.userService.findOne(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }

  updateUser(id: string, createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.update(id, createUserDto);
  }

  deleteUser(id: string): Promise<void> {
    return this.userService.remove(id);
  }


  // Admin Methods
  getAllAdmins(): Promise<CreateAdminDto[]> {
    return this.adminService.findAll();
  }

  getAdmin(id: string): Promise<CreateAdminDto> {
    return this.adminService.findOne(id);
  }

  createAdmin(createAdminDto: CreateAdminDto): Promise<CreateAdminDto> {
    return this.adminService.create(createAdminDto);
  }

  updateAdmin(id: string, createAdminDto: CreateAdminDto): Promise<CreateAdminDto> {
    return this.adminService.update(id, createAdminDto);
  }

  deleteAdmin(id: string): Promise<void> {
    return this.adminService.remove(id);
  }


  // Librarian Methods
  getAllLibrarians(): Promise<CreateLibrarianDto[]> {
    return this.librarianService.findAll();
  }

  getLibrarian(id: string): Promise<CreateLibrarianDto> {
    return this.librarianService.findOne(id);
  }

  createLibrarian(createLibrarianDto: CreateLibrarianDto): Promise<CreateLibrarianDto> {
    return this.librarianService.create(createLibrarianDto);
  }

  updateLibrarian(id: string, createLibrarianDto: CreateLibrarianDto): Promise<CreateLibrarianDto> {
    return this.librarianService.update(id, createLibrarianDto);
  }

  deleteLibrarian(id: string): Promise<void> {
    return this.librarianService.remove(id);
  }


  // Auditlog Methods
  getAllAuditlogs(): Promise<CreateAuditlogDto[]> {
    return this.auditlogService.findAll();
  }

  getAuditlog(id: string): Promise<CreateAuditlogDto> {
    return this.auditlogService.findOne(id);
  }

  createAuditlog(createAuditlogDto: CreateAuditlogDto): Promise<CreateAuditlogDto> {
    return this.auditlogService.create(createAuditlogDto);
  }

  updateAuditlog(id: string, createAuditlogDto: CreateAuditlogDto): Promise<CreateAuditlogDto> {
    return this.auditlogService.update(id, createAuditlogDto);
  }

  deleteAuditlog(id: string): Promise<void> {
    return this.auditlogService.remove(id);
  }


  // Catalog Methods
  getAllCatalogs(): Promise<CreateCatalogDto[]> {
    return this.catalogService.findAll();
  }

  getCatalog(id: string): Promise<CreateCatalogDto> {
    return this.catalogService.findOne(id);
  }

  createCatalog(createCatalogDto: CreateCatalogDto): Promise<CreateCatalogDto> {
    return this.catalogService.create(createCatalogDto);
  }

  updateCatalog(id: string, createCatalogDto: CreateCatalogDto): Promise<CreateCatalogDto> {
    return this.catalogService.update(id, createCatalogDto);
  }

  deleteCatalog(id: string): Promise<void> {
    return this.catalogService.remove(id);
  }


  // Feedback Methods
  getAllFeedbacks(): Promise<CreateFeedbackDto[]> {
    return this.feedbackService.findAll();
  }

  getFeedback(id: string): Promise<CreateFeedbackDto> {
    return this.feedbackService.findOne(id);
  }

  createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<CreateFeedbackDto> {
    return this.feedbackService.create(createFeedbackDto);
  }

  updateFeedback(id: string, createFeedbackDto: CreateFeedbackDto): Promise<CreateFeedbackDto> {
    return this.feedbackService.update(id, createFeedbackDto);
  }

  deleteFeedback(id: string): Promise<void> {
    return this.feedbackService.remove(id);
  }


  // Fine Methods
  getAllFines(): Promise<CreateFineDto[]> {
    return this.fineService.findAll();
  }

  getFine(id: string): Promise<CreateFineDto> {
    return this.fineService.findOne(id);
  }

  createFine(createFineDto: CreateFineDto): Promise<CreateFineDto> {
    return this.fineService.create(createFineDto);
  }

  updateFine(id: string, createFineDto: CreateFineDto): Promise<CreateFineDto> {
    return this.fineService.update(id, createFineDto);
  }

  deleteFine(id: string): Promise<void> {
    return this.fineService.remove(id);
  }


  // Notification Methods
  getAllNotifications(): Promise<CreateNotificationDto[]> {
    return this.notificationService.findAll();
  }

  getNotification(id: string): Promise<CreateNotificationDto> {
    return this.notificationService.findOne(id);
  }

  createNotification(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto> {
    return this.notificationService.create(createNotificationDto);
  }

  updateNotification(id: string, createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto> {
    return this.notificationService.update(id, createNotificationDto);
  }

  deleteNotification(id: string): Promise<void> {
    return this.notificationService.remove(id);
  }


  // Reservation Methods
  getAllReservations(): Promise<CreateReservationDto[]> {
    return this.reserveService.findAll();
  }

  getReservation(id: string): Promise<CreateReservationDto> {
    return this.reserveService.findOne(id);
  }

  createReservation(createReservationDto: CreateReservationDto): Promise<CreateReservationDto> {
    return this.reserveService.create(createReservationDto);
  }

  updateReservation(id: string, createReservationDto: CreateReservationDto): Promise<CreateReservationDto> {
    return this.reserveService.update(id, createReservationDto);
  }

  deleteReservation(id: string): Promise<void> {
    return this.reserveService.remove(id);
  }

  // Book Methods
  getAllBooks(): Promise<CreateBookDto[]> {
    return this.bookService.findAll();
  }

  getBook(id: string): Promise<CreateBookDto> {
    return this.bookService.findOne(id);
  }

  createBook(createBookDto: CreateBookDto): Promise<CreateBookDto> {
    return this.bookService.create(createBookDto);
  }

  updateBook(id: string, createBookDto: CreateBookDto): Promise<CreateBookDto> {
    return this.bookService.update(id, createBookDto);
  }

  deleteBook(id: string): Promise<void> {
    return this.bookService.remove(id);
  }

  // Loan Methods
  getAllLoans(): Promise<CreateLoanDto[]> {
    return this.loanService.findAll();
  }

  getLoan(id: string): Promise<CreateLoanDto> {
    return this.loanService.findOne(id);
  } 

  createLoan(createLoanDto: CreateLoanDto): Promise<CreateLoanDto> {
    return this.loanService.create(createLoanDto);
  }

  updateLoan(id: string, createLoanDto: CreateLoanDto): Promise<CreateLoanDto> {
    return this.loanService.update(id, createLoanDto);
  }

  deleteLoan(id: string): Promise<void> {
    return this.loanService.remove(id);
  }

  // Student Methods
  getAllStudents(): Promise<CreateStudentDto[]> {
    return this.studentService.findAll();
  }

  getStudent(id: string): Promise<CreateStudentDto> {
    return this.studentService.findOne(id);
  }

  createStudent(createStudentDto: CreateStudentDto): Promise<CreateStudentDto> {
    return this.studentService.create(createStudentDto);
  }

  updateStudent(id: string, createStudentDto: CreateStudentDto): Promise<CreateStudentDto> {
    return this.studentService.update(id, createStudentDto);
  }

  deleteStudent(id: string): Promise<void> {
    return this.studentService.remove(id);
  }
  
}
