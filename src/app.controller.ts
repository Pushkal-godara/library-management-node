import { Controller, Get, Put, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/user.dto';
import { CreateAdminDto } from './admin/dto/admin.dto';
import { CreateLoanDto } from './loan/dto/loan.dto';
import { CreateFineDto } from './fine/dto/fine.dto';
import { CreateNotificationDto } from './notification/dto/notification.dto';
import { CreateReservationDto } from './reservation/dto/reservation.dto';
import { CreateBookDto } from './book/dto/book.dto';
import { CreateStudentDto } from './student/dto/student.dto';
import { CreateCatalogDto } from './catalog/dto/catalog.dto';
import { CreateFeedbackDto } from './feedback/dto/feedback.dto';
import { CreateLibrarianDto } from './librarian/dto/librarian.dto';
import { CreateAuditlogDto } from './auditlog/dto/auditlog.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

//   // Users CRUD
//   @Get()
//   getUsers() {
//     return this.appService.getAllUsers();
//   }

//   @Get(':id')
//   getUser(@Param('id') id: string) {
//     return this.appService.getUser(id);
//   }

//   @Post()
//   createUser(@Body() createUserDto: CreateUserDto) {
//     return this.appService.createUser(createUserDto);
//   }

//   @Patch(':id')
//   updateUser(@Param(':id') id: string, @Body() updateUserDto: CreateUserDto) {
//     return this.appService.updateUser(id, updateUserDto);
//   }

//   @Delete(':id')
//   deleteUser(@Param('id') id: string) {
//     return this.appService.deleteUser(id);
//   }


//   // Admins CRUD
//   @Get('admin')
//   getAdmins() {
//     return this.appService.getAllAdmins();
//   }

//   @Get('admin/:id')
//   getAdmin(@Param('id') id: string) {
//     return this.appService.getAdmin(id);
//   }

//   @Post('admin')
//   createAdmin(@Body() createAdminDto: CreateAdminDto) {
//     return this.appService.createAdmin(createAdminDto);
//   }

//   @Patch('admin/:id')
//   updateAdmin(@Param('id') id: string, @Body() createAdminDto: CreateAdminDto) {
//     return this.appService.updateAdmin(id, createAdminDto);
//   }

//   @Delete('admin/:id')
//   deleteAdmin(@Param('id') id: string) {
//     return this.appService.deleteAdmin(id);
//   }


// // Loan CRUD
//   @Get('loan')
//   getLoans() {
//     return this.appService.getAllLoans();
//   }

//   @Get('loan/:id')
//   getLoan(@Param('id') id: string) {
//     return this.appService.getLoan(id);
//   }

//   @Post('loan')
//   createLoan(@Body() createLoanDto: CreateLoanDto) {
//     return this.appService.createLoan(createLoanDto);
//   }

//   @Patch('loan/:id')
//   updateLoan(@Param('id') id: string, @Body() createLoanDto: CreateLoanDto) {
//     return this.appService.updateLoan(id, createLoanDto);
//   }

//   @Delete('loan/:id')
//   deleteLoan(@Param('id') id: string) {
//     return this.appService.deleteLoan(id);
//   }


//   // Fine CRUD
//   @Get('fine')
//   getFines() {
//     return this.appService.getAllFines();
//   }

//   @Get('fine/:id')
//   getFine(@Param('id') id: string) {
//     return this.appService.getFine(id);
//   }

//   @Post('fine')
//   createFine(@Body() createFineDto: CreateFineDto) {
//     return this.appService.createFine(createFineDto);
//   }

//   @Patch('fine/:id')
//   updateFine(@Param('id') id: string, @Body() createFineDto: CreateFineDto) {
//     return this.appService.updateFine(id, createFineDto);
//   }

//   @Delete('fine/:id')
//   deleteFine(@Param('id') id: string) {
//     return this.appService.deleteFine(id);
//   }


//   // Notification CRUD
//   @Get('notification')
//   getNotifications() {
//     return this.appService.getAllNotifications();
//   }

//   @Get('notification/:id')
//   getNotification(@Param('id') id: string) {
//     return this.appService.getNotification(id);
//   }

//   @Post('notification')
//   createNotification(@Body() createNotificationDto: CreateNotificationDto) {
//     return this.appService.createNotification(createNotificationDto);
//   }

//   @Patch('notification/:id')
//   updateNotification(@Param('id') id: string, @Body() createNotificationDto: CreateNotificationDto) {
//     return this.appService.updateNotification(id, createNotificationDto);
//   }

//   @Delete('notification/:id')
//   deleteNotification(@Param('id') id: string) {
//     return this.appService.deleteNotification(id);
//   }


//   // Catalog CRUD
//   @Get('catalog')
//   getCatalogs() {
//     return this.appService.getAllCatalogs();
//   }

//   @Get('catalog/:id')
//   getCatalog(@Param('id') id: string) {
//     return this.appService.getCatalog(id);
//   }

//   @Post('catalog')
//   createCatalog(@Body() createCatalogDto: CreateCatalogDto) {
//     return this.appService.createCatalog(createCatalogDto);
//   }

//   @Patch('catalog/:id')
//   updateCatalog(@Param('id') id: string, @Body() createCatalogDto: CreateCatalogDto) {
//     return this.appService.updateCatalog(id, createCatalogDto);
//   }

//   @Delete('catalog/:id')
//   deleteCatalog(@Param('id') id: string) {
//     return this.appService.deleteCatalog(id);
//   }

//   // Feedback CRUD
//   // @Get()
//   // getFeedbacks() {
//   //   return this.appService.getAllFeedbacks();
//   // }

//   // @Get()
//   // getFeedback(@Param('id') id: string) {
//   //   return this.appService.getFeedback(id);
//   // }

//   // @Post()
//   // createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
//   //   return this.appService.createFeedback(createFeedbackDto);
//   // }

//   // @Patch()
//   // updateFeedback(@Param('id') id: string, @Body() createFeedbackDto: CreateFeedbackDto) {
//   //   return this.appService.updateFeedback(id, createFeedbackDto);
//   // }

//   // @Delete()
//   // deleteFeedback(@Param('id') id: string) {
//   //   return this.appService.deleteFeedback(id);
//   // }


//   // Auditlog CRUD
//   @Get('auditlog')
//   getAuditlogs() {
//     return this.appService.getAllAuditlogs();
//   }

//   @Get('auditlog/:id')
//   getAuditlog(@Param('id') id: string) {
//     return this.appService.getAuditlog(id);
//   }

//   @Post('auditlog')
//   createAuditlog(@Body() createAuditlogDto: CreateAuditlogDto) {
//     return this.appService.createAuditlog(createAuditlogDto);
//   }

//   @Patch('auditlog/:id')
//   updateAuditlog(@Param('id') id: string, @Body() createAuditlogDto: CreateAuditlogDto) {
//     return this.appService.updateAuditlog(id, createAuditlogDto);
//   }

//   @Delete('auditlog/:id')
//   deleteAuditlog(@Param('id') id: string) {
//     return this.appService.deleteAuditlog(id);
//   }


//   // Book CRUD
//   @Get('book')
//   getBooks() {
//     return this.appService.getAllBooks();
//   }

//   @Get('book/:id')
//   getBook(@Param('id') id: string) {
//     return this.appService.getBook(id);
//   }

//   @Post('book')
//   createBook(@Body() createBookDto: CreateBookDto) {
//     return this.appService.createBook(createBookDto);
//   }

//   @Patch('book/:id')
//   updateBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
//     return this.appService.updateBook(id, createBookDto);
//   }

//   @Delete('book/:id')
//   deleteBook(@Param('id') id: string) {
//     return this.appService.deleteBook(id);
//   }


//   // Student CRUD
//   @Get('student')
//   getStudents() {
//     return this.appService.getAllStudents();
//   }

//   @Get('student/:id')
//   getStudent(@Param('id') id: string) {
//     return this.appService.getStudent(id);
//   }

//   @Post('student')
//   createStudent(@Body() createStudentDto: CreateStudentDto) {
//     return this.appService.createStudent(createStudentDto);
//   }

//   @Patch('student/:id')
//   updateStudent(@Param('id') id: string, @Body() createStudentDto: CreateStudentDto) {
//     return this.appService.updateStudent(id, createStudentDto);
//   }

//   @Delete('student/:id')
//   deleteStudent(@Param('id') id: string) {
//     return this.appService.deleteStudent(id);
//   }

//   // Reservation CRUD
//   @Get('reservation')
//   getReservations() {
//     return this.appService.getAllReservations();
//   }

//   @Get('reservation/:id')
//   getReservation(@Param('id') id: string) {
//     return this.appService.getReservation(id);
//   }

//   @Post('reservation')
//   createReservation(@Body() createReservationDto: CreateReservationDto) {
//     return this.appService.createReservation(createReservationDto);
//   }

//   @Patch('reservation/:id')
//   updateReservation(@Param('id') id: string, @Body() createReservationDto: CreateReservationDto) {
//     return this.appService.updateReservation(id, createReservationDto);
//   }

//   @Delete('reservation/:id')
//   deleteReservation(@Param('id') id: string) {
//     return this.appService.deleteReservation(id);
//   }


//   // Libraraing CRUD
//   @Get('library')
//   getLibraries() {
//     return this.appService.getAllLibrarians();
//   }

//   @Get('library/:id')
//   getLibrary(@Param('id') id: string) {
//     return this.appService.getLibrarian(id);
//   }

//   @Post('library')
//   createLibrary(@Body() createLibrarianDto: CreateLibrarianDto) {
//     return this.appService.createLibrarian(createLibrarianDto);
//   }

//   @Patch('library/:id')
//   updateLibrary(@Param('id') id: string, @Body() createLibrarianDto: CreateLibrarianDto) {
//     return this.appService.updateLibrarian(id, createLibrarianDto);
//   }

//   @Delete('library/:id')
//   deleteLibrary(@Param('id') id: string) {
//     return this.appService.deleteLibrarian(id);
//   }
}
