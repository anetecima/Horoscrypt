import { MEDIA_BREAKPOINTS } from './media'
import { createTheme } from '@material-ui/core/styles'

const style = {
  // breakpoints: {
  //   values: MEDIA_BREAKPOINTS
  // }
  //
  // typography: {
  //     fontFamily: [
  //         '-apple-system',
  //         'BlinkMacSystemFont',
  //         '"Segoe UI"',
  //         'Roboto',
  //         'Open Sans',
  //         '"Helvetica Neue"',
  //         'Arial',
  //         'sans-serif',
  //         '"Apple Color Emoji"',
  //         '"Segoe UI Emoji"',
  //         '"Segoe UI Symbol"'
  //     ].join(',')
  // },

  overrides: {
    MuiInputBase: {
      root: {
        fontSize: 14,
        color: '#000'
      },
      input: {
        backgroundColor: 'transparent',
        '&::placeholder': {
          opacity: 1,
          color: '#fff',
          fontSize: 14
        },
        underline: {
          color: 'red'
        }
      }
    },

    MuiFilledInput: {
      root: {
        border: '1px solid #fff',
        // overflow: 'hidden',
        borderRadius: 4,
        '&.Mui-focused': {
          border: '1px solid #fff'
        },
        '&.Mui-error': {
          border: '1px solid #ff0000'
        }
      },
      input: {
        // backgroundColor: 'white',
        padding: '25px 12px 8px !important'
      }
    },

    MuiInputLabel: {
      root: {
        opacity: 1,
        color: '#fff',
        fontSize: 14,
        '&.Mui-focused, &.Mui-error': {
          color: '#fff'
        }
      }
    },

    MuiTextField: {
      root: {
        background: '#fff'
      }
    }
  }
}

export const muiTheme = createTheme(style)
