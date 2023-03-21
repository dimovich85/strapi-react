import { makeStyles } from "tss-react/mui";
export const useStyles2 = makeStyles()((theme, state) => {
  const { palette } = theme;
  return {
    block: {
      width: 30,
      height: 100,
      backgroundColor: palette.secondary.light,
    },
  };
});
