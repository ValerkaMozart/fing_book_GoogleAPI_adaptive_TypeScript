import React from 'react'
import classes from './App.module.scss'
import HomePage from "./components/HomePage/HomePage";
import UpButton from "./components/UpButton/UpButton";
let App : React.FC = () =>  {
  return (
    <div className={classes.App}>
        <HomePage/>
        <UpButton />
    </div>
  );
}

export default App;
