import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import logo from "@/shared/assets/logo.png"
import styles from "./MotorsportLayout.module.css"
import { AvatarDropdown } from "@/shared/components"

interface MotorsportLayoutProps {
    children: ReactNode
}

export const MotorsportLayout = ({ children }: MotorsportLayoutProps) => {
    const location = useLocation();

    return (
        <main>
            <header className={styles.header}>
                <div style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1rem" }}>
                    <img src={logo} alt="Motorsport Manager Logo" className={styles.logo} />
                    <div>
                        <AvatarDropdown />
                    </div>
                </div>
            </header>
            <section>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </section>
            <footer>

            </footer>
        </main>
    )
}