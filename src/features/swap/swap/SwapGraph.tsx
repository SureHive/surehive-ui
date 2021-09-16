import styles from './swap.module.css'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import GraphChart from './GraphChart'

export default function SwapGraph({ currentTheme }) {
  return (
    <div className={styles.swapGraphBox}>
      <div className={styles.swapGraph}>
        <div className={styles.swapGraphInner}>
          <ParentSize>
            {({ width, height }) => <GraphChart width={width} height={height} currentTheme={currentTheme} />}
          </ParentSize>
        </div>
        <div className={styles.swapGraphInnerTime}>
          <div>0:00</div>
          <div>03:00</div>
          <div>06:00</div>
          <div>09:00</div>
          <div>12:00</div>
          <div>15:00</div>
          <div>18:00</div>
          <div>21:00</div>
          <div>24:00</div>
        </div>
      </div>
      <div className={styles.swapGraphBottomLabel}>
        <p>Time</p>
        <div className="p-2 bg-dark-500 text-white rounded-full">24 Hours</div>
        <p>1 Week</p>
        <p>1 Month</p>
      </div>
    </div>
  )
}
