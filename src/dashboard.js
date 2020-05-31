import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Dashboard(data){
    const [info, setData] = useState(data.data);
    const [graphData, setGraphData] = useState([]);

    console.log(graphData);
    useEffect(() =>{
        let cases = info.totalCases;
        let dates = [];
        let graphData = {};
        let final = [];

        cases.forEach(x =>{
            if(dates.includes(x.date) === false){
                dates.push(x.date);
            }
        });

        dates.forEach(date =>{
            graphData[date] = 0;
        });

        dates.forEach(date =>{
            cases.forEach(x =>{
                if(x.date === date){
                    graphData[date]++;
                }
            })
        });

        const keys = Object.keys(graphData);

        keys.forEach(key =>{
            final.push({date: key, value: graphData[key]});
        });

        let sorted = final.sort((a,b) =>{
            return(
                new Date(a.date) - new Date(b.date)
            );
        });

        setGraphData(sorted);
    
    }, []);


    function total(){
        let total = 0;
        graphData.forEach(data =>{
            total += data.value;
        })

        return total;
    };

    const analysis = () =>{
        for(let i = 0; i < graphData.length - 1; i++){

            const keys = Object.keys(info.ontarioData[0]);
            let mobInc = [];
            let incCount = 0;
            keys.forEach(key =>{
                if(key !== "date"){
                    if(info.ontarioData[i + 1][key] - info.ontarioData[i][key] > 0){
                        incCount++;
                        mobInc.push({date: info.ontarioData[i].date, type: key});
                    }
                }
            });

            let mobDec = [];
            let decCount = 0;
            keys.forEach(key =>{
                if(key !== "date"){
                    if(info.ontarioData[i + 1][key] - info.ontarioData[i][key] < 0){
                        decCount++;
                        mobDec.push({date: info.ontarioData[i].date, type: key});
                    }
                }
            });

            console.log(decCount, incCount);
            let case1 = false;
            let case2 = false;
            let case3 = false;
            let case4 = false;
            let case5 = false;
            let case6 = false;
            let case7 = false;
            let case8 = false;
            let case9 = false;


            //Increases and Decreases were the same amount but cases went up
            //Increases and decreases same but cases went down 
            if(incCount === decCount && (graphData[i + 1].value - graphData[i].value > 0)){
                case8 = true;
            }else if(incCount === decCount && (graphData[i + 1].value - graphData[i].value < 0)){
                case9 = true;
            }

            //if all increase and cases increase
            //If all decrease and cases decrease
            if(incCount >= 3 && (graphData[i + 1].value - graphData[i].value > 0)){
                case1 = true;
            }else if(decCount >= 3 && (graphData[i + 1].value - graphData[i].value < 0)){
                case2 = true;
            }

            //if all increase and cases stay same
            //if all decrease and cases stay the same
            if(incCount >= 3 && (Math.abs(graphData[i + 1].value - graphData[i].value) < 0.1 * (graphData[i].value))){
                case3 = true;
            }else if(decCount >= 3 && (Math.abs(graphData[i + 1].value - graphData[i].value) < 0.1 * (graphData[i].value))){
                case4 = true;
            }


            //if all increase and cases decrease
            //if all decrease and cases increase
            if(incCount >= 3 && (graphData[i + 1].value - graphData[i].value < 0)){
                case5 = true;
            }else if(decCount >= 3 && (graphData[i + 1].value - graphData[i].value > 0)){
                case6 = true;
            }

            //No new cases inbetween days
            if(graphData[i].value === 0){
                case7 = true;
            }


            let final = [];

            if(case1){
                final.push(
                <p style={{color: 'white'}}>
                    There were the following large spikes that lead to increases of new cases on the same day:{
                        mobInc.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    The amount of activity in this region is predicted to influence the infectivity (new number of cases) and rapid increase.
                    The above mobility data has seen the largest spikes on the corresponding dates which has lead to direct increases in new cases and
                    should be avoided by persons in order to help stop the spread of disease.
                </p>
                );

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case2){
                final.push(
                <p style={{color: 'white'}}>
                    There were the following large drops that lead to decreases in new cases on the same day:{
                        mobDec.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    The amount of activity in this region is predicted to influence the infectivity (new number of cases) and rapid decrease.
                    The above mobility data has seen the largest drops on the corresponding dates which have lead to direct decreases in new cases.
                    Persons should continue to avoid the above public destinations as it will contribute to the decreases in cases in this region.
                </p>
                );

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case3){
                final.push(<p style={{color: 'white'}}>
                    The following large spikes occurred in mobility data:{
                        mobInc.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    However, the number of cases increasing or decreasing stayed below 10% of the previous day's cases, and therefore the mobility data did not correlate the changes in cases for this region. This could be due to several factors. There is either not enough data on the specific region to draw a strong correlation or external factors played a large part in new cases.
                </p>);

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case4){
                final.push(<p style={{color: 'white'}}>
                    The following large drops occurred in mobility data:{
                        mobInc.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    However, the number of cases increasing or decreasing stayed below 10% of the previous day's cases, and therefore the mobility data did not have a correlation to the changes in cases for this region. This could be due to several factors. There is either not enough data on the specific region to draw a strong correlation or external factors played a large part in new cases.
                </p>);

                    final.push(
                        <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case5){
                final.push(<p style={{color: 'white'}}>
                    The following large spikes occorred in mobility data:{
                         mobInc.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    However, this resulted in the total number of new cases on those dates to decrease. This means that although regular public interaction is beginning,
                    people are still following safety protocols and not spreading the disease. People can begin to start visiting these destinations but remain resilient with health protocols such as washing hands, wearing masks, and remaining a safe distance from others.
                </p>);

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case6){
                final.push(<p style={{color: 'white'}}>
                    The following large drops occorred in mobility data:{
                         mobDec.map(data =>{
                            return(
                                <p className="mt-2">{data.date.replace("T04:00:00.000Z", "")}: {data.type.replace('_', " ")}</p>
                            )
                        })
                    }
                    The resulting number of new cases on this date remained to increases even tho public interaction and human movement remained low.
                    We can conclude that there is an external factor playing a role in the spread of the virus and that health protocols should be followed
                    and these public destinations should be avoided until the rate of cases begins to drop and the external factor is removed.
                </p>);

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case7){
                final.push(<p style={{color: 'white'}}>
                   This region contained insufficient data on certain dates and therefore a thorough analysis could not be done for these dates                </p>);

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case8){
                final.push(<p style={{color: 'white'}}>
                    Although the number of increases and decreases in mobility data has leveled out on each day, there is still human movement and therefore the number of new cases will continue to grow. This may indicate a prone region to infectivity.
                </p>);
                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(case9){
                final.push(<p style={{color: 'white'}}>
                    There is either insufficient data or the correlation between mobility data and the new cases data is not visible. They do not directly impact each other.
                    Increased movement can increase cases but decreases movement or plateau movement doe not necessarily decrease cases.
                </p>);
                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            if(!case1 && !case2 && !case3 && !case4 && !case5 && !case6 && !case7){
                final.push(<p style={{color: 'white'}}>
There was no correlation found between the mobility data and the case data of this region.                </p>);

                final.push(
                    <hr style={{paddingLeft: '10px', paddingRight: '10px', height: '1px', backgroundColor: '#00FFFB'}}/>
                    )
            }

            return(
                <React.Fragment>
                    {
                        final.map(term =>{
                            return(
                                term
                            )
                        })
                    }
                </React.Fragment>
            )
        }
    };

    function nextSteps(){

    };

    return(
        <div className="dashboard mt-5 mb-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-9">
                        <div className="card bg-transparent" id="card-div">
                            <div className="card-header text-center">
                                <p className="lead" id="card-header">Graphs</p>
                            </div>
                            <div className="card-body text-center">
                                <small className="mb-3" style={{color: 'white'}}>All X-axix values are in same order as data table</small>
                                <p className="lead" id="graph-header">Changes In Cases (#)</p>
                                <LineChart width={700} height={300} data={graphData}>
                                    <Line type="monotone" dataKey="value" stroke="#F03309"></Line>
                                    <CartesianGrid stroke="#eee" />
                                    <XAxis stroke="#eee" />
                                    <YAxis dataKey="value" stroke="#eee" />
                                    <Tooltip />
                                </LineChart>
                                <br/>
                                <p className="lead" id="graph-header">Mobility Changes from Baseline (%)</p>
                                <LineChart width={700} height={300} data={info.ontarioData}>
                                    <Line type="monotone" dataKey="retail_change" stroke="#F03309"></Line>
                                    <Line type="monotone" dataKey="grocery_change" stroke="#F0D409"></Line>
                                    <Line type="monotone" dataKey="parks_change" stroke="#98F009"></Line>
                                    <Line type="monotone" dataKey="transit_change" stroke="#09F0B8"></Line>
                                    <Line type="monotone" dataKey="workplace_changes" stroke="#A009F0"></Line>
                                    <Line type="monotone" dataKey="residential_changes" stroke="#F0099F"></Line>
                                    <CartesianGrid stroke="#eee" />
                                    <XAxis dataKey="data" stroke="#eee" />
                                    <YAxis stroke="#eee" />
                                    <Tooltip />
                                </LineChart>
                                <br/>
                                <small className="mb-3" style={{color: 'white'}}>Hover over the chart to see data</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card bg-transparent" id="card-div">
                            <div className="card-header text-center">
                                <p className="lead" id="card-header">Data</p>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{color: '#00FFFB'}}>Date</th>
                                            <th scope="col" style={{color: '#00FFFB'}}>Cases</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            graphData.map((data, i) =>{
                                                return(
                                                    <tr key={i} style={{color: 'white'}}>
                                                        <td>{data.date.replace("T04:00:00.000Z", "")}</td>
                                                        <td>{data.value}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td style={{color: '#00FFFB'}}>Total</td>
                                            <td style={{color: '#00FFFB'}}>{total()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-transparent" id="card-div">
                            <div className="card-header text-center">
                                <p className="lead" id="card-header">Analysis</p>
                            </div>
                            <div className="card-body text-center">
                                {
                                    analysis()
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;