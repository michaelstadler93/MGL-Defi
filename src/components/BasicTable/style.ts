import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 1270px;
    width: 100%;
    margin: auto;
    position: relative;
    z-index: 1;
    @include respond-to(sm) {
      flex: none;
      display: block;
      margin: 0;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      flex: auto;
      height: 1px;
      min-height: 376px;
      padding-top: 100px;
      margin-top: -100px;
      @include respond-to(sm) {
        height: auto;
      }
    }

    &__content-inner {
      display: block;
      padding: 7px 2px 12px;
      @include respond-to(sm) {
        padding: 5px 5px 12px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 5px;
      padding: 0 45px;
      @include respond-to(xl) {
        padding: 0 35px;
      }
      @include respond-to(lg) {
        padding: 0 25px;
      }
      @include respond-to(sm) {
        padding: 0 15px;
        margin-bottom: 0;
      }
    }

    .browser-error {
      text-align: center;
      color: red;
      font-size: 24px;
      margin: 24px 0;
      font-style: italic;
    }

    @include respond-to(lg) {
      padding: 0 40px;
    }
    @include respond-to(md) {
      padding: 0 20px;
    }
    @include respond-to(sm) {
      padding: 0 10px;
    }
  }
`;

export default staticStyles;
