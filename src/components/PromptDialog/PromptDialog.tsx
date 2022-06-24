import React from 'react'
import { Box, Typography, Button, Dialog } from '@material-ui/core'
import { useStyles } from '../../sections/UserCreate/Styles'

const PromptDialog = (props: any) => {
  const {
    cancelOpen,
    confirmCallback,
    handleCancel,
    handleProceed,
    label1,
    label2,
  } = props
  const classes = useStyles()

  return (
    <div>
      <Dialog open={cancelOpen} onClose={handleCancel}>
        <Box
          sx={{
            //width: dialogwidth,
            //border: '3px solid green',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            p: 1,
          }}
        >
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
              }}
            >
              <Typography variant="subtitle2">{label1}</Typography>
            </Box>
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <button
                type="button"
                style={{
                  border: 0,
                  padding: 0,
                  height: 22,
                  width: 22,
                }}
                className={classes.closeViewLog}
                onClick={handleCancel}
              >
                <b>X</b>
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              p: 2,
            }}
          >
            <Typography variant="body2" color="primary">
              {label2}
            </Typography>
          </Box>
          <Box
            sx={{
              justifyContent: 'space-between',
              display: 'flex',

              // textAlign: "center"
              p: 2,
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleCancel(false)
                confirmCallback(true)
              }}
            >
              OK
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleCancel(false)
                confirmCallback(false)
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}

export default PromptDialog
