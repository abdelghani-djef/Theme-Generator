import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const TAGS = ['Design', 'Engineering', 'Product', 'Tutorials', 'Changelog']

const POSTS = [
  {
    id: 1,
    title: 'Designing a flexible theming system',
    excerpt: 'How we built a fully tokenized design system that powers light, dark and brand modes.',
    tag: 'Design',
    author: 'Olivia M.',
    date: 'May 12',
    seed: 'theme',
  },
  {
    id: 2,
    title: 'Inside our new search engine',
    excerpt: 'A look at the trade-offs behind moving from Postgres FTS to a vector-first stack.',
    tag: 'Engineering',
    author: 'Jackson L.',
    date: 'May 9',
    seed: 'search',
  },
  {
    id: 3,
    title: 'Why we rewrote the dashboard',
    excerpt: 'Three months and one boring decision later, our shipping velocity tripled.',
    tag: 'Product',
    author: 'Sofia D.',
    date: 'May 4',
    seed: 'dash',
  },
  {
    id: 4,
    title: 'A practical guide to color tokens',
    excerpt: 'The contracts we wish we had set up two years ago for our design tokens.',
    tag: 'Design',
    author: 'William K.',
    date: 'Apr 28',
    seed: 'tokens',
  },
  {
    id: 5,
    title: 'Migrating millions of rows with no downtime',
    excerpt: 'How we ran an online schema migration on our busiest table during peak traffic.',
    tag: 'Engineering',
    author: 'Isabella N.',
    date: 'Apr 21',
    seed: 'migrate',
  },
  {
    id: 6,
    title: 'Changelog: April 2026',
    excerpt: 'New role-based access, faster cold starts, and a redesigned mobile app.',
    tag: 'Changelog',
    author: 'Team',
    date: 'Apr 14',
    seed: 'log',
  },
]

const tagVariant = (t: string): 'default' | 'secondary' | 'accent' | 'muted' => {
  if (t === 'Design') return 'default'
  if (t === 'Engineering') return 'accent'
  if (t === 'Changelog') return 'muted'
  return 'secondary'
}

export function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">From the blog</h1>
        <p className="text-sm text-muted-foreground">
          Updates, deep dives and product notes from the team.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <Badge key={t} variant={tagVariant(t)}>
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {POSTS.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div
              className="h-40 w-full"
              style={{
                background: `linear-gradient(135deg, hsl(var(--chart-${(p.id % 5) + 1})), hsl(var(--chart-${((p.id + 2) % 5) + 1})))`,
              }}
            />
            <CardHeader>
              <Badge variant={tagVariant(p.tag)} className="w-fit">
                {p.tag}
              </Badge>
              <CardTitle className="text-lg leading-tight">{p.title}</CardTitle>
              <CardDescription>{p.excerpt}</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{p.author.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-medium">{p.author}</p>
                <p className="text-muted-foreground">{p.date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
