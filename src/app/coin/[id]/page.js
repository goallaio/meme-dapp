'use client';
import TopBriefInfo from '@/components/TopBriefInfo';
import TradingChart from '@/components/CoinDetail/TradingChart';
import TransactionCard from '@/components/CoinDetail/TransactionCard';
import Link from 'next/link';
import CoinDetailSocialTab from '@/components/CoinDetail/Social';
import { use, useEffect, useState } from 'react';
import { getToken, getTokenCommentCount } from '@/request/token';
import { Spin } from 'antd';

const CoinDetailPage = ({ params }) => {
  const { id } = use(params);

  const [loading, setLoading] = useState(false);

  const [tokenInfo, setTokenInfo] = useState(null);

  const [commentCount, setCommentCount] = useState(0);

  const fetchTokenDetail = async (tokenId) => {
    try {
      setLoading(true);
      const res = await getToken(tokenId);
      setTokenInfo(res);
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  };

  const getCommentCounts = async (tokenId) => {
    try {
      const res = await getTokenCommentCount(tokenId);
      setCommentCount(res?.total || 0);
    } catch {
      // do nothing
    }
  };

  useEffect(() => {
    if (id) {
      fetchTokenDetail(id);
      getCommentCounts(id);
    }
  }, [id]);

  const generateMainContent = () => {
    if (loading) {
      return (
        <div className='flex-1 flex items-center justify-center'>
          <Spin
            spinning
          />
        </div>
      );
    }

    return (
      <div className='flex gap-4 flex-col md:flex-row md:px-4'>
        <div className='md:w-2/3 w-full space-y-2'>
          <TopBriefInfo
            record={tokenInfo}
            tokenCount={commentCount}
          />
          <div className=''>
            <TradingChart tokenAddress={tokenInfo?.address} />
          </div>
          <CoinDetailSocialTab
            record={tokenInfo}
          />
        </div>
        <div className='w-fit mx-auto'>
          <TransactionCard
            record={tokenInfo}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className='flex-1 flex flex-col p-4 gap-2'
    >
      <div>
        <Link
          href='/'
          className='text-white hover:font-bold'
        >
          [ go back ]
        </Link>
      </div>
      {generateMainContent()}
    </div>
  )
}

export default CoinDetailPage;
