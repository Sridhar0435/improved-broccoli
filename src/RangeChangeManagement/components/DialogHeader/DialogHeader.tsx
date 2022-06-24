import React from 'react'
import { 
    Box,
    Typography
 } from '@material-ui/core'
import { useStyles } from './styles'

function DialogHeader(props:any) {
    const {title,onClose}=props
    const classes=useStyles()
    return (
        <Box
            sx={{
                display: 'flex',
                height: 30,
                flexDirection: 'row',
            }}
            className={classes.viewLogTitle}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="subtitle1">{title}</Typography>
            </Box>
            <Box
                sx={{
                    paddingRight: 2,
                }}
            >
                <button
                    style={{
                        border: 0,
                        padding: 0,
                        height: 22,
                        width: 22,
                    }}
                    className={classes.closeViewLog}
                    onClick={onClose}
                >
                    <b>X</b>
                </button>
            </Box>
        </Box>
    )
}

export default DialogHeader