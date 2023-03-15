import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const ErrorDetected = () => {

    return(
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Какая-то ошибка — <strong>Произошла ошибка. Обнови страницу или вернись назад</strong>
        </Alert>
        </Stack>
    )
}

export default ErrorDetected