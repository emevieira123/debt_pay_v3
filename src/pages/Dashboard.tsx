import { useEffect } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { MetricCard } from '@/components/Dashboard/MetricCard'
import { PaymentChart } from '@/components/Dashboard/PaymentChart'
import { useDebtStore } from '@/store/debtStore'
import { useGetMetrics } from '@/hooks/useGetMetrics'
import { formatCurrency } from '@/utils/formatCurrency'
import { LatestPayments } from '@/components/Dashboard/LatestPayments'

export function Dashboard() {
  const { debts, initializeData } = useDebtStore()
  const { data: metrics, isLoading } = useGetMetrics();

  useEffect(() => {
    if (debts.length === 0) {
      initializeData()
    }
  }, [debts.length, initializeData])

  return (
    <DashboardLayout
      title="Dashboard"
      description="Visão geral das suas dívidas"
    >
      <div className="p-4 md:p-4 space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total em Dívidas"
            value={formatCurrency(metrics?.valorTotalDividas as number)}
            isLoading={isLoading}
          />
          <MetricCard
            title="Já Pago"
            value={formatCurrency(metrics?.valorTotalPago as number)}
            isLoading={isLoading}
          />
          <MetricCard
            title="Restante a Pagar"
            value={formatCurrency(metrics?.valorTotalEmDebito as number)}
            isLoading={isLoading}
          />
        </div>

        {/* Chart and Recent Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <PaymentChart />
            <PaymentChart />
          </div>

          <LatestPayments />
        </div>
      </div>
    </DashboardLayout>
  )
}
