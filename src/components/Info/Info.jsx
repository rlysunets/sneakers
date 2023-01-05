import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context'
import styles from './Info.module.scss'

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext)

  return (
    <div className={styles.info}>
      <img width={100} src={image} alt="Empty" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to="/" style={{ display: "block"}}>
        <button onClick={() => setCartOpened(false)} className="btn">
          <img src="image/arrow.svg" alt="Arrow" />
          Go back
        </button>
      </Link>
    </div>
  )
}

export default Info