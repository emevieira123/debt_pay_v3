import { create } from "zustand";
import { faker } from "@faker-js/faker";
import { Debt, Payment } from "../types";

interface DebtState {
  debts: Debt[];
  payments: Payment[];
  initializeData: () => void;
  addDebt: (debt: Omit<Debt, "id">) => void;
  addPayment: (payment: Omit<Payment, "id">) => void;
}

const generateMockDebts = (): Debt[] => {
  return Array.from({ length: 8 }, () => {
    const totalAmount = faker.number.float({
      min: 1000,
      max: 5000,
      fractionDigits: 2,
    });
    const paidAmount = faker.number.float({
      min: 0,
      max: totalAmount,
      fractionDigits: 2,
    });
    const installments = faker.number.int({ min: 2, max: 12 });
    const paidInstallments = faker.number.int({ min: 0, max: installments });

    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: "Cartão de crédito",
      totalAmount,
      paidAmount,
      dueDate: faker.date.future().toISOString().split("T")[0],
      status: paidAmount >= totalAmount ? "paid" : "pending",
      installments,
      paidInstallments,
    } as Debt;
  });
};

const generateMockPayments = (debts: Debt[]): Payment[] => {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    debtId: faker.helpers.arrayElement(debts).id,
    amount: faker.number.float({ min: 100, max: 800, fractionDigits: 2 }),
    date: faker.date.past().toISOString().split("T")[0],
    description: "Pagamento de parcela",
  }));
};

export const useDebtStore = create<DebtState>((set) => ({
  debts: [],
  payments: [],

  initializeData: () => {
    const debts = generateMockDebts();
    const payments = generateMockPayments(debts);
    set({ debts, payments });
  },

  addDebt: (debt) => {
    const newDebt = { ...debt, id: faker.string.uuid() };
    set((state) => ({ debts: [...state.debts, newDebt] }));
  },

  addPayment: (payment) => {
    const newPayment = { ...payment, id: faker.string.uuid() };
    set((state) => ({ payments: [...state.payments, newPayment] }));
  },
}));
