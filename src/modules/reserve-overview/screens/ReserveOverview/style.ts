import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveOverview {
    margin-top: 40px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
    }

    .ReserveOverview__top {
      max-width: 1270px;
      margin: 20px auto;
      width: 100%;
      padding: 16px 24px;
      background: white;
      border-radius: 16px;
      box-shadow: 0px 0px 8px 1px grey;
      @include respond-to(lg) {
        margin: 40px;
        width: auto;
      }
      @include respond-to(md) {
        margin: 20px;
        width: auto;
      }
      @include respond-to(sm) {
        margin: 10px;
        width: auto;
      }

      strong .Value {
        align-items: flex-start;
      }
    }

    &__content {
      padding-bottom: 10px;
      max-width: 1270px;
      margin: auto;
      width: 100%;
      background: #ffffff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0px 0px 8px 1px grey;

      @include respond-to(lg) {
        margin: 0 40px;
        width: auto;
      }
      @include respond-to(md) {
        margin: 0 20px;
        width: auto;
      }
      @include respond-to(sm) {
        margin: 0 10px;
        width: auto;
      }

      &-title {
        margin: 16px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .back-btn {
          background: #e0f2ff;
          padding: 8px 16px;
          border-radius: 8px;
          background: #e0f2ff;
          &:hover {
            cursor: pointer;
          }
          @include respond-to(md) {
            display: none;
          }
        }
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }

    &__graphs-wrapper {
      width: 100%;
      padding: 16px;
      background: #e0f2ff;
      border-radius: 8px;
      @include respond-to(md) {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        transform: translateZ(0);
        padding: 3px 0 0 3px;
      }
      @include respond-to(sm) {
        overflow: inherit;
        padding: 0;
      }
    }

    &__graphs-inner {
      display: flex;
      justify-content: space-between;
      @include respond-to(md) {
        min-width: 1100px;
        width: 100%;
      }
      @include respond-to(sm) {
        flex-wrap: wrap;
        min-width: auto;
      }
    }

    &__information-title {
      margin-bottom: 10px;
      font-size: $large;
      font-weight: 400;
      width: 100%;
      @include respond-to(xl) {
        font-size: $small;
      }
    }

    &__content-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 24px;
      @include respond-to(md) {
        display: block;
      }
    }

    &__user-information {
      width: 525px;
      display: flex;
      flex-direction: column;
      @include respond-to(xl) {
        width: 440px;
      }
      @include respond-to(lg) {
        width: 340px;
      }
      @include respond-to(md) {
        width: 100%;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__user-informationInner {
      flex: 1;
      display: block;
      flex-direction: column;
      box-shadow: none !important;
      background: transparent !important;
    }
    .ReserveOverview__noUser.ReserveOverview__noUser {
      box-shadow: $boxShadow !important;
      @include respond-to(sm) {
        box-shadow: none !important;
        background: transparent !important;
      }
    }

    &__informationNonUser {
      width: 100%;
      flex: auto;
      margin-right: 0;
    }

    &__mobileUserInformation-wrapper {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    .ReserveOverview__noDataPanel {
      flex: 1;
      padding: 20px;
      @include respond-to(xl) {
        padding: 5px;
      }
      @include respond-to(md) {
        padding: 30px;
      }
      @include respond-to(sm) {
        display: block;
        flex: unset;
        height: unset;
        min-height: unset;
      }
    }

    &__poolLink-inner {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-size: $regular;
      margin: 5px 0 25px;
      img {
        width: 14px;
        height: 14px;
        margin-left: 10px;
      }
    }
  }
`;

export default staticStyles;
