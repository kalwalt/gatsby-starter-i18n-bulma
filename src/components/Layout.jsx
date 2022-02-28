import * as React from "react";
import Main from '../components/Main';
import "./all.sass";

const TemplateWrapper = ({ children, className }) => {

  return (
    <div>
      <Main  key="app-main" className='content'>
            {children}
        </Main>  
    </div>
  );
};

export default TemplateWrapper;