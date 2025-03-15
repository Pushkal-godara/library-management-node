export class Loan {
    static associate() {}
    
    loan_id: number;
    book_id: number;
    user_id: string;
    due_date: Date;
    return_date: Date | null;
    status: string;
    book?: any;
  }