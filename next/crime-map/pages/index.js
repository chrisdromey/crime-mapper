import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { toast, ToastContainer } from 'react-nextjs-toast'
import { postcodeValidator } from 'postcode-validator';
import { useState } from 'react';

import CrimeMap from  '../components/crime-map/CrimeMap'




function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}

const fetcher = (url) => fetch(url).then((res) => res.json())



export default function Home() {
  const [postcode, postcodeInput] = useInput({ type: "text" });
  const [center, setCenter] = useState({lat: 52.3555, lng:1.1743})
  const [zoom, setZoom] = useState(7)
  const [crimeData, setCrimeData] = useState([])

  const handleClick = async () => {
    if (!postcodeValidator(postcode, 'GB')) {
      toast.notify(`postcode not valid`, {
        type: "warn",
        title: 'opps'
      })
      return
    }
    const location = await fetcher(`api/location/${postcode}`)
    const crime = await fetcher(`api/crime/${postcode}`)
    
    console.log(location)
    console.log('CRIME', crime)
    setCrimeData(crime)
    setCenter(location)
    setZoom(14)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crime Mapper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <ToastContainer
        // align='center'
        // position='top'
        />

      <main className={styles.main}>


        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Crime Mapper!</a>
        </h1>

        
        <button
          onClick={handleClick}
        >
          Submit</button> */}


          <div>
          {postcodeInput}
            <button
            onClick={handleClick}
          >
            Submit</button>
            <CrimeMap 
              crimeData={crimeData}
              center={center}
              zoom={zoom}
            />
          </div>


        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
