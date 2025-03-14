'use client'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { getTokenCahrtData } from '@/request/token';
// import {generateData} from '@/util/sampleChart';
import dayjs from 'dayjs';

const TradingChart = ({ tokenAddress }) => {
  const containerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  const [initData, setInitData] = useState([]);

  const fetchChartData = async (dateRange) => {
    const date = dayjs();
    const data = dateRange || {startTime: date.subtract(5, 'd').startOf('d').valueOf(), endTime: date.endOf('d').valueOf()};
    try {
      const res = await getTokenCahrtData(tokenAddress, data);
      console.log(res);
      setInitData(res);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [tokenAddress]);

  useEffect(() => {
    if (initData.length === 0 || !chartRef.current || !seriesRef.current) return;

    seriesRef.current.setData(initData);

    // chartRef.current.priceScale('right').applyOptions({
    //   minTick: 1e-8,
    //   minValue: 0,
    //   maxValue: 1e-6, 
    // });
    chartRef.current.timeScale().fitContent();
    chartRef.current.timeScale().scrollToPosition(5);
  }, [initData]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: containerRef.current.clientWidth });
    };
  
    const chart = createChart(containerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#000000'
        },
        width: '100%',
        textColor: '#eeeeee',
      },
      // localization: {
      //   timeFormatter: businessDayOrTimestamp => {
      //     const str = new Date(businessDayOrTimestamp * 1000).toLocaleString();
      //     console.log(str);
      //     return str;
      //   }
      // },
      grid: {
        vertLines: {
            color: '#333333',
        },
        horzLines: {
            color: '#333333',
        },
      },
      // priceScale: {
      //   labelFormatter: function (value) {
      //     console.log('priceScale', value);
      //     if (Math.abs(value) < 1e-6) {
      //         return value.toExponential(2);
      //     }
      //     return value.toFixed(8);
      //   },
      // },
      rightPriceScale: {
        textColor: '#eeeeee',
        // mode: 1,
        alignLabels: true,
        entireTextOnly: true,
        // labelFormatter: function (value) {
        //   console.log('right: ', value);
        //   if (Math.abs(value) < 1e-6) {
        //       return value.toExponential(2);
        //   }
        //   return value.toFixed(8);
        // },
      },
      timeScale: {
        labelColor: '#eeeeee',
        tickMarkFormatter: function (time, tickMarkType, locale) {
          const date = dayjs(time * 1000); 
          return date.format('HH:mm');
        },
      },
    });
    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        precision: 3,
        minMove: 1e-3,
      },
      // autoscaleInfoProvider: original => {
      //   const res = original();
      //   if (res !== null) {
      //       res.priceRange.minValue -= 1e-8;
      //       res.priceRange.maxValue += 1e-8;
      //   }
      //   return res;
      // },
    });

    // const data = generateData(2500, 20, 1000);

    // console.log(data);

    newSeries.setData(initData);
    // chart.priceScale('right').applyOptions({
    //   minTick: 1e-8,
    //   minValue: 0,
    //   maxValue: 1e-6, 
    // });
    chart.timeScale().fitContent();
    chart.timeScale().scrollToPosition(5);

    chartRef.current = chart;
    seriesRef.current = newSeries;
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, []);

  return (
    <div
      className='w-full h-full'
      ref={containerRef}
    ></div>
  );
}

export default TradingChart;
