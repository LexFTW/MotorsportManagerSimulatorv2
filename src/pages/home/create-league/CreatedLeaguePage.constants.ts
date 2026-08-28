export const inputSx = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            fontFamily: "var(--font-primary)",
            borderColor: "rgba(255, 255, 255, 0.7)",
        },

        "&:hover fieldset": {
            fontFamily: "var(--font-primary)",
            borderColor: "#fff",
        },

        "&.Mui-focused fieldset": {
            fontFamily: "var(--font-primary)",
            borderColor: "#fff",
        },
    },

    "& .MuiInputLabel-root": {
        fontFamily: "var(--font-primary)",
        color: "#fff",
    },

    "& .MuiInputLabel-root.Mui-focused": {
        fontFamily: "var(--font-primary)",
        color: "#fff",
    },

    "& .MuiOutlinedInput-input": {
        fontFamily: "var(--font-primary)",
        color: "#fff",
    },

    "& textarea": {
        fontFamily: "var(--font-primary)",
        color: "#fff",
    },

    "& input::placeholder, & textarea::placeholder": {
        fontFamily: "var(--font-primary)",
        color: "rgba(255, 255, 255, 0.5)",
        opacity: 1,
    },
};

export const sectionTitleSx = {
    margin: 0,
    fontWeight: 700,
    fontSize: "1rem",
};

export const sectionDescriptionSx = {
    display: "block",
    marginTop: "0.25rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid var(--color-surface)",
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    color: "var(--color-text-secondary)",
};

export const visibilityOptionSx = {
    margin: 0,
    padding: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "4px",
    alignItems: "flex-start",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.5)",
    },

    "&:has(.Mui-checked)": {
        borderColor: "var(--color-primary)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
    },

    "& .MuiRadio-root": {
        paddingTop: 0,
        color: "rgba(255, 255, 255, 0.7)",

        "&:hover": {
            backgroundColor: "transparent",
        },

        "&.Mui-checked": {
            color: "var(--color-primary)",
        },
    },

    "& .MuiFormControlLabel-label": {
        width: "100%",
    },
};