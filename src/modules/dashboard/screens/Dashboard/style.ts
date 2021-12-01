import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Dashboard {
    display: flex;
    flex-direction: column;
    flex: 1;

    .Dashboard__top {
      max-width: 1270px;
      margin: 20px auto;
      width: 100%;
      padding: 16px 24px;
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

      strong .Value {
        align-items: flex-start;
      }
    }

    &__switcher-inner {
      margin: 30px 0;
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .Dashboard__switcher {
      @include respond-to(sm) {
        margin: 0 auto;
      }
    }

    &__top--line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1270px;
      margin: 20px auto;
      width: 100%;

      @include respond-to(lg) {
        margin: 10px 40px;
        width: auto;
      }
      @include respond-to(md) {
        margin: 10px 20px;
        width: auto;
      }
      @include respond-to(sm) {
        display: none;
      }

      .Dashboard__topLine--button {
        width: unset;
        min-width: 140px;
        min-height: 36px;
        font-size: $medium;
        @include respond-to(xl) {
          min-width: 100px;
          min-height: 26px;
          font-size: $extraSmall;
        }
      }
    }

    &__mobileMigrate--inner {
      display: none;
      @include respond-to(sm) {
        display: block;
        .Link {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          padding: 15px;
          font-size: $regular;
        }
      }
    }
    &__mobileMigrateWithoutContent {
      height: 30px;
    }

    .Row.Row__column {
      .Row__title-inner {
        text-align: left;
      }
      .Row__content,
      .Value {
        align-items: flex-start;
        justify-content: flex-start;
      }
      .Row__content {
        text-align: left;
      }
    }
    .HealthFactor__column {
      text-align: left;
      .HealthFactor__percent {
        justify-content: flex-start;
      }
      .HealthFactor__no-value {
        text-align: left;
        justify-content: flex-start;
      }
    }

    .CollateralCompositionBar {
      @include respond-to(sm) {
        flex-direction: column;
        &.Row {
          align-items: flex-start;
        }
        .Row__title {
          padding-right: 0;
          margin-bottom: 5px;
        }
        .Row__content {
          width: 100%;
        }
      }
    }

    .Row.Dashboard__mobileRow-center {
      align-items: center;
    }
    &__mobileRow-content {
      display: flex;
      align-items: center;
    }
    .Dashboard__mobileButton {
      width: 80px;
      min-height: 32px;
      font-size: $small;
      margin-left: 10px;
    }
  }

  @media (max-height: 750px) {
    .Dashboard {
      display: block;
    }
  }
`;

export default staticStyles;
