import { useEffect } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { MetricCard } from '@/components/Dashboard/MetricCard'
import { PaymentChart } from '@/components/Dashboard/PaymentChart'
import { useDebtStore } from '@/store/debtStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  const { debts, payments, initializeData } = useDebtStore()

  useEffect(() => {
    if (debts.length === 0) {
      initializeData()
    }
  }, [debts.length, initializeData])

  const totalDebt = debts.reduce((sum, debt) => sum + debt.totalAmount, 0)
  const totalPaid = debts.reduce((sum, debt) => sum + debt.paidAmount, 0)
  const totalRemaining = totalDebt - totalPaid

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  // Pegar os últimos 7 pagamentos
  const recentPayments = payments.slice(0, 7)

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
            value={formatCurrency(totalDebt)}
          />
          <MetricCard
            title="Já Pago"
            value={formatCurrency(totalPaid)}
          />
          <MetricCard
            title="Restante a Pagar"
            value={formatCurrency(totalRemaining)}
          />
        </div>

        {/* Chart and Recent Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <PaymentChart />
            <PaymentChart />
          </div>

          <Card className="bg-zinc-900 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Últimos pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment) => {
                  const debt = debts.find(d => d.id === payment.debtId)
                  return (
                    <div key={payment.id} className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_0.2fr] gap-4 items-center p-3 bg-zinc-800 rounded-lg">
                      {/* Mobile: Primeira coluna - Credor e Produto */}
                      <div className="md:hidden">
                        <div className="mb-2">
                          <p className="text-sm text-zinc-400">Credor</p>
                          <p className="text-white font-medium">{debt?.name.slice(0, 20) + '...' || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">Produto</p>
                          <p className="text-white font-medium">{debt?.name.slice(0, 20) + '...' || '-'}</p>
                        </div>
                      </div>

                      {/* Mobile: Segunda coluna - Valor pago e Data */}
                      <div className="md:hidden flex flex-col items-end">
                        <div className="mb-2">
                          <p className="text-sm text-zinc-400">Valor pago</p>
                          <p className="text-green-500 font-medium">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">Pago em</p>
                          <p className="text-white font-medium">{formatDate(payment.date)}</p>
                        </div>
                      </div>

                      {/* Desktop: Layout original */}
                      <div className="hidden md:block">
                        <p className="text-sm text-zinc-400">Credor</p>
                        <p className="text-white font-medium">{debt?.name.slice(0, 16) + '...' || '-'}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm text-zinc-400">Produto</p>
                        <p className="text-white font-medium">{debt?.name.slice(0, 16) + '...' || '-'}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm text-zinc-400">Pago em</p>
                        <p className="text-white font-medium">{formatDate(payment.date)}</p>
                      </div>
                      <div className="hidden md:block flex flex-col items-end">
                        <p className="text-sm text-zinc-400">Valor pago</p>
                        <p className="text-green-500 font-medium">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
