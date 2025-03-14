'use client';
import TopBriefInfo from '@/components/TopBriefInfo';
import TradingChart from '@/components/CoinDetail/TradingChart';
import TransactionCard from '@/components/CoinDetail/TransactionCard';
import Link from 'next/link';
import CoinDetailSocialTab from '@/components/CoinDetail/Social';
import { use, useContext, useEffect, useState } from 'react';
import { getToken, getTokenCommentCount } from '@/request/token';
import { Spin } from 'antd';
import { GlobalContext } from '@/context/global';
import Image from 'next/image';
import { CopyOutlined } from '@ant-design/icons';
import { copyText } from '@/util';
import { App } from 'antd';

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
        <div className='w-fit md:mx-auto flex flex-col gap-4'>
          <TransactionCard
            record={tokenInfo}
          />
          <RightTokenBrief
            record={tokenInfo}
          />
          <CopyableAddress address={tokenInfo?.address} />
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

const RightTokenBrief = ({record}) => {
  const {logoPrefix} = useContext(GlobalContext);

  if (!record) {
    return null;
  }

  const {name, ticker} = record;

  return (
    <div className='flex gap-2'>
      <div className='relative min-w-32 self-start'>
        <Image
          src={`${logoPrefix}/${record?.ticker}`}
          alt='coin image'
          className='h-auto w-32'
          width={128}
          height={128}
        />
      </div>
      <div className='flex-1'>
        <div className='text-sm font-bold'>
          <span>
            {name}({ticker})
          </span>
        </div>
      </div>
    </div>
  );
};

const CopyableAddress = ({address}) => {
  const {message} = App.useApp();

  const clickCopy = async () => {
    try {
      await copyText(address);
      message.success('copied successfully');
    } catch {
      message.error('copy failed');
    }
  };

  if (!address) {
    return null;
  }

  return (
    <div>
      <button
        className='duration-400 relative flex h-6 w-full cursor-pointer items-center rounded-md bg-gray-700 px-2 py-1 text-gray-400 transition-all hover:bg-gray-600'
        onClick={clickCopy}
      >
        <div className='flex flex-grow justify-center items-center gap-1'>
          <span className='font-semibold text-gray-400'>
            contract address:
          </span>
          <span
            className='max-w-[120px] truncate text-xs font-light'
          >
            {address}
          </span>
        </div>
        <CopyOutlined
          className='text-xs'
        />
      </button>
    </div>
  );
};

export default CoinDetailPage;
