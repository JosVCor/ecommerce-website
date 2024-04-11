import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import CircleType from 'circletype';
import './homePage.css';
import WomenShoes from "../Shoes/WomenShoes/womenShoes";

const HomePage = () => {
    useEffect(() => {
        // Initialize the CircleType on the curved-text class
        const circleType = new CircleType(document.getElementById('curved-text'));
        circleType.radius(500);

        const circleType1 = new CircleType(document.getElementById('curved-text1'));
        circleType1.radius(500);
    }, []);

    return (
        <div>
            <div className='main-content'>
                <div className='mens-womens-content'>
                    <div className='m-w-t'>
                        <p>Check out our latest products</p>
                    </div>
                    <div className='m-w-buttons'>
                        <Link className='m-b'>Shop Men's</Link>
                        <Link className='w-b'>Shop Women's</Link>
                    </div>
                </div>

                <div>
                    <div className='main-image'>
                        <h1>Shop the latest trends</h1>
                    </div>
                </div>

                <div className='shoe-content'>
                    <Link to="/womenShoes" className='shoe-t' onClick={() => console.log('Link clicked')}>
                        {/* Your content goes here */}
                    </Link>
                    <Link to="/menShoes" className='shoe-t1' onClick={() => console.log('Link clicked')}>
                        {/* Your content goes here */}
                    </Link>
                </div>

                <div className='accessories-content'>
                    <Link className='jewelry'></Link>
                    <div className='hats'></div>
                    <div className='sunglasses'></div>
                    <div className='belts'></div>
                    <div className='bags'></div>
                    <div className='wallets'></div>
                    <div className='scents'></div>
                </div>

                <div className='swimsuit-content'>
                    <Link className='swimsuit-m'>
                        <h1 id='curved-text' className='curved-text'>Mens Swimwear</h1>
                    </Link>
                    <Link className='swimsuit-w'>
                        <h1 id='curved-text1' className='curved-text1'>Women's Swimwear</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;