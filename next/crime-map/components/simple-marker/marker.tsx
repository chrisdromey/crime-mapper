import React from 'react';
import styles from './Marker.module.css' ;

type Props = {
  color: string
  name: string
  id: string
  text: string
  position: {
    lng: number
    lat: number
  }
}

const Marker = ({ color, name, id, text }: Props) => {
    
    return (
      <>
      <div className={styles.marker}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      /> 
      <div className={styles.label}>
        {text?.split('\n').map(t=> {
          return (
            <p>
            {t}
            </p>
          ) 
        })}
      </div>
      </>
    );
  };

  export default Marker;