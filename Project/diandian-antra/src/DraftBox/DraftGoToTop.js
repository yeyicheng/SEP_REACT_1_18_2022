import styles from './DraftBox.module.css';

function DraftGoToTop({setTop}) {
    return (
        <div className={styles.gotoTop + " absolute"} onClick={e=>setTop(new Date().getTime())}>

        </div>
    );
}

export default DraftGoToTop;
