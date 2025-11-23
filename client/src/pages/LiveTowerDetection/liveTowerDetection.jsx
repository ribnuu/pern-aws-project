import React, { useEffect, useState } from 'react'
import axios from 'axios'


const liveTowerDetection = () => {

  return (
    <div>
        <section className='mx-12 my-12'>
            Used to detect the tower real time when a mobile is connected. Access is given onlt to the igp as it is very critical data. <br />
            Data is supplied by the network service providers.<br />
            Connected towers are shown in the triangular format on the map so that the connecting area is the place where the suspect or wanted person is.
        </section>
    </div>
  )
}

export default liveTowerDetection