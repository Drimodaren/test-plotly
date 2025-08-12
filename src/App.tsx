import { useState } from 'react'
import Plot from 'react-plotly.js'
import './App.css'

interface Point {
  x: number
  y: number
  index: number
}

function App() {
  const [pointCount, setPointCount] = useState<string>('100')
  const [points, setPoints] = useState<Point[]>([])
  const generateNormalRandom = (): number => {
    let u = 0, v = 0
    while(u === 0) u = Math.random()
    while(v === 0) v = Math.random()
    const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return Math.max(-1, Math.min(1, normal / 3))
  }

  const generatePoints = () => {
    const count = parseInt(pointCount)
    if (isNaN(count) || count <= 0) {
      alert('Пожалуйста, введите корректное положительное число')
      return
    }

    const newPoints: Point[] = []
    for (let i = 0; i < count; i++) {
      newPoints.push({
        x: generateNormalRandom(),
        y: generateNormalRandom(),
        index: i + 1
      })
    }
    setPoints(newPoints)
  }

  return (
    <div className="app-container">
      <h1>Генератор случайных точек</h1>

      <div className="controls">
        <input
          type="number"
          value={pointCount}
          onChange={(e) => setPointCount(e.target.value)}
          placeholder="Количество точек"
          min="1"
          max="10000"
        />
        <button onClick={generatePoints}>
          Сгенерировать точки
        </button>
      </div>

      {points.length > 0 && (
        <div className="plot-container">
          <Plot
            data={[
              {
                x: points.map(p => p.x),
                y: points.map(p => p.y),
                mode: 'markers',
                type: 'scatter',
                marker: {
                  color: '#646cff',
                  size: 6,
                  opacity: 0.7
                },
                text: points.map(p => `Точка ${p.index}`),
                hovertemplate: '%{text}<br>x: %{x:.3f}<br>y: %{y:.3f}<extra></extra>',
                name: 'Случайные точки'
              }
            ]}
            layout={{
              title: {
                text: `${points.length} случайных точек`
              },
              xaxis: {
                title: {
                  text: 'X координата'
                },
                range: [-1.2, 1.2],
                zeroline: true,
                zerolinecolor: '#888',
                gridcolor: '#eee'
              },
              yaxis: {
                title: {
                  text: 'Y координата'
                },
                range: [-1.2, 1.2],
                zeroline: true,
                zerolinecolor: '#888',
                gridcolor: '#eee'
              },
              plot_bgcolor: '#fafafa',
              paper_bgcolor: '#ffffff',
              width: 800,
              height: 600,
              showlegend: false
            }}
            config={{
              displayModeBar: true,
              responsive: true
            }}
          />
        </div>
      )}
    </div>
  )
}

export default App
