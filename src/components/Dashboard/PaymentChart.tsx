import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { month: 'Jul', value: 3000 },
  { month: 'Ago', value: 4000 },
  { month: 'Set', value: 2000 },
  { month: 'Out', value: 6000 },
  { month: 'Nov', value: 5000 },
  { month: 'Dez', value: 7000 },
]

const chartConfig = {
  value: {
    label: 'Valor Pago',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function PaymentChart() {
  return (
    <Card className="bg-zinc-900 border-zinc-700 h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-white">Progresso mensal de pagamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              accessibilityLayer
            >
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(value as number)
                    }
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
