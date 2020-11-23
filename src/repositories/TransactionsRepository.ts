import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0, outcome = 0, total = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === 'income') {
        income += transaction.value;
        total += transaction.value;
      }
      if (transaction.type === 'outcome') {
        outcome += transaction.value;
        total -= transaction.value;
      }
    }

    const balance: Balance = {
      income,
      outcome,
      total
    }

    return balance;

  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
