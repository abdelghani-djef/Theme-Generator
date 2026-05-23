import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const stats = [
  { label: 'Total revenue', value: '$45,231.89', delta: '+20.1%', tone: 'up' as const },
  { label: 'Subscriptions', value: '2,350', delta: '+180.1%', tone: 'up' as const },
  { label: 'Sales', value: '12,234', delta: '+19%', tone: 'up' as const },
  { label: 'Active now', value: '573', delta: '+201', tone: 'up' as const },
]

const chart = [42, 67, 53, 81, 35, 92, 71, 58, 49, 78, 63, 88]

const recent = [
  { id: '#3210', name: 'Olivia Martin', email: 'olivia@example.com', amount: '$1,999.00', status: 'paid' },
  { id: '#3209', name: 'Jackson Lee', email: 'jackson@example.com', amount: '$39.00', status: 'paid' },
  { id: '#3208', name: 'Isabella Nguyen', email: 'isabella@example.com', amount: '$299.00', status: 'pending' },
  { id: '#3207', name: 'William Kim', email: 'will@example.com', amount: '$99.00', status: 'refunded' },
  { id: '#3206', name: 'Sofia Davis', email: 'sofia@example.com', amount: '$39.00', status: 'paid' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'muted'> = {
  paid: 'default',
  pending: 'secondary',
  refunded: 'destructive',
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of your store's performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl">{s.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="accent">{s.delta} this month</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Last 12 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-2">
              {chart.map((v, i) => {
                const chartVar = `--chart-${(i % 5) + 1}`
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md transition-colors"
                    style={{ height: `${v}%`, background: `hsl(var(${chartVar}))` }}
                    title={`Week ${i + 1}: ${v}`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Live signals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {['New subscriber from Berlin', 'Order #3211 placed', 'Refund issued: #3201', 'Plan upgraded by Alex'].map(
              (line, i) => (
                <div key={i} className="flex items-start gap-3 rounded-md border p-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: `hsl(var(--chart-${(i % 5) + 1}))` }}
                  />
                  <p className="text-sm">{line}</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
          <CardDescription>The last 5 customers who made a purchase.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.email}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[r.status] ?? 'secondary'} className="capitalize">
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{r.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
