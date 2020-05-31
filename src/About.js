import React from 'react';
import './about.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gurman from './data/gurman.png';
import aleks from './data/aleks.JPG';
import eknoor from './data/eknoor.JPG';
import jupi from './data/jupi.png';
import kumail from './data/kumail.PNG';
import steven from './data/steven.JPG';

AOS.init({
    delay: 200,
    offset: 100
});

function About(){
    return(
        <div className="about-body">
            <div className="container text-center mt-5">
                <h1 className="heading-4">About Us</h1>
                <p className="lead text-muted" style={{color: 'white'}}>
                We at TraceTheBug are a Canadian team aiming to provide public health information about the novel
                 coronavirus by predicting locations of COVID-19 cases by assessing mobility data.
                </p>
            </div>

            <div className="container text-center mt-3 mb-5">
                <h1 className="heading-4">Our Mission</h1>
                <p className="lead text-muted" style={{color: 'white'}}>
                TraceTheBug is taking on COVID-19 by assessing transportation and total coronavirus cases in different regions around Ontario.
                 Our web application allows users to access information on COVID-19 hotspots correlating with Apple’s mobility data.
                  The data will be used to make predictions and recommendations about the future of the virus to three different groups of consumers.
                   These consumers consist of individuals, businesses, and the government, allowing for different insights of the data.
                    This opportunity allows for guidance toward each consumer basis about future daily plans when relating to their own interests. 
                </p>
            </div>
            <br/>
            <br/>
            <div className="container mt-5">
                <div className="row mb-5 justify-content-center person" data-aos="fade-right">
                    <div className="col-s6">
                        <img src={gurman}></img>
                    </div>
                    <div className="col-s6" id="descr">
                        <h2>Gurman Brar</h2>
                        <p>Software Developer At Veer AI (University of Waterloo '24)</p>
                        <p className="text-muted">Aspiring web developer with an interest in biotechnology</p>
                    </div>
                </div>
                <div className="row mb-5 justify-content-center person" data-aos="fade-left">
                    <div className="col-s6" id="descl">
                        <h2>Eknoor Singh</h2>
                        <p>Biomedical Engineering Student At University of Waterloo (University of Waterloo '24)</p>
                        <p className="text-muted">Plans to be a Product Manager at a BioTech Company</p>
                    </div>
                    <div className="col-s6">
                        <img src={eknoor} style={{transform: 'rotate(90deg)'}} id="ek"></img>
                    </div>
                </div>
                <div className="row mb-5 justify-content-center person" data-aos="fade-right">
                    <div className="col-s6">
                        <img src={aleks}></img>
                    </div>
                    <div className="col-s6" id="descr">
                        <h2>Aleksandar Djuricic</h2>
                        <p>Engineering Student At McMaster University (McMaster University '23)</p>
                        <p className="text-muted">Plans to be a mechanical engineer at a biotech company</p>
                    </div>
                </div>
                <div className="row mb-5 justify-content-center person" data-aos="fade-left">
                    <div className="col-s6" id="descl">
                        <h2>Steven Dhindsa</h2>
                        <p>Incoming AFM Student At University of Waterloo (University of Waterloo '25)</p>
                        <p className="text-muted">Aspiring Financial Analyst</p>
                    </div>
                    <div className="col-s6">
                        <img src={steven}></img>
                    </div>
                </div>
                <div className="row mb-5 justify-content-center person" data-aos="fade-right">
                    <div className="col-s6">
                        <img src={jupi}></img>
                    </div>
                    <div className="col-s6" id="descr">
                        <h2>Jagroop Gill</h2>
                        <p>Operations Support At Skyview Suites (University of Waterloo '24)</p>
                        <p className="text-muted">Plans to be a Product Manager at a Robotics Company</p>
                    </div>
                </div>
                <div className="row mb-5 justify-content-center person" data-aos="fade-left">
                    <div className="col-s6" id="descl">
                        <h2>Kumail Naqvi</h2>
                        <p>Incoming Engineering Student at McMaster University (McMaster University '24)</p>
                        <p className="text-muted">Aspired to work in the data science field with a fascination in corporate finance</p>
                    </div>
                    <div className="col-s6">
                        <img src={kumail}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;