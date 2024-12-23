import MainContent from "@/components/main-content"
import { ColorPreferencesProvider } from "@/providers/color-preferences"
import { ThemeProvider } from "@/providers/theme-provider"
import { WebSocketProvider } from "@/providers/web-socket"

const MainLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <ThemeProvider attribute={'class'} enableSystem disableTransitionOnChange defaultTheme='system'>
          <WebSocketProvider>
            <ColorPreferencesProvider>
              <MainContent>
                  {children}
              </MainContent>
            </ColorPreferencesProvider>
          </WebSocketProvider>
        </ThemeProvider>
    </div>
  )
}

export default MainLayout