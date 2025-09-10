import api from "@/services/api";
import Endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export const metrics = z.object({
  valorTotalDividas: z.number(),
  valorTotalPago: z.number(),
  valorTotalEmDebito: z.number(),
});

export type MetricsType = z.infer<typeof metrics>;

export function useGetMetrics() {
  return useQuery<MetricsType>({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      const result = await api.get(Endpoints.DASHBOARD_METRICS);
      return result.data;
    },
  });
}
