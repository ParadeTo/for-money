import React from 'react';
import { homedir } from 'os';
import Grid from './Grid';
export default function Home(props) {
  return (
    <div>
      <Grid {...props} />
    </div>
  );
}
