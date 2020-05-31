import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard';
import './main.css';

function Main(){
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [returnData, setReturnData] = useState({});

    const handleClick = (e) =>{
        e.preventDefault();
        if(city === "" || startDate === ""){
            renderAlert('Please Fill in all of the fields', 'alert-danger');
        }else{
            fetch(`https://trace-the-bug-rest-api.herokuapp.com/correlation/${city}/${startDate}`)
            .then(res => res.json())
                .then(data => {
                    renderLoading();
                    setTimeout(() =>{
                        setReturnData(data);
                        const cityName = document.getElementById('searchCity');
                        const dateInput = document.getElementById('startDate');
                        cityName.value = "";
                        dateInput.value = "";
                        renderAlert('Data Analyzed! See Dashboard Below', 'alert-success');
                    }, 3000);
                })
                .catch(err =>{
                    renderAlert(err, 'alert-danger');
                })
            .catch(err =>{
                renderAlert(err, 'alert-danger');
            });
        }
    }

    function renderAlert(message, className){
        const inputDiv = document.getElementById('form-container');
        const inputForm = document.getElementById('search-form');
        const alert = document.createElement('div');
        alert.id = "alert";
        alert.className = "alert center-text mt-5 " + className;
        alert.appendChild(document.createTextNode(message));

        //Check that an alert is not already displayed
        if(document.getElementById("alert")){
            document.getElementById('alert').remove();
            inputDiv.insertBefore(alert, inputForm);
            setTimeout(() =>{
            alert.remove();
            }, 3000);
        }else{
            inputDiv.insertBefore(alert, inputForm);
            setTimeout(() =>{
            alert.remove();
            }, 3000);
        }
    }

    function renderLoading(){
        const button = document.getElementById('submit-btn');
        const div = document.getElementById('button-div');

        button.style.display = 'none';

        const spinner = document.createElement('div')
        spinner.className = "spinner-border text-dark";
        spinner.id = "loading-spinner";

        div.appendChild(spinner)

        setTimeout(() =>{
            spinner.remove();
            button.style.display = 'block';
        }, 3000);
    }

    const render = () =>{
        if(Object.keys(returnData).length === 0){
           return(
                <div className="dashboard">
                    <div className="container mt-5 text-center">
                        <h1 className="display-4">You Have Not Submited Any Data Yet!</h1>
                    </div>
                </div>
           ) 
        }else{
            return(
                < Dashboard data={returnData} />
            )
        }
    }

    const handleRefresh = (e) =>{
        e.preventDefault();
        const cityName = document.getElementById('searchCity');
        const dateInput = document.getElementById('startDate');

        if(Object.keys(returnData).length === 0){
            cityName.value = "";
            dateInput.value = "";
        }else{
            window.location.reload();
        }
    }

    return(
        <div className="Main mt-5">
            <div className="container justify-content-center">
                <div id="card-div">
                    <div className="card bg-transparent">
                        <div className="card-header text-center">
                            <p className="lead" id="card-title">Try Now!</p>
                        </div>
                        <div className="card-body" id="form-container">
                            <div className="text-center">
                            <p id="description">
                            Just type in a city and specify the date you want to analyze and allow our algorithm to go to work! Our algorithm takes a 5-day radius around the date of the specific location and uses mobility data to analyze social trends within that area and time frame! Our algorithm is able to analyze the trends in the mobility data and the new cases to describe correlations between social trends and the COVID-19 virus!
                            </p>
                            </div>
                            <form id="search-form">
                                <div className="form-group mb-5 mt-5">
                                    <label for="searchCity" style={{color: 'white'}}>Search By City/Region</label>
                                    <input id="searchCity" className="form-control" type="text" onChange={e => setCity(e.target.value)}></input>
                                </div>

                                <div className="form-group mt-5 mb-5">
                                    <label for="startDate" style={{color: 'white'}}>Date</label>
                                    <input id="startDate" className="form-control" type="date" onChange={e => setStartDate(e.target.value)}></input>
                                    <small id="datehelp" class="form-text mt-2" style={{color: 'white'}}>Date must be between 2020/2/5 and 2020/5/25</small>
                                </div>
                                <div className="justify-content-center text-center" id="button-div">
                                    <button className="btn btn-light mb-2" type="submit" id="submit-btn" onClick={e => handleClick(e)}>Search</button>
                                </div>
                                <div className="text-center justify-content-center">
                                    <button className="btn btn-danger"  id="restart-btn" onClick={e => handleRefresh(e)}>Restart</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                render()
            }
        </div>
    )
};

export default Main;