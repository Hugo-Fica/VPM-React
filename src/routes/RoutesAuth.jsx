import { Route, Routes, useLocation } from 'react-router-dom'
import { Sidebar, NavBar } from '../pages/components'
import { AreaGraphs, Home, Scenario } from '../pages'
import { Container, Grid } from '@mui/material'
import { GlobalGraph } from '../pages/components/GlobalGraph'
import { ActivityGraph } from '../pages/components/ActivityGraph'
import { ExportReport } from '../pages/components/ExportReport'
import { useEffect } from 'react'
import { useAuthSotre } from '../store/auth-store'
import { useProjectStore } from '../store/project'

export const RoutesAuth = () => {
  const path = useLocation().pathname
  const user_id = useAuthSotre((state) => state.uid)
  const getProjects = useProjectStore((state) => state.getProjects)
  useEffect(() => {
    getProjects(user_id)
  }, [path === '/VentilationProjectManager/projects'])
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
      }}
    >
      <Sidebar />
      <NavBar />
      <Grid item sx={{ mt: 5, width: '100%' }}>
        <Routes>
          <Route path='project/:id' element={<Home />} />
          <Route path='area-graph' element={<AreaGraphs />} />
          <Route path='global-graph' element={<GlobalGraph />} />
          <Route path='activity-graph' element={<ActivityGraph />} />
          <Route path='export-report' element={<ExportReport />} />
          <Route path='projects' element={<Scenario />} />
        </Routes>
      </Grid>
    </Container>
  )
}
