import { forwardRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import type { TextFieldProps } from '@mui/material/TextField'

type PasswordInputProps = Omit<TextFieldProps, 'type'>

const PasswordInput = forwardRef<HTMLDivElement, PasswordInputProps>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <TextField
            {...props}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
                ...props.slotProps,
                input: {
                    ...props.slotProps?.input,
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge='end'
                                aria-label='toggle password visibility'
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
