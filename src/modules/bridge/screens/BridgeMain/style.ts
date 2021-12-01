import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .bridge {
    &-content {
      width: 50%;
      padding: 20px;
      @include respond-to(lg) {
        width: 100%;
      }
      @include respond-to(sm) {
        width: 100%;
      }
    }

    &-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 30px;
      border-radius: 8px;
      margin: 20px 0;
      background: #e0f2ff;
      @include respond-to(sm) {
        flex-direction: column;
      }
      .content {
        width: 40%;
        @include respond-to(sm) {
          width: 100%;
        }

        .AssetSelect {
          width: 100%;
        }
      }
      &-symbol {
        margin-top: 26px;
        img {
          @include respond-to(sm) {
            transform: rotate(90deg);
          }
        }
      }
    }
    &-amount {
      background: #e0f2ff;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      .AmountField {
        width: 100%
      }
    }
    &-run {
      button {
        width: 100%;
      }
    }
  }
`;

export default staticStyles;
