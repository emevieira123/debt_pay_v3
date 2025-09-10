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
import { useGetMonthProgress } from '@/hooks/useGetMonthProgress'
import { Skeleton } from '../ui/skeleton'

const chartConfig = {
  value: {
    label: 'Valor Pago',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function PaymentChart() {
  const { data: chartData, isLoading } = useGetMonthProgress();

  return (
    <Card className="bg-zinc-900 border-zinc-700 h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-white">Progresso mensal de pagamentos</CardTitle>
      </CardHeader>
      <CardContent>
        {
          isLoading ? (
            <div className='grid grid-cols-6 gap-4 items-end'>
              <Skeleton className="h-[100px] w-[50px] md:w-[70px] rounded-5" />
              <Skeleton className="h-[150px] w-[50px] md:w-[70px] rounded-5" />
              <Skeleton className="h-[120px] w-[50px] md:w-[70px] rounded-5" />
              <Skeleton className="h-[100px] w-[50px] md:w-[70px] rounded-5" />
              <Skeleton className="h-[50px] w-[50px] md:w-[70px] rounded-5" />
              <Skeleton className="h-[150px] w-[50px] md:w-[70px] rounded-5" />
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-[150px] w-full">
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                  accessibilityLayer
                >
                  <XAxis
                    dataKey="mes"
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
                  <Bar dataKey="valorTotal" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )
        }
      </CardContent>
    </Card>
  )
}
