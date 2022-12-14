import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

export default function Home() {
  const [dataSet, setDataSet] = useState([])
  const [value, setValue] = useState(0)
  const IncrementValue = () => {
    if (value < 20) {
      setValue(value + 1)
    } else {
      alert('Sorry, greater then 20!')
    }
  }
  const DecrementValue = () => {
    if (value > 0) {
      setValue(value - 1)
    } else {
      alert('Sorry, less then 0!')
    }
  }

  const getDataSet = async () => {
    fetch(`https://shahriar-nextjs.netlify.app/api/dataSet`, {})
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('vul')
        } else {
          console.log('data', data)
          setDataSet(data.dataSet)
        }
      })
      .catch((err) => {
        console.log('pro erro', err)
      })
  }

  useEffect(() => {
    getDataSet()
    return () => {
      //console.log("removing...", e);
    }
  }, [])

  return (
    <div className={styles.container}>
      <MainNav />
      <main className={styles.main}>
        <p className={styles.title}>
          Yarn install and test, External and Module CSS test, Dynamic routing
          test, Hooks test, Data API test, Deploy to Netlify with free domain
          etc.
        </p>
        <div className="show-value">
          <button title="Increment" onClick={IncrementValue}>
            +
          </button>{' '}
          <span>{value}</span>{' '}
          <button title="Decrement" onClick={DecrementValue}>
            -
          </button>
        </div>

        <div className={styles.grid}>
          {dataSet.map((item) => (
            <>
              <Link
                href={{
                  pathname: `card/test`,
                  query: { id: item.id },
                }}
                key={item.id}
              >
                <a className={styles.card}>
                  <h2>{item.title} &rarr;</h2>
                  <p>{item.detail}</p>
                </a>
              </Link>
            </>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
