import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { IBM_Plex_Mono } from 'next/font/google'

import type { AppProps } from 'next/app'

const font = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export const ColorModeContext = React.createContext({
  setIsDark: (_: boolean) => {},
  toggleColorMode: () => {},
})

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light')
  const colorMode = React.useMemo(
    () => ({
      setIsDark: (dark: boolean): void => setMode(dark ? 'dark' : 'light'),
      toggleColorMode: (): void => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(() => {
    const t = createTheme({
      palette: {
        mode,
        // primary: {
        // main: mode === 'dark' ? '#BB6588' : '#87c9f3',
        // },
      },
      typography: {
        fontFamily: font.style.fontFamily,
      },
      shape: {
        borderRadius: 0,
      },
    })

    return createTheme(t, {
      components: {
        MuiPaper: {
          defaultProps: {
            elevation: 0,
            variant: 'outlined',
          },
        },
      },
    })
  }, [mode])

  return (
    <>
      <Head>
        {/* <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" /> */}
        <title>Diphda</title>
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
