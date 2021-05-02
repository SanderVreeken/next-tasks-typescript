import HeroI from '../interfaces/Hero'
import styles from '../styles/Hero.module.scss'

interface Props {
    hero: HeroI
}

export default function Hero({ hero }: Props) {
    return (
        <span className={styles.hero}>
            <h1 className={styles.absolute}>{hero.title}</h1>
            <h1 className={styles.animation} style={{
                animationDelay: hero.delay,
                backgroundImage: `linear-gradient(to right, ${hero.startColor}, ${hero.endColor}`
            }}>{hero.title}</h1>
        </span>
    )
}