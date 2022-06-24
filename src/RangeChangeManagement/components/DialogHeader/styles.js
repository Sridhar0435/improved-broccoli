import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    return {
        viewLogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            alignItems: "baseline",
        },
        closeViewLog: {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            fontSize: '18px',
            '&:hover': {
                color: 'yellow',
                backgroundColor: 'green',
                cursor: 'pointer',
            },
        },
    }
})