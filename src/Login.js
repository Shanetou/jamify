import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export const Login = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <Button className="login-button" onClick={() => window.location = 'http://localhost:8888/login'}>
        LOG IN TO SPOTIFY
      </Button>
    </div>
  );
};
