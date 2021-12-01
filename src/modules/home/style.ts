import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Markets {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 50px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
    }

    &__top-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 30px;
      @include respond-to(xl) {
        padding: 12px 20px;
      }
      @include respond-to(lg) {
        padding: 15px 20px;
      }
      @include respond-to(md) {
        padding: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__size,
    &__market-switcher {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__marketSwitcher--title {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      font-size: $regular;
    }

    &__mobile--cards {
      display: none;
      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 10px;
      }
    }

    &__help--modalInner {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .Markets__help--modal {
      .TextWithModal__text {
        font-size: $medium;
      }
    }

    &__price-switcher {
      margin-top: 30px;
      @include respond-to(xl) {
        margin-top: 20px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }

  .home-total_liquidity {
    height: 443px;

    @include respond-to(md) {
      height: 342px;
    }
  }

  .image {
    @include respond-to(md) {
      display: none;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;


    .home-title {
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
    .home-explain {
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
  }
`;

export default staticStyles;
