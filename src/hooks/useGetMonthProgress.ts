import api from "@/services/api";
import Endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export const monthProgress = z.object({
  mes: z.string(),
  valorTotal: z.number(),
  quantidadePagamentos: z.number(),
});

export const months = z.array(monthProgress);

export type MonthsProgress = z.infer<typeof months>;

export function useGetMonthProgress() {
  return useQuery<MonthsProgress>({
    queryKey: ["dashboard-month-progress"],
    queryFn: async () => {
      const result = await api.get(Endpoints.DASHBOARD_MONTH_PROGRESS);
      return result.data;
    },
  });
}
