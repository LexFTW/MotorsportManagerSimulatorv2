import { useState } from "react"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { selectUserAvatarUrl } from "@/app/store/selectors/SessionSelector"
import { signOut } from "@/shared/libs/auth-google"

import styles from "./AvatarDropdown.module.css"

export const AvatarDropdown = () => {
    const avatarUrl = useSelector(
        (state: RootState) => selectUserAvatarUrl(state)
    )

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [imageFailed, setImageFailed] = useState(false)

    const open = Boolean(anchorEl)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = async () => {
        handleClose()
        await signOut()
    }

    return (
        <>
            <IconButton
                className={styles.avatarButton}
                onClick={handleOpen}
                aria-label="User menu"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar
                    alt="User Avatar"
                    src={imageFailed ? undefined : avatarUrl ?? undefined}
                    slotProps={{
                        img: {
                            referrerPolicy: "no-referrer",
                            onError: () => setImageFailed(true),
                        },
                    }}
                />
            </IconButton>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}