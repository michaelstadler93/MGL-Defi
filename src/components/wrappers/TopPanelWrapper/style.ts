import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopPanelWrapper {
    max-width: 1270px;
    margin: auto;
    width: 100%;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    position: relative;
    @include respond-to(sm) {
      display: none;
    }

    &__button {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: $regular;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(xl) {
        font-size: $small;
      }
      span {
        position: relative;
        bottom: 2px;
        &:before,
        &:after {
          content: '';
          position: absolute;
          left: -15px;
          width: 10px;
          height: 2px;
          transition: $transition;
        }
      }
    }
    &__buttonCollapse {
      span {
        &:after {
          transform: rotate(90deg);
        }
      }
    }

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
  }
`;

export default staticStyles;
