import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { MetricCard } from '@/components/Dashboard/MetricCard'
import { useDebtStore } from '@/store/debtStore'
import { Plus, Search, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Debt } from '@/types'

export function Debts() {
  const { debts, initializeData } = useDebtStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (debts.length === 0) {
      initializeData()
    }
  }, [debts.length, initializeData])

  const totalDebts = debts.length
  const totalAmount = debts.reduce((sum, debt) => sum + debt.totalAmount, 0)
  const totalRemaining = debts.reduce((sum, debt) => sum + (debt.totalAmount - debt.paidAmount), 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusBadge = (debt: Debt) => {
    const remaining = debt.totalAmount - debt.paidAmount
    if (remaining <= 0) {
      return <Badge className="bg-green-600 text-white hover:bg-green-700">Quitada</Badge>
    }
    const dueDate = new Date(debt.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dueDate < today) {
      return <Badge variant="destructive">Vencida</Badge>
    }
    return <Badge className="bg-blue-600 text-white hover:bg-blue-700">Aberta</Badge>
  }

  const filteredDebts = debts.filter(debt =>
    debt.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout
      title="Dívidas"
      description="Gerencie todas as suas dívidas"
    >
      <div className="p-4 md:p-6 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total de Dívidas"
            value={totalDebts.toString()}
          />
          <MetricCard
            title="Valor Total"
            value={formatCurrency(totalAmount)}
          />
          <MetricCard
            title="Restante a Pagar"
            value={formatCurrency(totalRemaining)}
          />
        </div>

        {/* Debts Table */}
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-white">Lista de Dívidas</CardTitle>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar por credor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                />
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Nova Dívida
              </Button>
            </div>

          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left text-zinc-400 p-3 font-medium">Credor</th>
                    <th className="text-left text-zinc-400 p-3 font-medium">Próx. Venc.</th>
                    <th className="text-left text-zinc-400 p-3 font-medium">Valor Pago</th>
                    <th className="text-left text-zinc-400 p-3 font-medium">Restante</th>
                    <th className="text-left text-zinc-400 p-3 font-medium hidden md:table-cell">Parcelas</th>
                    <th className="text-left text-zinc-400 p-3 font-medium">Status</th>
                    <th className="text-center text-zinc-400 p-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDebts.map((debt) => (
                    <tr key={debt.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="p-3 text-white font-medium">{debt.name}</td>
                      <td className="p-3 text-zinc-300">{formatDate(debt.dueDate)}</td>
                      <td className="p-3 text-green-500 font-medium">
                        {formatCurrency(debt.paidAmount)}
                      </td>
                      <td className="p-3 text-orange-500 font-medium">
                        {formatCurrency(debt.totalAmount - debt.paidAmount)}
                      </td>
                      <td className="p-3 text-zinc-300 hidden md:table-cell">
                        {debt.paidInstallments}/{debt.installments}
                      </td>
                      <td className="p-3">
                        {getStatusBadge(debt)}
                      </td>
                      <td className="p-3 text-center">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
