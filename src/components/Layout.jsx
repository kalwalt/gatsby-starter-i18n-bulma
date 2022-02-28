import * as React from "react";
import Main from '../components/Main';
import { IntlProvider } from 'react-intl';
import "./all.sass";

const TemplateWrapper = ({ children, className }) => {

  return (
    <IntlProvider
        locale={'it'}
        messages={'m'}
        textComponent={React.Fragment}
      >
    <div>
      <Main  key="app-main" className='content'>
            {children}
        </Main>  
    </div>
    </IntlProvider>
  );
};

export default TemplateWrapper;