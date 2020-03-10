import React, { Component } from 'react'
import { FaChevronUp } from 'react-icons/fa'


class ScrollToTop extends Component {

  componentDidMount() {
    // Get all "#toTop" elements
   const _toTop = Array.prototype.slice.call(document.querySelectorAll('#toTop'), 0);
    // Check if there are any navbar links
   if (_toTop.length > 0) {
     // Add a click event on each of them
     _toTop.forEach( el => {
       el.addEventListener('click', () => {
           window.scrollTo({ top: 0, behavior: 'smooth' });
       });
     });
   }
  }

  render () {
    return (
      <div className="level">
        <div style={{ width: '90%' }} className="level-item is-pulled-left"></div>
        <div className="level-item is-pulled-right">
          <button className="button" id="toTop" title="Top">
            <FaChevronUp />
          </button>
        </div>
      </div>
    )
  }
}

export default ScrollToTop;
