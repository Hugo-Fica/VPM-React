import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Grid, Typography } from '@mui/material'
import { useVectorStore } from '../../store/vector-store'
import { useSettingStore } from '../../store/setting-store'
import { crearArrayConNumeros } from '../../helpers/datas/data'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export const GlobalGraph = () => {
  const vectors = useVectorStore((state) => state.vectors)
  const period = useSettingStore((state) => state.period)
  const arrayPeriod = crearArrayConNumeros(period)

  const generarColorAleatorio = () => {
    const hexColor = Math.floor(Math.random() * 16777215).toString(16)
    return `#${'0'.repeat(6 - hexColor.length)}${hexColor}80`
  }
  const data = {
    labels: arrayPeriod?.map((item) => item),
    datasets:
      vectors.length > 0
        ? vectors.map((item) => ({
            fill: true,
            label: item.vector,
            data: item.vectors
              .sort((a, b) => a.period - b.period)
              .map((vector) => vector.value),
            backgroundColor: generarColorAleatorio(),
          }))
        : [],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: { title: { display: true, text: 'Period' } },
      y: { stacked: true, title: { display: true, text: 'Value' } },
    },
  }
  console.log(vectors)
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vh',
        height: '100%',
        mt: '100px',
      }}
    >
      <Grid item sx={{ mt: 4 }}>
        <Typography variant='h5'>Global Graphs</Typography>
      </Grid>
      {Array.isArray(vectors) && vectors.length !== 0 ? (
        <Grid item sx={{ mt: '140px', flexGrow: 1 }}>
          <Line
            options={options}
            data={data}
            width={'1300px'}
            height={'500px'}
          />
        </Grid>
      ) : (
        <Grid item sx={{ mt: 16, width: '100%' }}>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>
            No data
          </Typography>
        </Grid>
      )}{' '}
    </Grid>
  )
}
