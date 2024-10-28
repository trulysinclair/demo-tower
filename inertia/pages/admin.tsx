import type User from '#models/user'
import { Head, Link } from '@inertiajs/react'

export default function Home(props: { user: User }) {
  return (
    <>
      <Head title="Dashboard" />
      <div className="container">
        <div className="title">Demo Admin</div>
        <div>{props.user.email}</div>
        <nav>
          <Link href="/">home</Link>
          <Link href="/logout">logout</Link>
        </nav>
      </div>
    </>
  )
}
