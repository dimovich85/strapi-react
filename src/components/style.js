import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles({ name: "My SignIn Component" })(
  (theme, state) => {
    const { palette, breakpoints, spacing } = theme;
    return {
      btn: {
        color: palette.secondary.main,
        backgroundColor: palette.grey[200],
        div: {
          display: "block",
          width: 50,
          height: 50,
          backgroundColor: palette.error.main,
        },
        "&:hover": {
          color: palette.success.main,
          backgroundColor: palette.grey[500],
        },
        "& + &": {
          marginLeft: 20,
        },
        "&:before": {
          display: "block",
          content: `'${state.passText}'`,
        },
      },
      btnOffset: {
        marginTop: 50,
      },
      block: {
        width: 300,
        height: 300,
        backgroundColor: palette.secondary.dark,
        marginTop: 30,
        color: palette.grey[50],
        padding: spacing(4),
        [breakpoints.down("md")]: {
          padding: spacing(2),
          backgroundColor: palette.primary.light,
        },
      },
    };
  }
);
