import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '../ui/skeleton'

interface MetricCardProps {
  title: string
  value: string
  className?: string
  isLoading?: boolean
}

export function MetricCard({ title, value, className, isLoading }: MetricCardProps) {
  return (
    <Card className={`bg-zinc-900 border-zinc-700 ${className || ''}`}>
      <CardContent className="p-4">
        <h3 className="text-sm text-zinc-400 mb-2">{title}</h3>
        {
          isLoading
            ? <Skeleton className="h-[2rem] w-[200px] rounded-8" />
            : <p className="text-2xl font-semibold text-white">{value}</p>
        }
      </CardContent>
    </Card>
  )
}
