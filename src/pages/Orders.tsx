import * as React from 'react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type OrderStatus = 'paid' | 'processing' | 'shipped' | 'cancelled' | 'refunded'

const ORDERS: { id: string; customer: string; date: string; status: OrderStatus; amount: string }[] = [
  { id: 'ORD-1042', customer: 'Olivia Martin', date: '2026-05-22', status: 'paid', amount: '$1,999.00' },
  { id: 'ORD-1041', customer: 'Jackson Lee', date: '2026-05-22', status: 'shipped', amount: '$39.00' },
  { id: 'ORD-1040', customer: 'Isabella Nguyen', date: '2026-05-21', status: 'processing', amount: '$299.00' },
  { id: 'ORD-1039', customer: 'William Kim', date: '2026-05-21', status: 'refunded', amount: '$99.00' },
  { id: 'ORD-1038', customer: 'Sofia Davis', date: '2026-05-20', status: 'paid', amount: '$549.00' },
  { id: 'ORD-1037', customer: 'Liam Walker', date: '2026-05-20', status: 'cancelled', amount: '$12.50' },
  { id: 'ORD-1036', customer: 'Emma Thompson', date: '2026-05-19', status: 'shipped', amount: '$420.00' },
  { id: 'ORD-1035', customer: 'Noah Patel', date: '2026-05-19', status: 'paid', amount: '$78.99' },
  { id: 'ORD-1034', customer: 'Ava Rossi', date: '2026-05-18', status: 'processing', amount: '$1,250.00' },
  { id: 'ORD-1033', customer: 'Mateo Garcia', date: '2026-05-18', status: 'paid', amount: '$210.00' },
  { id: 'ORD-1032', customer: 'Mia Chen', date: '2026-05-17', status: 'shipped', amount: '$64.00' },
  { id: 'ORD-1031', customer: 'Lucas Brown', date: '2026-05-17', status: 'paid', amount: '$3,400.00' },
]

const STATUS_VARIANT: Record<OrderStatus, 'default' | 'secondary' | 'destructive' | 'accent' | 'muted'> = {
  paid: 'default',
  processing: 'accent',
  shipped: 'secondary',
  cancelled: 'muted',
  refunded: 'destructive',
}

export function OrdersPage() {
  const [query, setQuery] = React.useState('')
  const filtered = ORDERS.filter((o) =>
    [o.id, o.customer, o.status].some((v) => v.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">Track and manage every order in your store.</p>
        </div>
        <Button>New order</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
          <div>
            <CardTitle>All orders</CardTitle>
            <CardDescription>{filtered.length} of {ORDERS.length} orders</CardDescription>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders..."
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[o.status]} className="capitalize">
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{o.amount}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No orders match "{query}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
