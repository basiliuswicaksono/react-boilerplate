/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

import Header from '../../components/Header';

export default function HomePage() {
  const [dataCovid19, setDataCovid19] = useState();
  const [dataDaily, setDataDaily] = useState();
  const [dataTop5, setDataTop5] = useState();

  const fetchData = () => {
    fetch('https://covid19.mathdro.id/api/')
      .then(resp => resp.json())
      .then(data => {
        // console.log(data, 'dataCovid19');
        setDataCovid19(data);
      });
    // .catch(err => console.log(err));
  };

  const fetchDailyData = () => {
    fetch('https://covid19.mathdro.id/api/daily')
      .then(resp => resp.json())
      .then(data => {
        const lastupdate = data.slice(-10);
        const temp = lastupdate.map(element => ({
          confirmed: element.deltaConfirmed,
          date: element.reportDate,
          recovered: element.deltaRecovered,
          deaths: element.deaths.total,
        }));
        // console.log(temp, 'ini data daily update');
        setDataDaily(temp);
      });
  };

  const fetchDataTop5 = () => {
    fetch('https://covid19.mathdro.id/api/confirmed')
      .then(resp => resp.json())
      .then(data => {
        const top = data.slice(0, 5);
        // console.log(top, 'ini top update');
        setDataTop5(top);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDailyData();
    fetchDataTop5();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block sidebar collapse"
            style={{ background: '#ece4e3' }}
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#0">
                    <span data-feather="home" />
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#0">
                    <span data-feather="file" />
                    Orders
                  </a>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a
                  className="link-secondary"
                  href="#0"
                  aria-label="Add a new report"
                >
                  <span data-feather="plus-circle" />
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="#0">
                    <span data-feather="file-text" />
                    Current month
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container-fluid col-md-9 ms-sm-auto col-lg-10">
            <div className="row">
              <div className=" col-sm-7 p-4">
                <h1>Status 1</h1>
                <div
                  className="container rounded p-4 shadow"
                  style={{ background: '#e3e5e7' }}
                >
                  <h5 className="text-decoration-underline mt-4">
                    Daily Deaths & Recovered
                  </h5>
                  <LineChart
                    width={800}
                    height={500}
                    data={dataDaily}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      stroke="#3688f4"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="deaths" stroke="#f44336" />
                  </LineChart>
                </div>
              </div>

              <div className="col-sm-5 p-4">
                <h1>Status 2</h1>
                <div
                  className="container rounded shadow"
                  style={{ background: '#ffc166' }}
                >
                  <div className="row border-bottom">
                    <h5 className="text-decoration-underline mt-5">
                      Confirmed status
                    </h5>
                    {dataCovid19 && (
                      <h1 className="fs-1">{dataCovid19.confirmed.value}</h1>
                    )}
                  </div>

                  <div className="row border-bottom">
                    <h5 className="text-decoration-underline mt-3">
                      Daily Summary
                    </h5>

                    <BarChart
                      width={500}
                      height={300}
                      data={dataDaily}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="confirmed" fill="#8884d8" />
                    </BarChart>
                  </div>
                  <div className="row">
                    <h5 className="text-decoration-underline mt-3">
                      Top 5 Case
                    </h5>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Country</th>
                          <th scope="col">Confirmed</th>
                          <th scope="col">Deaths</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataTop5 &&
                          dataTop5.map((el, index) => (
                            <tr>
                              <th scope="row">{index}</th>
                              <td>{el.countryRegion}</td>
                              <td>{el.confirmed}</td>
                              <td>{el.deaths}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <h5 className="p-2">Real time report</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
