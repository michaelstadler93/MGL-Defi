import React, { useState } from 'react';
import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import NumberToUsd from './components/NumberToUsd';
import { useIntl } from 'react-intl';

import messages from './message';
import {
  CardBackImage,
  LeftTopImage,
  RightTopImage,
  RedTicketImage,
  BlueTicketImage,
  GreenTicketImage
} from './images'
import staticStyles from './style';

export default function Lottery() {
  const intl = useIntl();
  const cardList = [{
    mgl: "200.000",
    usd: "20.000",
  },{
    mgl: "200.000",
    usd: "20.000",
  },{
    mgl: "200.000",
    usd: "20.000",
  },{
    mgl: "200.000",
    usd: "20.000",
  }];

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      className="Lottery"
      withMobileGrayBg={false}
    >
      <div className="total-lottery-amount">
        <img className="top-left image" src={LeftTopImage} />
        <img className="top-right image" src={RightTopImage} />
        <div className="lottery-title">MGL Lottery</div>
        <div className="total-amount">
          <NumberToUsd number="193595" />
        </div>
        <div className="lottery-explain">This week's prize</div>
      </div>
      <div className="lottery-ticket-list">
        <img className="red-ticket" src={RedTicketImage}></img>
        <img className="blue-ticket" src={BlueTicketImage}></img>
        <img className="green-ticket" src={GreenTicketImage}></img>
      </div>
      <div className="lottery-lifetime">
        Get your tickets now:&nbsp;
        <div className="lottery-lifetime-content">6<span>h</span></div>
        <div className="lottery-lifetime-content">24<span>m</span></div>&nbsp;
        until the draw
      </div>
      <div className="lottery_main">
        <div className="lottery_main-top">
          <div className="lottery_main-top-left">
            <span className="bold-font middle-font">Next Draw Prize Pot:</span>
            <span className="total-value middle-font bold-font"><NumberToUsd number="193595" /></span>
            <span>200,000&nbsp;MGL</span>
          </div>
          <div className="lottery_main-top-middle"></div>
          <div className="lottery_main-top-right">
            <span className="bold-font middle-font">Your tickets:</span>
            <button className="buy-tickets-btn">Buy Tickets</button>
          </div>
        </div>
        <div className="lottery_main-content">
          <button className="left-month-btn btn">Previous Month</button>
          <div className="title middle-font">Previous Month draw prizes</div>
          <button className="right-month-btn btn">Next Month</button>
          <div className="card-list">
            {
              cardList.map((card, index) =>
                <div className="card">
                  <div className="card-info">
                    <div className="mgl-info large-font bold-font">{card.mgl}&nbsp;MGL</div>
                    <div className="usd-info middle-font">${card.mgl}</div>
                  </div>
                  <img className="card-back" src={CardBackImage} />
                </div>
              )
            }
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .card{
          // background: url(${CardBackImage})
        }
      `}
      </style>
    </ScreenWrapper>
  )
}
