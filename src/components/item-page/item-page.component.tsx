import {useEffect, useState} from "react";
import style from './item-page.module.scss'
import ReactApexChart from "react-apexcharts";
import {getItemCoinCandles} from "../../core/services/http.service";



const ItemPageComponent = () => {

    const [stateChart, SetStateChart] = useState<any>({
        series: [{ data: [
                {
                    x: new Date(1538881200000),
                    y: [6603.5, 6603.99, 6597.5, 6603.86]
                },
                {
                    x: new Date(1538883000000),
                    y: [6603.85, 6605, 6600, 6604.07]
                },
                {
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606]
                },
            ] }],
        options: {
            chart: {
                type: 'candlestick',
                height: 350
            },
            title: {
                text: 'CandleStick Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                }
            }
        },
    })




    const [queryParam, setQueryParam] = useState<any>({
        exchange: 'bitstamp',
        pair: '',
        period: 1800,
    })

    /** set query params*/
    useEffect(() => {
        const actualCoin = decodeURIComponent(window.location.pathname.split('/coin/')[1])
        const newQueryParam = {...queryParam}
        newQueryParam.pair = `${actualCoin.toLowerCase()}usd`
        setQueryParam(newQueryParam)
    }, [])

    /** generate link*/
    useEffect(() => {
        if (queryParam.exchange && queryParam.pair) {
            getItemCoinCandles({link: `https://api.cryptowat.ch/markets/${queryParam.exchange}/${queryParam.pair}/ohlc?periods=${queryParam.period}`})
                .then(({data}) => {
                    console.log(data.result)
                })
        }
    }, [queryParam])

    /** generate data for chart*/


    return (
        <div className={style.main}>

            {stateChart && <div className={style.main_candles}>
                {/*@ts-ignore*/}
                <ReactApexChart options={stateChart.options}
                                series={stateChart.series}
                                type="candlestick"
                                height={350}
                ></ReactApexChart>
            </div>}


        </div>
    )


};

export default ItemPageComponent;
