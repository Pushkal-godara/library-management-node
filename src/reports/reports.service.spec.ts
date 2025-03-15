import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { getModelToken } from '@nestjs/sequelize';

// Mock the Book entity
jest.mock('../book/entities/books.entity', () => ({
  Book: class MockBook {
    static associate() {}
  }
}));

// Mock the Loan entity
jest.mock('../loan/entities/loan.entity', () => ({
  Loan: class MockLoan {
    static associate() {}
  }
}));

// Mock LoanStatus
jest.mock('../loan/dto/loan.dto', () => ({
  LoanStatus: {
    BORROWED: 'BORROWED',
    RETURNED: 'RETURNED',
    AVAILABLE: 'AVAILABLE'
  }
}));

// Get the mocked classes
const { Book } = jest.requireMock('../book/entities/books.entity');
const { Loan } = jest.requireMock('../loan/entities/loan.entity');
const { LoanStatus } = jest.requireMock('../loan/dto/loan.dto');

describe('ReportsService', () => {
  let service: ReportsService;

  // Mock models
  const mockBookModel = {
    count: jest.fn(),
    findAndCountAll: jest.fn(),
  };

  const mockLoanModel = {
    count: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getModelToken(Book),
          useValue: mockBookModel,
        },
        {
          provide: getModelToken(Loan),
          useValue: mockLoanModel,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookAvailabilityReport', () => {
    it('should return correct book availability numbers', async () => {
      // Arrange
      const totalBooks = 100;
      const borrowedBooks = 30;
      mockBookModel.count.mockResolvedValue(totalBooks);
      mockLoanModel.count.mockResolvedValue(borrowedBooks);

      // Act
      const result = await service.getBookAvailabilityReport();

      // Assert
      expect(result).toEqual({
        total_books: totalBooks,
        total_borrowed_books: borrowedBooks,
        total_available_books: totalBooks - borrowedBooks,
      });
      expect(mockBookModel.count).toHaveBeenCalled();
      expect(mockLoanModel.count).toHaveBeenCalledWith({
        where: {
          status: LoanStatus.BORROWED,
          return_date: null,
        },
      });
    });
  });

  describe('availableBooks', () => {
    it('should return available books with pagination', async () => {
      // Arrange
      const page = 1;
      const limit = 5;
      const mockAvailableLoans = [{ book_id: 1 }, { book_id: 2 }];
      const mockAllLoans = [{ book_id: 1 }, { book_id: 2 }, { book_id: 3 }];
      const mockBooks = {
        rows: [
          { book_id: 1, title: 'Book 1' },
          { book_id: 2, title: 'Book 2' },
        ],
        count: 2,
      };

      mockLoanModel.findAll
        .mockResolvedValueOnce(mockAvailableLoans)
        .mockResolvedValueOnce(mockAllLoans);
      mockBookModel.findAndCountAll.mockResolvedValue(mockBooks);

      // Act
      const result = await service.availableBooks(page, limit);

      // Assert
      expect(result).toEqual({
        books: mockBooks.rows,
        total: mockBooks.count,
      });
      expect(mockLoanModel.findAll).toHaveBeenCalledTimes(2);
      expect(mockBookModel.findAndCountAll).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      // Arrange
      mockLoanModel.findAll.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.availableBooks(1, 5)).rejects.toThrow('Database error');
    });
  });

  describe('getOverdueReportByUserId', () => {
    it('should return overdue report for user', async () => {
      // Arrange
      const userId = 'user123';
      const currentDate = new Date('2024-02-14');
      const dueDate = new Date('2024-02-10');
      jest.useFakeTimers().setSystemTime(currentDate);

      const mockLoans = [
        {
          loan_id: 1,
          book_id: 1,
          due_date: dueDate,
          book: {
            title: 'Book 1',
            author: 'Author 1',
          },
        },
      ];

      mockLoanModel.findAll.mockResolvedValue(mockLoans);

      // Act
      const result = await service.getOverdueReportByUserId(userId);

      // Assert
      expect(result).toEqual({
        user_id: userId,
        total_overdue_items: 1,
        total_fine: 4,
        overdue_items: [
          {
            loan_id: 1,
            book_id: 1,
            book_title: 'Book 1',
            book_author: 'Author 1',
            due_date: dueDate,
            days_overdue: 4,
            fine_amount: 4,
          },
        ],
        generated_at: currentDate,
      });

      jest.useRealTimers();
    });

    it('should return empty report when no overdue items', async () => {
      // Arrange
      const userId = 'user123';
      const currentDate = new Date('2024-02-14');
      jest.useFakeTimers().setSystemTime(currentDate);

      mockLoanModel.findAll.mockResolvedValue([]);

      // Act
      const result = await service.getOverdueReportByUserId(userId);

      // Assert
      expect(result).toEqual({
        user_id: userId,
        total_overdue_items: 0,
        total_fine: 0,
        overdue_items: [],
        generated_at: currentDate,
      });

      jest.useRealTimers();
    });
  });

  describe('calculateFineAmount', () => {
    it('should calculate correct fine amount', () => {
      // Arrange
      const dueDate = new Date('2024-02-10');
      const currentDate = new Date('2024-02-14');

      // Act
      const result = service.calculateFineAmount(dueDate, currentDate);

      // Assert
      expect(result).toBe(4);
    });

    it('should return 0 when not overdue', () => {
      // Arrange
      const dueDate = new Date('2024-02-14');
      const currentDate = new Date('2024-02-14');

      // Act
      const result = service.calculateFineAmount(dueDate, currentDate);

      // Assert
      expect(result).toBe(0);
    });
  });
});