'use client'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { getTokenCahrtData } from '@/request/token';
// import {generateData} from '@/util/sampleChart';
import dayjs from 'dayjs';
import {Button} from 'antd';
import {GlobalContext} from '@/context/global';

const TradingChart = ({ tokenAddress }) => {
  const {onSocket, offSocket, sendMessage} = useContext(GlobalContext);
  const containerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  const [initData, setInitData] = useState([]);
  const [day, setDay] = useState(5);
  const [mode, setMode] = useState(0);
  const [realTime, setRealTime] = useState(false);

  const fetchChartData = async (dateRange) => {
    const date = dayjs();
    const data = dateRange || {startTime: date.subtract(5, 'd').startOf('d').valueOf(), endTime: date.endOf('d').valueOf()};
    try {
      const res = await getTokenCahrtData(tokenAddress, data);
      setInitData(res);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

  useEffect(() => {
    if (!tokenAddress) return;
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
      localization: {
        timeFormatter: businessDayOrTimestamp => {
          const str = dayjs(businessDayOrTimestamp * 1000).format('YYYY-MM-DD HH:mm');
          return str;
        }
      },
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

    const realTime = localStorage.getItem('realTime');
    setRealTime(realTime === undefined ? true : JSON.parse(realTime));

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, []);

  const listenRealTime = useCallback((item) => {
    if (item.tokenAddress === tokenAddress) {
      const d = {
        time: dayjs(item.timestamp || item.time).unix(),
        open: Number(item.startPrice),
        high: Number(item.maxPrice),
        low: Number(item.minPrice),
        close: Number(item.endPrice),
      };
      seriesRef.current?.update(d);
    }
  }, [tokenAddress]);

  const subRealTime = useCallback(() => {
    if (!tokenAddress) return;
    sendMessage('subToken', {address: tokenAddress});
    onSocket('price', listenRealTime);
  }, [listenRealTime, onSocket, sendMessage, tokenAddress]);

  const unsubRealTime = useCallback(() => {
    if (!tokenAddress) return;
    sendMessage('unsubToken', {address: tokenAddress});
    offSocket('price', listenRealTime);
  }, [listenRealTime, offSocket, sendMessage, tokenAddress]);

  useEffect(() => {
    if (realTime) {
      subRealTime();
    } else {
      unsubRealTime();
    }
    return () => {
      unsubRealTime();
    }
  }, [realTime, subRealTime, unsubRealTime]);

  return (
    <div className='w-full h-full'>
      <div className='w-full h-[600px]' ref={containerRef} />
      <div className='flex w-full justify-between'>
        <div className='flex gap-2 flex-1'>
          <Button
            type={day === 1 ? 'default' : 'text'}
            onClick={() => {
              setDay(1);
              fetchChartData({startTime: dayjs().subtract(1, 'd').startOf('d').valueOf(), endTime: dayjs().endOf('d').valueOf()});
            }}
            className='text-white p-2 rounded-md'
          >
            1D
          </Button>
          <Button
            type={day === 5 ? 'default' : 'text'}
            onClick={() => {
              setDay(5);
              fetchChartData({startTime: dayjs().subtract(5, 'd').startOf('d').valueOf(), endTime: dayjs().endOf('d').valueOf()})
            }}
            className='text-white p-2 rounded-md'
          >
            5D
          </Button>
          <Button
            type={realTime ? 'primary' : 'text'}
            onClick={() => {
              setRealTime(!realTime);
              localStorage.setItem('realTime', !realTime);
            }}
            className='text-white p-2 rounded-md'
          >
            Real Time
          </Button>
        </div>
        <div className='flex gap-2 flex-1'>
          <Button
            type={mode === 0 ? 'default' : 'text'}
            onClick={() => {
              setMode(0);
              chartRef.current.applyOptions({rightPriceScale: {mode: 0}});
            }}
          >
            Normal
          </Button>
          <Button
            type={mode === 1 ? 'default' : 'text'}
            onClick={() => {
              setMode(1);
              chartRef.current.applyOptions({rightPriceScale: {mode: 1}});
            }}
          >
            L
          </Button>
          <Button
            type={mode === 2 ? 'default' : 'text'}
            onClick={() => {
              setMode(2);
              chartRef.current.applyOptions({rightPriceScale: {mode: 2}});
            }}
          >
            Percent
          </Button>
          <Button
            type={mode === 3 ? 'default' : 'text'}
            onClick={() => {
              setMode(3);
              chartRef.current.applyOptions({rightPriceScale: {mode: 3}});
            }}
          >
            Percent100
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TradingChart;
