import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import storyConfig from './story.json'
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App storyConfig={storyConfig} />, document.getElementById('root'));
registerServiceWorker();
