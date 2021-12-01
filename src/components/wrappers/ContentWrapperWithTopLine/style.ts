import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapperWithTopLine {
    box-shadow: $boxShadow;

    &__withDropdown {
      .ContentWrapperWithTopLine__top-line {
        cursor: pointer;
      }
      .ContentWrapperWithTopLine__content {
        display: none;
      }
      .ContentWrapperWithTopLine__contentActive {
        display: block;
      }
    }

    &__top-line {
      padding: 20px;
      font-size: 32px;
      font-weight: bold;
      justify-content: center;
      display: flex;
      font-weight: bold;
      align-items: center;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      min-height: 49px;
      @include respond-to(xl) {
        padding: 20px 15px;
        font-size: 32px;
        min-height: 34px;
      }
      @include respond-to(lg) {
        padding: 20px;
      }
      @include respond-to(md) {
        padding: 20px 15px;
      }
      @include respond-to(sm) {
        padding: 20px;
        min-height: 39px;
      }
    }

    &__arrow-inner {
      display: flex;
      align-items: center;
      font-size: $medium;
      span {
        margin-right: 5px;
      }
    }

    &__content {
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`;

export default staticStyles;
