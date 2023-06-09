import React, {useState, useEffect} from 'react'

//Chart Js
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// Axios
import axios from 'axios';

// MUI Skeleton
import Skeleton from '@mui/material/Skeleton';

// MUI Snackbar
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// MUI Pagination
import Pagination from '@mui/material/Pagination';

// Test Data
import test_marketData from './_TestData_/marketData';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function MarketContent(props) {
    // Theme Color Setter
    const background_1 = props.isCheckedTheme ? "darkBG1" : "lightBG1"
    const textColor_1 = props.isCheckedTheme ? "darkText1" : "lightText1"

    // Snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const showSnackbar = () => {
      setOpenSnackbar(true);
    };
    const closeSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
    };

    // Pagination
    const [page, setPage] = useState(1)
    const handlePage = (event, value) => {
        setPage(value)
        setisLoadingMarketData(true)
    } 

    //Chart settings
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
        },
    };

    // Loading data variable
    const [isLoadingMarketData, setisLoadingMarketData] = useState(true); 
    const [marketData, setMarketData] = useState(null); 
    const loadMarketData = async () => {
        try {
            closeSnackbar()
            const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_7d_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=7d`);
            setMarketData(result.data);
            setisLoadingMarketData(false)
        } 
        catch (error) {
            showSnackbar()
            const result = test_marketData
            setMarketData(result)
            setisLoadingMarketData(false)
        }
    };

    useEffect(() => {
        loadMarketData();
    }, [page,isLoadingMarketData])

    const marketDataMapping = isLoadingMarketData
    ? Array.from({ length: 20 }, (_, index) => (
        <div className='row' style={{display: 'flex',alignItems:'center'}} key={index}>
          <Skeleton animation="wave" height={60} width={'100%'}/>
        </div>
      ))
    : marketData && marketData.length > 0
    ? marketData.map((res, index) => {
        // Setting up current price in USD
        const currentPrice = res.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        const percentage24 = res.price_change_percentage_24h.toFixed(2)
        const marketCap = res.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        // Creating datasets for line graph
        const changes7days = res.sparkline_in_7d.price
        const coinGraph = []

        changes7days.map((changes) => {
            let percentageChange = ((res.current_price - changes) / changes) * 100
            coinGraph.push(percentageChange.toFixed(2))
        })
    
        return (
            <div className='row' key={index}>
                <div className='col col2' style={{padding:'0px 20px'}}>
                    <span className={textColor_1}>{res.market_cap_rank}</span>
                </div>
                <div className='col col3' style={{padding:'0px 20px'}}>
                    <div className='nameDetails'>
                        <img src={res.image} alt='Coin Image'/>
                        <p className={textColor_1}>{res.name} <span>{res.symbol}</span></p>
                    </div>
                </div>
                <div className='col col4' style={{padding:'0px 20px'}}>
                    <span className={textColor_1}>{currentPrice}</span>
                </div>
                <div className='col col5' style={{padding:'0px 20px'}}>
                    <span className={percentage24 < 0 ? "low24" : "high24"}>{percentage24 < 0 ? "" : "+"}{percentage24}%</span>
                </div>
                <div className='col col6' style={{padding:'0px 20px'}}>
                    <span className={textColor_1}>{marketCap.slice(0, -3)}</span>
                </div>
                <div className='col col7' style={{padding:'0px 20px',flexGrow: '1'}}>
                    <div style={{width:"70%",height:'70px',overflow:'hidden', display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <Line 
                            data={
                                {
                                    labels: coinGraph,
                                    datasets:[{
                                        fill: true,
                                        tension: 0.5,
                                        borderWidth: 0,
                                        backgroundColor: [
                                            percentage24 < 0 ? "#d3353586" : "#58bd7d8a"
                                        ],
                                        data:coinGraph
                                    },]
                                }
                            } 
                            options={options}
                        />
                    </div>
                </div>
            </div>
        );
      })
  : null;

  return (
    <div className={`marketMainContent ${background_1}`} style={{paddingTop: '70px'}}>
        <div className='marketContent everyContainerWidth'>
            <div className='headerContainer'>
                <p className={`title ${textColor_1}`}>Market Update</p>
            </div>

            {/* Table Header */}
            <div className='tableHeader'>
                <div className='col col2'><span>#</span></div>
                <div className='col col3'><span>Name</span></div>
                <div className='col col4'><span>Last Price</span></div>
                <div className='col col5'><span>24h %</span></div>
                <div className='col col6'><span>Market Cap</span></div>
                <div className='col col7' style={{flexGrow: '1'}}><span>Last 7 Days</span></div>
            </div>
            {/* Table Body */}
            <div className='tableBody'>
                    {marketDataMapping}
            </div> 

            <div className='pagination'>
                <Pagination count={50} onChange={handlePage} shape="rounded" className='paginationContent' size="large"/>   
            </div>  
        </div>

        {/* Snackbar */}
        <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity="warning">API can't handle too many request, Try again later!</Alert>
        </Snackbar>
    </div>
  )
}
