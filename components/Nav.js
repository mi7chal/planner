import Head from 'next/head';
import Image from 'next/image'
import logoPic from '../public/logo.svg';
import Link from 'next/link'

export default function Nav() {
  return (
    <header className="navBox">
        <Link href="/"><div className="navLogo"><Image src={logoPic}  priority={true}/></div></Link>
    </header>
  )
}
