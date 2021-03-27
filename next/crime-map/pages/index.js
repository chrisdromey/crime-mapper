import Head from 'next/head'
import { useState } from 'react';
// import { toast, ToastContainer } from 'react-nextjs-toast'
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getOutcomeStats from '../lib/getOutcomeStats'

import { postcodeValidator } from 'postcode-validator';
import CrimeMap from '../components/crime-map/CrimeMap'

import styles from '../styles/Home.module.css'
import "react-datepicker/dist/react-datepicker.css";


function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("SE1 7PB");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const [postcode, postcodeInput] = useInput({ type: "text" });
  const [center, setCenter] = useState({ lat: 52.3555, lng: 1.1743 })
  const [zoom, setZoom] = useState(7)
  const [crimeData, setCrimeData] = useState([])
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const handleClick = async () => {
    if (!postcodeValidator(postcode, 'GB')) {
      toast.error(("postcode not valid"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    const location = await fetcher(`api/location/${postcode}`)
    const crime = await fetcher(`api/crime/${postcode}?start=${startDate}&end=${endDate}`)

    let message = `Found ${crime.length} crimes from your search`
    if (crime.length === 0) {
      message = 'Zero crime found for your search'
    }

    toast.info(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // console.log(location)
    // console.log('CRIME', crime)
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
      />

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Crime Mapper!</a>
        </h1>

        <p className={styles.description}>
          See the location of crimes based on postcode
        </p>

        <div style={{
          display: 'flex'
        }}>
          <div className={styles.inputWrapper}>
            <span>Postcode</span>
            {postcodeInput}
          </div>

          <div className={styles.inputWrapper}>
            <span>Start</span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div className={styles.inputWrapper}>
            <span>End</span>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
          <button
            onClick={handleClick}
          >
            Submit</button>
          <div style={{ marginLeft: 'auto' }}>
         <button> {crimeData.length} crimes</button>
            <div>
            {getOutcomeStats(crimeData).map(o => {
              return (<p 
                style={{
                  marginBlockStart: '0.1em',
                  marginBlockEnd: '0.1em'
                }}>
                  {o.outcome} : {o.count}
                </p>)
            })}
              </div>
          
            
            
          </div>
        </div>

        <div style={{ display: 'inline-block',width: '100%', height: 400, overflow:'auto'}}>
          <CrimeMap
            crimeData={crimeData}
            center={center}
            zoom={zoom}
          />
        </div>

        <div class="clear"></div>


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
        <p>Contains public sector information licensed under the Open Government Licence v3.0</p>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          >
          <div>
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />

          </div>
        </a>
      </footer>
    </div>
  )
}
