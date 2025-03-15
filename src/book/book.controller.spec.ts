import { Test, TestingModule } from '@nestjs/testing';

import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
    let controller: BookController;
    let service: BookService;

    const mockBookService = {
        searchByBook: jest.fn(),
        searchByAuthor: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookController],
            providers: [
                {
                    provide: BookService,
                    useValue: mockBookService,
                },
            ],
        }).compile();
        controller = module.get<BookController>(BookController);
        service = module.get<BookService>(BookService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('', () => {
        
    });
});