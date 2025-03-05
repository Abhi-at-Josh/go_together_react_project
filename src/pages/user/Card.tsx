// import React, { useState } from 'react';
const Card = () => {
    const options = [
        {
          title: "Ride Options",
          description: "There’s more than one way to move with Uber, no matter where you are or where you’re headed next.",
          buttonText: "Search ride options",
          imgUrl: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
        },
        {
          title: "700+ airports",
          description: "You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.",
          buttonText: "Search airports",
          imgUrl: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
        },
        {
          title: "10,000+ cities",
          description: "The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.",
          buttonText: "Search cities",
          imgUrl: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
        }
      ];
    
      return (
        <div className="py-10 px-4 md:px-10 m-10 ml-10">
          <h2 className="text-3xl font-bold text-center mb-10">Use the Go-Together app to help you travel your way</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt, idx) => (
              <div key={idx} className="bg-white  overflow-hidden">
                <img src={opt.imgUrl} alt={opt.title} className="w-95 h-100 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{opt.title}</h3>
                  <p className="text-gray-600 mb-4">{opt.description}</p>
                  <button className="bg-black text-white px-4 py-2 rounded-md">{opt.buttonText}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Card;
