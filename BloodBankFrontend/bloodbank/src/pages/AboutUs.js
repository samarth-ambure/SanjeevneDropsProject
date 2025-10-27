// src/pages/AboutUs.js
import React from 'react';

function AboutUs() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Sanjeevani Drops</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            Sanjeevani Drops is a dedicated Blood Bank Management System designed to streamline the process of blood donation, storage, and distribution. Our mission is to connect donors with those in need efficiently and reliably, ensuring a continuous and safe blood supply for our community.
          </p>
          <p>
            We believe in the power of giving life. Our platform aims to make the process of managing blood resources transparent, accessible, and user-friendly for both blood banks and the public. From donor registration and inventory tracking to patient requests and dispatch, Sanjeevani Drops provides comprehensive tools to manage every aspect of blood banking operations.
          </p>
          <p>
            Join us in our endeavor to save lives. Every drop counts.
          </p>
          {/* You can add more content, team info, mission/vision statements here */}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;