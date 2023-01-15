import React from 'react';

const Home = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection:'column'}}>
            <h1 style={{ marginTop: '20px', fontSize: '30px'}}>You can try this accoun: 
            <br/>
            email: olaf-grayhair@gmail.com
            <br/>
            password: 12345</h1>

            <h2 style={{ marginTop: '20px', fontSize: '30px'}}>or you can create new!</h2>
        </div>
    );
}

export default Home;
