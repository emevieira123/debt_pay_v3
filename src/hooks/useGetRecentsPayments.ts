import api from "@/services/api";
import Endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export const recentPayment = z.object({
  parcelaId: z.string(),
  nomeCobrador: z.string(),
  nomeProduto: z.string(),
  valorParcela: z.number(),
  quantidadeParcelasPagas: z.number(),
  quantidadeParcelasRestantes: z.number(),
  quantidadeTotalParcelas: z.number(),
  dataPagamento: z.string(),
});

export const recentsPayments = z.array(recentPayment);

export type RecentsPaymentsType = z.infer<typeof recentsPayments>;

export function useGetRecentsPayments() {
  return useQuery<RecentsPaymentsType>({
    queryKey: ["dashboard-recents-payments"],
    queryFn: async () => {
      const result = await api.get(Endpoints.DASHBOARD_RECENTS_PAYMENTS);
      return result.data;
    },
  });
}
