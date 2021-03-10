import React from 'react';
import { APP_TITLE } from '../constant/other';

const Title: React.FC = () => (<>
  <h1 className="d-none d-sm-inline">{APP_TITLE}</h1>
  <h3 className="d-inline d-sm-none">{APP_TITLE}</h3>
</>);

export default Title;
