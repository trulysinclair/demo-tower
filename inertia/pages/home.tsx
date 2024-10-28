import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Head, Link } from '@inertiajs/react'
import { Terminal } from 'lucide-react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />
      <div className="container">
        <div className="title">Demo Tower v{props.version}</div>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>This page will be removed eventually.</AlertDescription>
        </Alert>
        <span>
          You can manage things by visiting the <Link href="/admin">Admin Panel</Link>.
        </span>
      </div>
    </>
  )
}
