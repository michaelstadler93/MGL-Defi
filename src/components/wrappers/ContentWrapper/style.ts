import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapper {
    position: relative;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;

    &__fullHeight {
      max-width: 1270px;
      margin: auto;
      border-radius: 8px;
      box-shadow: 0px 0px 4px 0px grey;

      @include respond-to(lg) {
        margin: 0 40px;
        width: auto;
      }
      @include respond-to(md) {
        margin: 0 20px;
        width: auto;
      }

      @include respond-to(sm) {
        display: block;
      }
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex: 1;
      margin-bottom: 10px;
    }

    .page-title {
      position: absolute;
      top: 20px;
      font-size: 32px;
      font-weight: bold;
      @include respond-to(sm) {
        display: none;
      }
    }

    &__back-button {
      position: absolute;
      left: 20px;
      top: 20px;
      min-width: 90px;
      height: 32px;
      border-radius: $borderRadius;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $small;
      transition: $transition;
      @include respond-to(xl) {
        min-width: 70px;
        height: 26px;
        padding: 2px 5px;
      }
      @include respond-to(sm) {
        display: none;
      }
      span {
        width: 15px;
        height: 15px;
        margin-right: 15px;
        border-radius: 50%;
        transition: $transition;
        display: flex;
        align-items: center;
        justify-content: center;
        @include respond-to(xl) {
          margin-right: 10px;
        }
        &:after {
          content: '';
          line-height: 0;
          display: inline-block;
          transform: rotate(135deg);
          padding: 2px;
          position: relative;
          left: 1px;
          transition: $transition;
        }
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .ContentWrapper {
        @include respond-to(sm) {
          display: block;
        }
      }
    }
  }
`;

export default staticStyles;
