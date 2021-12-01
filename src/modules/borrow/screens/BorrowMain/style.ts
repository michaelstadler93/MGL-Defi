import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

 .Borrow__top {
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
`;

export default staticStyles;
