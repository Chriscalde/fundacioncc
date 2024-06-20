export default function ProgressBar({sold,total}){
    const percentage = (sold/total)*100;
    return (
        <div style={styles.container}>
            <div style={{ ...styles.filler, width: `${percentage}%` }} />
            <span style={styles.label}>{`${sold} / ${total} (${Math.round(percentage)}%)`}</span>
        </div>
    )
}
const styles = {
    container: {
      height: '30px',
      width: '100%',
      backgroundColor: '#d9d9d9',
      borderRadius: '50px',
      overflow: 'hidden',
      marginBottom: '20px',
    },
    filler: {
      height: '100%',
      backgroundColor: '#1985A1',
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 0.2s ease-in',
    },
    label: {
      padding: '5px',
      color: 'white',
      fontWeight: 'bold',
    }
  };