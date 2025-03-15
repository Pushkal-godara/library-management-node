import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { HttpException } from '@nestjs/common';


describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  // Mock service implementation
  const mockReportsService = {
    getBookAvailabilityReport: jest.fn(),
    availableBooks: jest.fn(),
    getOverdueReportByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookAvailability', () => {
    it('should return book availability report successfully', async () => {
      // Arrange
      const mockReport = {
        total_books: 100,
        total_borrowed_books: 30,
        total_available_books: 70,
      };
      mockReportsService.getBookAvailabilityReport.mockResolvedValue(mockReport);

      // Act
      const result = await controller.getBookAvailability();

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockReport,
      });
      expect(service.getBookAvailabilityReport).toHaveBeenCalled();
    });

    it('should throw HttpException when service fails', async () => {
      // Arrange
      mockReportsService.getBookAvailabilityReport.mockRejectedValue(new Error());

      // Act & Assert
      await expect(controller.getBookAvailability()).rejects.toThrow(HttpException);
    });
  });

  describe('getBooksAvailableToBorrow', () => {
    it('should return available books with pagination', async () => {
      // Arrange
      const mockBooks = {
        books: [{ id: 1, title: 'Book 1' }],
        total: 1,
      };
      const page = 1;
      const limit = 5;
      mockReportsService.availableBooks.mockResolvedValue(mockBooks);

      // Act
      const result = await controller.getBooksAvailableToBorrow(page, limit);

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockBooks.books,
        pagination: {
          total: mockBooks.total,
          page,
          limit,
          totalPages: Math.ceil(mockBooks.total / limit),
        },
      });
      expect(service.availableBooks).toHaveBeenCalledWith(page, limit);
    });

    it('should throw HttpException when service fails', async () => {
      // Arrange
      mockReportsService.availableBooks.mockRejectedValue(new Error());

      // Act & Assert
      await expect(controller.getBooksAvailableToBorrow(1, 5)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getOverdueReportByUserId', () => {
    it('should return overdue report for user', async () => {
      // Arrange
      const userId = 'user123';
      const mockReport = {
        user_id: userId,
        total_overdue_items: 2,
        total_fine: 20,
        overdue_items: [],
        generated_at: new Date(),
      };
      mockReportsService.getOverdueReportByUserId.mockResolvedValue(mockReport);

      // Act
      const result = await controller.getOverdueReportByUserId(userId);

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockReport,
      });
      expect(service.getOverdueReportByUserId).toHaveBeenCalledWith(userId);
    });

    it('should throw HttpException when service fails', async () => {
      // Arrange
      const userId = 'user123';
      mockReportsService.getOverdueReportByUserId.mockRejectedValue(new Error());

      // Act & Assert
      await expect(controller.getOverdueReportByUserId(userId)).rejects.toThrow(
        HttpException,
      );
    });
  });
});