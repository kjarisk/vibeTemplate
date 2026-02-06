import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Ready to build
        </h1>
        <p className="text-muted-foreground text-sm">
          Fill in{' '}
          <code className="text-foreground font-mono">docs/outline.md</code> to
          get started.
        </p>
        <Button variant="outline" size="sm" asChild>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open docs
          </a>
        </Button>
      </div>
    </div>
  )
}

export default App
