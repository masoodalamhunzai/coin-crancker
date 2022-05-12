import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HeadingModule from "../components/Layout/HeadingComponent/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactApexChart from "react-apexcharts";
// import { useAuth0 } from "@auth0/auth0-react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { Link } from "react-router-dom";
import bitcoin from "../bitcoin.json";
import eth from "../eth.json";
import zec from "../zec.json";
// import { mapStateToProps } from './mappers';

const DashboardModule = () => {
  // date picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [walletChartIsActive, setWalletChartIsActive] = useState({
    btcChart: true,
    ethChart: false,
    zCashChart: false,
  });
  const [bitcoinData, setbitcoinData] = useState(null);
  const [ethData, setEthData] = useState(null);
  const [zecData, setZecData] = useState(null);
  const [btcTotalRevenue, setBtcTotalRevenue] = useState(null);
  const [ethTotalRevenue, setEthTotalRevenue] = useState(null);
  const [zCashTotalRevenue, setZCashTotalRevenue] = useState(null);
  const [btcCurrentPoint, setBtcCurrentPoint] = useState(null);
  const [ethCurrentPoint, setEthCurrentPoint] = useState(null);
  const [zCashCurrentPoint, setZCashCurrentPoint] = useState(null);

  // const fetchData = () => {
  //   fetch("http://192.168.1.31:3000/coinsgraph/all")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         let bitcoinDataArray = [];
  //         let count = [];
  //         data.map((item) => {
  //           const dateTime = item.dtime.substring(0, 10);
  //           const price = parseFloat(item.price.toFixed(5));

  //           bitcoinDataArray.push([dateTime, price]);
  //           count.push(price);

  //           let totalPoolRevenue = count.reduce((a, b) => a + b);
  //           setbitcoinData(bitcoinDataArray);
  //           setTotalRevenue(totalPoolRevenue.toFixed(5));
  //         }, 3000);
  //       }
  //     });
  // };
  // get coin Array menthod
  const getCoinArray = (coin) => {
    let coinDataArray = [];
    let coinTotal = [];
    let coinObj = {};
    coin.map((bitcoin) => {
      const dateTime = bitcoin[0].substring(0, 10);
      const price = parseFloat(bitcoin[2].toFixed(5));
      coinDataArray.push([dateTime, price]);
      coinTotal.push(price);
    });
    coinObj["data"] = coinDataArray;
    coinObj["price"] = coinTotal;
    return coinObj;
  };

  // filter Last month data
  const filterLastMonthData = (data) => {
    let currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    let oneMonthData = data.filter((date) => {
      let lastMonth = new Date(date[0]);
      return currentMonth < lastMonth;
    });
    return oneMonthData;
  };

  // get Bitcoin Data
  const getBitcoinData = () => {
    const bitcoinObj = getCoinArray(bitcoin.payout_history);
    let monthlyData = filterLastMonthData(bitcoinObj.data).map(
      (price) => price[1]
    );
    let monthlyRevenue = monthlyData.reduce((a, b) => a + b).toFixed(5);
    setbitcoinData(bitcoinObj.data);
    setBtcCurrentPoint(monthlyData[0]);
    setBtcTotalRevenue(monthlyRevenue);
  };
  // get eth Data
  const getEthData = () => {
    const ethObj = getCoinArray(eth.payout_history);
    let monthlyData = filterLastMonthData(ethObj.data).map((price) => price[1]);
    let monthlyRevenue = monthlyData.reduce((a, b) => a + b).toFixed(5);
    setEthData(ethObj.data);
    setEthCurrentPoint(monthlyData[0]);
    setEthTotalRevenue(monthlyRevenue);
  };
  // get zCash Data
  const getZecData = () => {
    const zecObj = getCoinArray(zec.payout_history);
    let monthlyData = filterLastMonthData(zecObj.data).map((price) => price[1]);
    let monthlyRevenue = monthlyData.reduce((a, b) => a + b).toFixed(5);
    setZecData(zecObj.data);
    setZCashCurrentPoint(monthlyData[0]);
    setZCashTotalRevenue(monthlyRevenue);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    getBitcoinData();
    getEthData();
    getZecData();
  }, []);

  const { btcChart, ethChart, zCashChart } = walletChartIsActive;
  let chartName = btcChart ? "bitcoin" : ethChart ? "eth" : "zcash";
  const option = {
    series: [
      {
        name: chartName,
        data: btcChart ? bitcoinData : ethChart ? ethData : zecData,
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
          },
        ],
        xaxis: [
          {
            x: new Date("1 jan 2021").getTime(),
            borderColor: "#999",
            yAxisIndex: 0,
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 jan 2021").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },

    selection: "one_year",
  };

  return (
    <section className="zl_dashboard_page">
      <HeadingModule name={"Dashboard"} />
      <div className="zl_all_page_comman_content">
        <div className="zl_chart_box_heading_date">
          <h2 className="zl_chart_box_heading">Revenue</h2>
          <div className="zl_dashboard_datepicker position-relative">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              dateFormat="MMM, yyyy"
            />
          </div>
        </div>
        <div id="chart">
          <div id="chart-timeline">
            {btcChart
              ? bitcoinData && (
                  <ReactApexChart
                    options={option.options}
                    series={option.series}
                    type="area"
                    width={1000}
                    height={350}
                  />
                )
              : ethChart
              ? bitcoinData && (
                  <ReactApexChart
                    options={option.options}
                    series={option.series}
                    type="area"
                    width={1000}
                    height={350}
                  />
                )
              : zCashChart
              ? bitcoinData && (
                  <ReactApexChart
                    options={option.options}
                    series={option.series}
                    type="area"
                    width={1000}
                    height={350}
                  />
                )
              : ""}
          </div>
        </div>
        <div className="zl_all_page_comman_total_price">
          <p className="zl_all_page_total_price_heading">Total Revenue</p>
          <h2 className="zl_all_page_total_price_text">
            $
            {btcChart
              ? btcTotalRevenue
              : ethChart
              ? ethTotalRevenue
              : zCashTotalRevenue}
          </h2>
          <span className="zl_all_page_total_price_up_text">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.66668V1.33334"
                stroke="#50E2C2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 3.33334L4 1.33334L6 3.33334"
                stroke="#50E2C2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            7,00%
          </span>
        </div>
      </div>
      <div className="zl_add_currency_content">
        <h3 className="zl_bottom_content_heading">Wallets</h3>
        <div className="zl_add_currency_row row">
          <div
            className="zl_add_currency_column col pointer"
            onClick={() =>
              setWalletChartIsActive({
                btcChart: true,
                ethChart: false,
                zCashChart: false,
              })
            }
          >
            <div className="zl_add_currency_inner_content">
              <div className="zl_add_currency_icon_chart">
                {/* <img src="assets/image/Bitcoin.svg" alt="currency-icon" /> */}
                <div className="zl_currency_icon">
                  <svg
                    viewBox="0 0 34 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.96 9.45191L13.9783 13.2264H19.3666C20.3236 13.2264 21.0992 12.4443 21.0944 11.4825L21.093 11.1958C21.0884 10.2338 20.3053 9.45191 19.3482 9.45191H14.6976H13.96ZM21.7786 18.9638L21.7771 18.6608C21.772 17.5879 20.8995 16.7168 19.8322 16.7168H19.3838H13.9955L14.0159 20.9079H19.8524C20.9198 20.9079 21.7838 20.0353 21.7786 18.9638ZM23.4886 14.6793C24.5609 15.6723 25.2408 17.0875 25.2484 18.6608L25.2499 18.9638C25.2645 21.9591 22.8506 24.3969 19.8692 24.3969H19.7373L19.7449 26H16.2735L16.2657 24.3969H14.8429L14.8507 26H11.3793L11.3715 24.3969H10.5611H8.83951L8.82256 20.9079H10.5442L10.5239 16.7168L10.5068 13.2264L10.4886 9.45189H8.76694L8.75 5.9616H11.282L11.2725 4H14.7439L14.7534 5.9616H16.1763L16.1667 4H19.6383L19.6478 5.97803C22.3731 6.14423 24.5513 8.41715 24.5648 11.1958L24.5661 11.4825C24.572 12.6866 24.1667 13.7932 23.4886 14.6793Z"
                        fill="url(#paint0_linear)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.96 9.45191L13.9783 13.2264H19.3666C20.3236 13.2264 21.0992 12.4443 21.0944 11.4825L21.093 11.1958C21.0884 10.2338 20.3053 9.45191 19.3482 9.45191H14.6976H13.96ZM21.7786 18.9638L21.7771 18.6608C21.772 17.5879 20.8995 16.7168 19.8322 16.7168H19.3838H13.9955L14.0159 20.9079H19.8524C20.9198 20.9079 21.7838 20.0353 21.7786 18.9638ZM23.4886 14.6793C24.5609 15.6723 25.2408 17.0875 25.2484 18.6608L25.2499 18.9638C25.2645 21.9591 22.8506 24.3969 19.8692 24.3969H19.7373L19.7449 26H16.2735L16.2657 24.3969H14.8429L14.8507 26H11.3793L11.3715 24.3969H10.5611H8.83951L8.82256 20.9079H10.5442L10.5239 16.7168L10.5068 13.2264L10.4886 9.45189H8.76694L8.75 5.9616H11.282L11.2725 4H14.7439L14.7534 5.9616H16.1763L16.1667 4H19.6383L19.6478 5.97803C22.3731 6.14423 24.5513 8.41715 24.5648 11.1958L24.5661 11.4825C24.572 12.6866 24.1667 13.7932 23.4886 14.6793Z"
                        fill="#7781A2"
                      />
                    </g>
                  </svg>
                </div>
                <Sparklines
                  data={[0, 5, 0, 15, 12, 14]}
                  margin={6}
                  className="zl_add_currency_mini_chart"
                >
                  <SparklinesLine
                    style={{
                      strokeWidth: 10,
                      stroke: "#fec74f",
                      fill: "none",
                      curve: "smooth",
                    }}
                  />
                  <SparklinesSpots
                    size={4}
                    style={{
                      stroke: "#fec74f",
                      strokeWidth: 3,
                      fill: "white",
                    }}
                  />
                </Sparklines>
              </div>
              <div className="zl_add_currency_price">
                <div className="zl_add_currency_left_price">
                  <h3>BTC</h3>
                  <p>{btcCurrentPoint}</p>
                  {/* <p>1.9678</p> */}
                </div>
                <div className="zl_add_currency_right_price">
                  <span>
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.60609 3.60609L2.69695 4.51523C2.36222 4.84996 1.81951 4.84996 1.48477 4.51523C1.15004 4.18049 1.15004 3.63778 1.48477 3.30305L2.39391 2.39391L0 0H6V6L3.60609 3.60609Z"
                        fill="#50E2C2"
                      />
                    </svg>
                    +12,5%
                  </span>
                  <p>$6,541.1</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="zl_add_currency_column col pointer"
            onClick={() =>
              setWalletChartIsActive({
                btcChart: false,
                ethChart: true,
                zCashChart: false,
              })
            }
          >
            <div className="zl_add_currency_inner_content">
              <div className="zl_add_currency_icon_chart">
                <div className="zl_currency_icon">
                  <svg
                    viewBox="0 0 17 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.48909 9.60596L0 13.2332L8.48909 17.9453L16.9748 13.2332L8.48909 9.60596Z"
                      fill="#010101"
                      fillOpacity="0.6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 13.2332L8.48909 17.9452V0L0 13.2332Z"
                      fill="#96A0C2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.48926 0V17.9452L16.975 13.2332L8.48926 0Z"
                      fill="#7680A0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 14.7444L8.48909 25.9805V19.4564L0 14.7444Z"
                      fill="#96A0C2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.48926 19.4564V25.9805L16.9817 14.7444L8.48926 19.4564Z"
                      fill="#7680A0"
                    />
                  </svg>
                </div>
                <Sparklines
                  data={[14, 12, 15, 0, 5, 0]}
                  margin={6}
                  className="zl_add_currency_mini_chart"
                >
                  <SparklinesLine
                    style={{
                      strokeWidth: 10,
                      stroke: "#A330FF",
                      fill: "none",
                      curve: "smooth",
                    }}
                  />
                  <SparklinesSpots
                    size={4}
                    style={{
                      stroke: "#A330FF",
                      strokeWidth: 3,
                      fill: "white",
                    }}
                  />
                </Sparklines>
              </div>
              <div className="zl_add_currency_price">
                <div className="zl_add_currency_left_price">
                  <h3>ETH</h3>
                  <p>{ethCurrentPoint}</p>
                  {/* <p>3.2134</p> */}
                </div>
                <div className="zl_add_currency_right_price">
                  <span className="zl_add_currency_down_price">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.60609 2.39391L2.69695 1.48477C2.36222 1.15004 1.81951 1.15004 1.48477 1.48477C1.15004 1.81951 1.15004 2.36222 1.48477 2.69695L2.39391 3.60609L0 6H6V0L3.60609 2.39391Z"
                        fill="#E3507A"
                      />
                    </svg>
                    -5.23%
                  </span>
                  <p>$3,452.1</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="zl_add_currency_column col pointer"
            onClick={() =>
              setWalletChartIsActive({
                btcChart: false,
                ethChart: false,
                zCashChart: true,
              })
            }
          >
            <div className="zl_add_currency_inner_content">
              <div className="zl_add_currency_icon_chart">
                <div className="zl_currency_icon">
                  <img src="assets/image/zcash.svg" alt="zcash" />
                </div>
                <Sparklines
                  data={[0, 5, 0, 15, 12, 14]}
                  margin={6}
                  className="zl_add_currency_mini_chart"
                >
                  <SparklinesLine
                    style={{
                      strokeWidth: 10,
                      stroke: "#309AFF",
                      fill: "none",
                      curve: "smooth",
                    }}
                  />
                  <SparklinesSpots
                    size={4}
                    style={{
                      stroke: "#309AFF",
                      strokeWidth: 3,
                      fill: "white",
                    }}
                  />
                </Sparklines>
              </div>
              <div className="zl_add_currency_price">
                <div className="zl_add_currency_left_price">
                  <h3>ZCASH</h3>
                  <p>{zCashCurrentPoint}</p>
                  {/* <p>38.234</p> */}
                </div>
                <div className="zl_add_currency_right_price">
                  <span>
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.60609 3.60609L2.69695 4.51523C2.36222 4.84996 1.81951 4.84996 1.48477 4.51523C1.15004 4.18049 1.15004 3.63778 1.48477 3.30305L2.39391 2.39391L0 0H6V6L3.60609 3.60609Z"
                        fill="#50E2C2"
                      />
                    </svg>
                    +39.69%
                  </span>
                  <p>$346.31</p>
                </div>
              </div>
            </div>
          </div>
          <div className="zl_add_currency_column col">
            <Link to={"/addcurrency"} className="zl_add_currency_btn_content">
              + Add Currency
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(null, null)(DashboardModule);
