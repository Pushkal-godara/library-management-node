export class Book {
    static associate() {}
    
    book_id: number;
    title: string;
    author: string;
    description: string;
    image_url: string;
    publication_year: number;
  }