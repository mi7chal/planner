import Head from 'next/head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.scss';
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
        <div className={styles.registerBox}>

          <input type="text" placeholder="login" className={styles.loginInput}></input>
          <input type="text" placeholder="email" className={styles.loginInput}></input>
          <input type="password" placeholder="password" className={styles.loginInput}></input>
          <input type="password" placeholder="second password" className={styles.loginInput}></input>
          <button className={styles.sendButton}>Zarejestruj</button>
          <Link href='/login'><div className={styles.toLogin}>Masz już konto? zaloguj się</div></Link>
        </div>
      </div>

    </>
  )
}
