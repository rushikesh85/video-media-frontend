import * as React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface BasicAlertsProps {
  open: boolean;
  onClose: () => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const BasicAlerts: React.FC<BasicAlertsProps> = ({ open, onClose, severity, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )

export default BasicAlerts
