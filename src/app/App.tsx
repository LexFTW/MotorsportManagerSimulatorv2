import type { PropsWithChildren } from "react"
import { HomeDashboardPage, LoginPage, CreateLeaguePage, StartedLeaguePage, NotFoundPage } from "@pages"
import { useLocation } from "react-router-dom"
import { Provider, useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { store, type RootState } from "./store"
import { SessionProvider } from "./providers/SessionProvider"
import { MotorsportLayout } from "@/shared/layouts/motorsport/MotorsportLayout"

const PublicRoute = ({ children }: PropsWithChildren) => {
    const { session, isLoading } = useSelector((state: RootState) => state.session)

    if (isLoading) return null
    if (session) return <Navigate to="/" replace />

    return <>{children}</>
}

const PrivateRoute = ({ children }: PropsWithChildren) => {
    const { session, isLoading } = useSelector(
        (state: RootState) => state.session
    )

    const location = useLocation()

    if (isLoading) return null

    if (!session) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        )
    }

    return <>{children}</>
}

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/create-league" element={<PrivateRoute><MotorsportLayout><CreateLeaguePage /></MotorsportLayout></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><MotorsportLayout><HomeDashboardPage /></MotorsportLayout></PrivateRoute>} />
            <Route path="/leagues/:leagueId/started" element={<PrivateRoute><MotorsportLayout><StartedLeaguePage /></MotorsportLayout></PrivateRoute>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <SessionProvider>
                    <AppRoutes />
                </SessionProvider>
            </BrowserRouter>
        </Provider>
    )
}