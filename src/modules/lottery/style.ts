import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Lottery {
    .total-lottery-amount {
      height: 342px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      @include respond-to(md) {
        height: 260px;
      }

      .lottery-title {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 31px;
        line-height: 36px;

        @include respond-to(sm) {
          font-size: 24px;
        }
      }

      .total-amount {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 73px;
        line-height: 86px;
        color: #005998;
        margin: 16px 0;

        @include respond-to(sm) {
          font-size: 38px;
          line-height: 50px
        }
      }

      .lottery-explain {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        opacity: 0.4;
        text-align: center;

        @include respond-to(sm) {
          font-size: 30px;
        }
      }

      .top-right {
        right: 10%;
      }

      .top-left {
        left: 10%;
      }

      .image {
        position: absolute;
        width: 240px;
        @include respond-to(lg) {
          display: none;
        }
      }
    }

    .lottery-ticket-list {
      display: flex;
      align-items: center;
      width: 800px;
      margin: 20px auto;

      @include respond-to(sm) {
        width: auto;
        margin: 20px 10px;
      }

      .red-ticket {
        width: 30%;
        height: 70%;
        opacity: 0.5;
      }

      .blue-ticket {
        width: 40%;
      }

      .green-ticket {
        width: 30%;
        height: 70%;
        opacity: 0.5;
      }
    }

    .lottery-lifetime {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      @include respond-to(md) {
        font-size: 16px;
      }

      &-content {
        background: white;
        font-size: 28px;
        font-weight: bold;
        padding: 4px 8px;
        margin: 4px;
        border-radius: 8px;
        box-shadow: 0px 3px 4px 1px gray;
        @include respond-to(md) {
          font-size: 16px;
        }

        span {
          color: gray;
          font-size: 24px;
          @include respond-to(md) {
            font-size: 16px;
          }
        }
      }
    }

    .lottery_main {
      max-width: 1270px;
      margin: 20px auto;
      width: 100%;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0px 0px 4px 0px grey;
      @include respond-to(lg) {
        margin: 40px;
        width: auto;
      }
      @include respond-to(md) {
        margin: 20px;
        width: auto;
      }

      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #e1f3ff;
        padding: 8px 24px;
        border-radius: 8px;
        @include respond-to(sm) {
          flex-direction: column;
        }

        &-right{
          button {
            background: #c1a978;
            width: 240px;
            padding: 8px;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            margin: 0 8px;
          }

          @include respond-to(md) {
            width: auto;
          }
        }

        &-middle {
          background: #c6c6c6;
          width: 1px;
          height: 100%;
        }

        &-left {
          .total-value {
            color: #c1a978;
            margin: 0 8px;
          }
        }
      }

      &-content {
        display: flex;
        align-items: center;
        background: #e1f3ff;
        padding: 8px 24px;
        border-radius: 8px;
        position: relative;
        min-height: 100px;
        margin-top: 20px;

        .left-month-btn {
          position: absolute;
          left: 20px;
        }

        .right-month-btn {
          position: absolute;
          right: 20px;
        }

        .title {
          position: absolute;
          top: 22px;
          left: 50%;
          transform: translate(-50%, 0px);

          @include respond-to(xs) {
            width: 70%;
          }
        }

        .btn {
          background: white;
          padding: 8px 24px;
          border-radius: 8px;
          top: 20px;
          box-shadow: 0 0 2px 0px grey;

          @include respond-to(sm) {
            top: 55px;
          }
        }

        .card-list {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          width: 100%;
          margin-top: 70px;
          @include respond-to(sm) {
            margin-top: 120px;
          }

          .card {
            width: 25%;
            padding: 8px;
            position: relative;
            @include respond-to(md) {
              width: 50%;
            }
            @include respond-to(sm) {
              width: 100%;
            }

            .card-info {
              position: absolute;
              color: white;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: absolute;
              left: 50%;
              bottom: 55%;
              transform: translate(-50%, 0px);
            }

            img {
              width: 100%;
              z-index: -1;
            }
          }
        }
      }
    }

    .bold-font{
      font-weight: bold;
    }

    .large-font {
      font-size: 24px;
    }

    .middle-font {
      font-size: 18px;
    }
    .normal-font {
      font-size: 14px;
    }
  }
`;

export default staticStyles;
