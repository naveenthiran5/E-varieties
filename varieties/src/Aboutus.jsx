import React from 'react'
import Menubar from './Menubar.jsx'
import Footer from './Footer.jsx'


function Aboutus() {
    return (
        <>
            <Menubar />
            <div>
                <div className='about_intro'>
                    <p>Hi!</p>
                    <h3>Welcome to Varieties, where style meets comfort.</h3>
                </div>
                <div className='about_details'>
                    <p>At Varieties, we believe that the right pair of shoes can transform not just your outfit, but your confidence. Our journey began with a simple goal — to provide high-quality, stylish, and affordable footwear for every step of life.
                        From casual wear and sports shoes to formal footwear and trendy collections, we carefully select every design to ensure comfort, durability, and modern style. At Varieties, we don’t just sell shoes — we help you walk with confidence.
                        Step in. Stand out.</p>
                    <p>Whether you're heading to work, hitting the gym, attending a special event, or just stepping out for the day, we have something perfect for you.
                        Customer satisfaction is at the heart of everything we do. We focus on quality materials, the latest trends, and excellent service to make your shopping experience smooth and enjoyable.</p>
                    <p>we don’t just sell shoes — we help you walk with confidence.Step in. Stand out.</p>
                </div>
                <div className='about-values'>
                    <h3>Our Values</h3>
                    <div className='about-container d-flex justify-content-around'>
                        <div className=''>
                            <h5>Connection</h5>
                            <p>We connect with the best producers in the world, those with generational knowledge and those who also share our values of accountability, transparency and sustainability.
                                We stay in the region, we break bread, we laugh and share stories, we get to know the culture and community, and most importantly, we work closely to make better shoes, for People and the Planet.</p>
                        </div>
                        <div className=''>
                            <h5>Community</h5>
                            <p>Our commitment centers around ensuring that the People and the Planet are considered at every stage of our value chain. We have aligned ourselves with the United Nations Sustainable Development Goals to make sure we are always at the forefront of addressing important issues like Ocean Pollution, Climate Change and Economic Inequalities.</p>
                        </div>
                        <div className=''>
                            <h5>Good design</h5>
                            <p>We believe in good design as a way of reducing waste. We focus on what matters: material make-up, design simplicity, sustainability, quality, comfort and functional integrity. We create versatile shoes that you actually want to wear, on-or-off the trail year round.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Aboutus