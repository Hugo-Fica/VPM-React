import { Grid, Typography } from '@mui/material'
import { ScenarioModal } from './components'

export const Scenario = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: '#0B5394',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 100,
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography variant='h5' sx={{ color: 'white' }}>
          Please select a project
        </Typography>
        <ScenarioModal />
        <span>lista</span>
        <span>seleccionar</span>
      </Grid>
    </Grid>
  )
}
