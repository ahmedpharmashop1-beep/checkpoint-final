import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Welcome to your food app</h1>
            <p>This is a food app that allows you to add, edit, and delete food items.</p>
            <p>You can also view a list of all the food items and add new ones.</p>
        <img
        src={"https://www.iberdrola.com/documents/20125/39904/real_food_746x419.jpg/0c9185fa-b2dd-e1a6-602c-bca55f68e54e?t=1626673209445"}
        alt="food.image"
        style={{
          width: "50%",
          height: "50%",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
        </div>
    );
};

export default Home;