import React from "react"
import * as PropTypes from "prop-types"
import { FaAward } from 'react-icons/fa'
import PreviewImage from '../components/PreviewCompatibleImage'

const Banner = ({main, mainpitch}) =>(

  <section className="section">
  <div className="container animated bounceInUp delay-1s">
     <div className="columns is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
         <div className="column is-three-fifths is-offset-one-fifth"
              style={{
                backgroundImage: 'linear-gradient(rgb(255, 68, 0), yellow)',
                borderRadius: '4px',
              }}>
             <PreviewImage imageInfo={main.image1}/>
           <div className="section">
           <div className="tile is-parent">
             <div className="tile is-child notification is-success">
               <div className="content">
                <FaAward color="magenta" className="icon is-large"/>
                   <h3 className="title is-2">
                     {mainpitch.title}
                   </h3>
                   <p className="subtitle is-4">
                     {mainpitch.description}
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
)

Banner.propTypes = {
 mainpitch: PropTypes.object,
}

export default Banner
