import { Card, CardContent } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string
  className?: string
}

export function MetricCard({ title, value, className }: MetricCardProps) {
  return (
    <Card className={`bg-zinc-900 border-zinc-700 ${className || ''}`}>
      <CardContent className="p-4">
        <h3 className="text-sm text-zinc-400 mb-2">{title}</h3>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}
