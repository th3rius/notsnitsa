import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notsnitsa</title>
        <meta name="description" content="black magic code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image src="/witchhead.png" width={46} height={49} alt="Witch Hat" />
    </div>
  );
}
