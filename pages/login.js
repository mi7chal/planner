import Head from 'next/head';
import Nav from '../components/Nav';
import styles from '../styles/Login.module.scss';
import Image from 'next/image';
import logo from '../public/logoHQ.svg'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Planner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles.mainBox}>
        <div className={styles.logo}><Image src={logo} ></Image></div>
        <div className={styles.loginBox}>

          <input type="text" placeholder="login" className={styles.loginInput}></input>
          <input type="password" placeholder="password" className={styles.loginInput}></input>
          <button className={styles.sendButton}>Zaloguj</button>
          <Link href='/'><div className={styles.toLogin}>Nie masz konta? Zarejestruj się</div></Link>
        </div>
      </div>

    </>
  )
}
