import React from 'react';
// import CarVisuals from '../../3D/SceneOne/SceneOne';
// import ReactTypingEffect from 'react-typing-effect';
import './HomePage.css';

const Homepage = () => {
	return (
		<>
			<div className="homepage-container">
				<div className="homepage-title-container">
					<p className="homepage-title">
						Greetings, <span>I'm Robert</span>
					</p>
					<p className="homepage-subtitle">
						I'm a Front-End Developer/Agile IT Business Analyst currently based in Tokyo Japan
					</p>
					<div className="homepage-location"></div>
				</div>
				<div className="scene-one-container">{/* <CarVisuals /> */}</div>
			</div>
		</>
	);
};

export default Homepage;
